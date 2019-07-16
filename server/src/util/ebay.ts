import fetch from "node-fetch";

function findItemsByKeywords(keyword: string) {
  return fetch(
    `https://svcs.sandbox.ebay.com/services/search/FindingService/v1?SERVICE-NAME=FindingService&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=${
      process.env.EBAY_APP_ID
    }&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&GLOBAL-ID=EBAY-US&keywords=${keyword}&paginationInput.entriesPerPage=3&paginationInput.pageNumber=1&SortOrderType=PricePlusShippingLowest`
  ).then(r => r.json());
}

type Item = {
  _id: string;
  price: string;
  itemURL: string;
  title: string;
  imageURL: string;
};

export const findItemsBySearchPhrase = (searchPhrase: string) => {
  return new Promise<Item[]>((resolve, reject) => {
    findItemsByKeywords(searchPhrase).then(
      (data: any) => {
        // console.log(data.findItemsByKeywordsResponse[0].searchResult[0]);
        let result = [] as Item[];
        if (
          data &&
          data.findItemsByKeywordsResponse &&
          data.findItemsByKeywordsResponse[0] &&
          data.findItemsByKeywordsResponse[0].searchResult &&
          data.findItemsByKeywordsResponse[0].searchResult[0] &&
          data.findItemsByKeywordsResponse[0].searchResult[0].item
        ) {
          result = data.findItemsByKeywordsResponse[0].searchResult[0].item.map(
            (item: any) => {
              return {
                price: item.sellingStatus[0].currentPrice[0].__value__,
                itemURL: item.viewItemURL[0],
                _id: item.itemId[0],
                title: item.title[0],
                imageURL:
                  item.galleryURL && item.galleryURL[0]
                    ? item.galleryURL && item.galleryURL[0]
                    : undefined
              };
            }
          ) as Item[];
        }

        resolve(result);
      },
      (error: any) => {
        reject(error);
      }
    );
  });
};
