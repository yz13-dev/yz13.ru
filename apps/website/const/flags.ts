import { isDev } from "@/app/login/get-url";
import { randomNumberInRange } from "@/lib/random-id";
import { get } from "@vercel/edge-config";
import { flag } from "@vercel/flags/next";
import { StaticImageData } from "next/image";
import variant1 from "public/background/variant-1.gif";
import variant10 from "public/background/variant-10.gif";
import variant11 from "public/background/variant-11.gif";
import variant12 from "public/background/variant-12.gif";
import variant13 from "public/background/variant-13.gif";
import variant14 from "public/background/variant-14.gif";
import variant2 from "public/background/variant-2.gif";
import variant3 from "public/background/variant-3.gif";
import variant4 from "public/background/variant-4.gif";
import variant5 from "public/background/variant-5.gif";
import variant6 from "public/background/variant-6.gif";
import variant7 from "public/background/variant-7.gif";
import variant8 from "public/background/variant-8.gif";
import variant9 from "public/background/variant-9.gif";

const pretendProduction = false
  ? false
  : process.env.NODE_ENV === "development";

export const showProcess = flag<boolean>({
  key: "show-process",
  description: "Show process widget on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showReleasesList = flag<boolean>({
  key: "show-releases-list",
  description: "Show releases list on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showPagesPromo = flag<boolean>({
  key: "show-pages-promo",
  description: "Show pages promo on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showAppsLink = flag<boolean>({
  key: "show-apps-link",
  description: "Show apps link on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showPriceDetails = flag<boolean>({
  key: "show-price-details",
  description: "Show price details on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showCallToAction = flag<boolean>({
  key: "show-call-to-action",
  description: "Show call to action on the root page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showLogoUnderFooter = flag<boolean>({
  key: "show-logo-under-footer",
  description: "Show logo under footer",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showFAQ = flag<boolean>({
  key: "show-faq",
  description: "Show FAQ on the services page",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showBlog = flag<boolean>({
  key: "show-blog",
  description: "Show blog button in nav",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});
export const enableChat = flag<boolean>({
  key: "enable-chat",
  description: "Make chat available",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const availableForWork = flag<boolean>({
  key: "busy",
  description: "Show available for work button",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showUser = flag<boolean>({
  key: "show-user",
  description: "Show user button",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showTimeline = flag<boolean>({
  key: "show-timeline",
  description: "Show timeline",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const animatedBackground = flag<StaticImageData>({
  key: "animated-background",
  description: "Animated background",
  async decide() {
    const bgs = [
      variant1,
      variant2,
      variant3,
      variant4,
      variant5,
      variant6,
      variant7,
      variant8,
      variant9,
      variant10,
      variant11,
      variant12,
      variant13,
      variant14,
    ];
    const randomBg = bgs[randomNumberInRange(0, bgs.length - 1)];
    return randomBg ?? variant3;
  },
});

export const showStack = flag<boolean>({
  key: "show-stack",
  description: "Show stack",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});

export const showGallery = flag<boolean>({
  key: "show-gallery",
  description: "Show gallery",
  async decide() {
    if (isDev) return pretendProduction;
    return (await get<boolean>(this.key)) ?? false;
  },
});
