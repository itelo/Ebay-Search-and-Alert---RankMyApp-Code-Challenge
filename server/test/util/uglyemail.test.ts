import { uglyEbayItem } from "../../src/util/uglyemail";

describe("uglyEbayItem", () => {
  it("should return table without image", () => {
    const ebayItem = {
      price: "12,00",
      itemURL: "http://www.some-url.com",
      title: "some product"
    };
    const table = uglyEbayItem(ebayItem);
    expect(table).toMatchSnapshot();
  });

  it("should return table without image", () => {
    const ebayItem = {
      price: "12,00",
      itemURL: "http://www.some-url.com",
      title: "some product",
      imageURL: "http://www.some-image-url.com"
    };
    const table = uglyEbayItem(ebayItem);
    expect(table).toMatchSnapshot();
  });
});
