import { get } from "@vercel/edge-config";
import { flag } from "@vercel/flags/next";
import { isDev } from "yz13/env";

const pretendProduction = false
  ? false
  : process.env.NODE_ENV === "development";

export const showEventForm = flag<boolean>({
  key: "show-event-form",
  description: "Show event form on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showLinkToCalendar = flag<boolean>({
  key: "show-link-to-calendar",
  description: "Show link to calendar on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});
