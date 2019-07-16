import { findItemsBySearchPhrase } from "../../src/util/ebay";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

describe("findItemsBySearchPhrase", () => {
  it("should return result for 'iphone'", async () => {
    try {
      const items = await findItemsBySearchPhrase("iphone");
      expect(items).toMatchSnapshot();
    } catch (err) {
      throw err;
    }
  });

  it("should return result for empty string", async () => {
    try {
      const items = await findItemsBySearchPhrase("");
      expect(items).toMatchSnapshot();
    } catch (err) {
      throw err;
    }
  });

  it("should return result for 'pirulito'", async () => {
    try {
      const items = await findItemsBySearchPhrase("pirulito");
      expect(items).toMatchSnapshot();
    } catch (err) {
      throw err;
    }
  });
});
