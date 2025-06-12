import { getURL } from "../src/lib/get-url";

describe("test getUrl function", () => {
  it("should return site url", () =>
    expect(getURL()).toBe("https://www.yz13.space/"));
});
