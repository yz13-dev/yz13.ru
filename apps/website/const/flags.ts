import { flag } from "@vercel/flags/next";

const pretendProduction = false
  ? false
  : process.env.NODE_ENV === "development";

export const showCalendar = flag<boolean>({
  key: "show-calendar-widget",
  description: "Show calendar widget on the root page",
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
