import { get } from "@vercel/edge-config";
import { flag } from "@vercel/flags/next";

const isDev = process.env.NODE_ENV === "development";
const pretendProduction = false
  ? false
  : process.env.NODE_ENV === "development";

export const showUsabe = flag<boolean>({
  key: "show-usage",
  description: "Show usage in sidebar",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});
