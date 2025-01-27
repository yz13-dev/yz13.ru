import { flag } from "@vercel/flags/next";

const pretendProduction = false
  ? false
  : process.env.NODE_ENV === "development";

export const showProcess = flag<boolean>({
  key: "show-process",
  description: "Show process widget on the root page",
  decide() {
    return pretendProduction;
  },
});

export const showReleasesList = flag<boolean>({
  key: "show-releases-list",
  description: "Show releases list on the root page",
  decide() {
    return pretendProduction;
  },
});
