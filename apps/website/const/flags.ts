import { isDev } from "@/app/login/get-url";
import { get } from "@vercel/edge-config";
import { flag } from "@vercel/flags/next";

const pretendProduction = false
  ? false
  : process.env.NODE_ENV === "development";

export const showProcess = flag<boolean>({
  key: "show-process",
  description: "Show process widget on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>("show-process")) ?? false;
  },
});

export const showReleasesList = flag<boolean>({
  key: "show-releases-list",
  description: "Show releases list on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>("show-releases-list")) ?? false;
  },
});

export const showPagesPromo = flag<boolean>({
  key: "show-pages-promo",
  description: "Show pages promo on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>("show-pages-promo")) ?? false;
  },
});
