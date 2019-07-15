import React from "react";

export const ApiContext = React.createContext({} as {
  data: DataType[];
  action: {
    create: (body: CreateBody) => Promise<void>;
  };
});

type DataType = {
  email: string;
  interval: string;
  items: any[];
  loading: boolean;
  shouldTryLoad: boolean;
  searchPhrase: string;
  _id: string;
};

type CreateBody = { email: string; interval: string; searchPhrase: string };

export const ApiProvider: React.FC = props => {
  const [data, setData] = React.useState([] as DataType[]);
  const [arrIds, setArrIds] = React.useState([] as string[]);
  // PUT EVERYTHING IN ARRAY ID;
  const init = async () => {
    const r = await fetch("/api/list");
    const res = await r.json();
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

  const create = async (body: CreateBody) => {
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(res => {
        // @ts-ignore
        setData([...data, { ...res.data, items: [], loading: true }]);
        setArrIds([...arrIds, res.data._id]);
      });
  };

  React.useEffect(() => {
    if (arrIds.length === 0) {
      return;
    }
    for (let id of arrIds) {
      console.log(id);
      console.log(data);
      const index = data.findIndex(({ _id }) => _id === id);
      console.log(index);
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
      create
    }
  };
  return (
    <ApiContext.Provider value={values}>{props.children}</ApiContext.Provider>
  );
};
