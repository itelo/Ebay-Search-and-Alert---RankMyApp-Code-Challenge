import iBay from "ebay-node-api";

const ebay = new iBay({
  clientID: "IteloFil-rankmyap-SBX-8d8c7c828-9223860c",
  limit: 3,
  filter: "priceCurrency:BRL,price:[50]",
  env: "SANDBOX" // optional default = 'PRODUCTION'
});

export const findItemsBySearchPhrase = (searchPhrase: string) => {
  return new Promise((resolve, reject) => {
    ebay.findItemsByKeywords(searchPhrase).then(
      (data: any) => {
        let result = [];
        if (
          data &&
          data[0] &&
          data[0].searchResult &&
          data[0].searchResult[0] &&
          data[0].searchResult[0].item
        ) {
          result = data[0].searchResult[0].item.map((item: any) => {
            console.log(item.sellingStatus[0].currentPrice);
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
          });
        }

        resolve(result);
      },
      (error: any) => {
        reject(error);
      }
    );
  });
};
