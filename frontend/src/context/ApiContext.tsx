import React from "react";

export const ApiContext = React.createContext({} as {
  data: ProviderData[];
  action: {
    create: (body: CreateBody) => Promise<Response>;
    cancel: (id: string) => void;
  };
});

interface ProviderData {
  email: string;
  interval: string;
  loading: boolean;
  searchPhrase: string;
  _id: string;
  items: any[];
}

interface ResponseData {
  email: string;
  interval: string;
  loading: boolean;
  searchPhrase: string;
  _id: string;
}

type Response = {
  success: boolean;
  data: ResponseData;
};

type CreateBody = { email: string; interval: string; searchPhrase: string };

export const ApiProvider: React.FC = props => {
  const [data, setData] = React.useState([] as ProviderData[]);
  const [arrIds, setArrIds] = React.useState([] as string[]);

  const init = async () => {
    const r = await fetch("/api/list");
    const res = (await r.json()) as Response;
    if (res.success) {
      const arr = [] as string[];

      // @ts-ignore
      const _data = res.data.map(item => {
        arr.push(item._id);
        return { ...item, items: [], loading: true };
      });

      setData(_data);
      setArrIds(arr);
    }
  };

  const create = (body: CreateBody) => {
    return new Promise<Response>((resolve, reject) => {
      fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then((res: Response) => {
          if (res.success) {
            setData([...data, { ...res.data, items: [], loading: true }]);
            setArrIds([...arrIds, res.data._id]);
          }
          resolve(res);
        })
        .catch(reject);
    });
  };

  const cancel = (id: string) => {
    return new Promise<Response>((resolve, reject) => {
      fetch(`/api/cancel/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then((res: Response) => {
          if (res.success) {
            const index = data.findIndex(({ _id }) => _id === id);
            const startArr = data.slice(0, index);
            const endArr = data.slice(index + 1, data.length);
            setData([...startArr, ...endArr]);
          }
          resolve(res);
        })
        .catch(reject);
    });
  };

  React.useEffect(() => {
    if (arrIds.length === 0) {
      return;
    }
    for (let id of arrIds) {
      const index = data.findIndex(({ _id }) => _id === id);

      if (index >= 0) {
        let item = data[index];
        fetch(`/api/query?searchPhrase=${item.searchPhrase}`)
          .then(r => r.json())
          .then(res => {
            console.log(res);
            const newData = data.slice();
            item.loading = false;

            if (res.success) {
              item.items = res.data;
              newData[index] = item;
            }

            setData(newData);
          });
      }
    }

    setArrIds([]);
  }, [arrIds]);

  React.useEffect(() => {
    init();
  }, []);

  const values = {
    data,
    action: {
      create,
      cancel
    }
  };
  return (
    <ApiContext.Provider value={values}>{props.children}</ApiContext.Provider>
  );
};
