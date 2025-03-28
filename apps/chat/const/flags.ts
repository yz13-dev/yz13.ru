import { get } from "@vercel/edge-config";
import { flag } from "@vercel/flags/next";

const isDev = process.env.NODE_ENV === "development";
const pretendProduction = false
  ? false
  : process.env.NODE_ENV === "development";

export const showUsage = flag<boolean>({
  key: "show-usage",
  description: "Show usage in sidebar",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showTaskPageButton = flag<boolean>({
  key: "show-task-page-button",
  description: "Show task page button in sidebar",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showChatCode = flag<boolean>({
  key: "show-chat-code",
  description: "Show chat code in toolbar",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showChatTopics = flag<boolean>({
  key: "show-chat-topics",
  description: "Show chat topics in toolbar",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});
