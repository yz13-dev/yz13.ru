import { cn } from "../helpers/cn";

describe("test cn", () => {
  it("should return string", () =>
    expect(cn("text-200", "font-600")).toBe("text-200 font-600"));
});
