import ThemeObserver from "@/components/theme/theme-observer";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "mono/components/toaster";
import { TooltipProvider } from "mono/components/tooltip";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { cn } from "yz13/cn";
import { UserProvider } from "./account/user.store";

const SessionObserver = dynamic(
  () => import("../components/visitor-session/session-observer"),
  {
    ssr: false,
  },
);

const PIXEL = localFont({
  src: [
    {
      path: "./fonts/departure-mono/departure-mono-nerd-font-mono-regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-yz-pixel",
});

const SANS = localFont({
  src: [
    {
      path: "./fonts/suisse-intl/SuisseIntl-Light.otf",
      weight: "300",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Regular.otf",
      weight: "400",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Medium.otf",
      weight: "500",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-SemiBold.otf",
      weight: "600",
    },
    {
      path: "./fonts/suisse-intl/SuisseIntl-Bold.otf",
      weight: "700",
    },
  ],
  fallback: ["Inter"],
  display: "swap",
  variable: "--font-yz-sans",
});

const MONO = localFont({
  src: "./fonts/geist/GeistMonoVF.woff",
  variable: "--font-yz-mono",
});

export const metadata: Metadata = {
  title: "YZ13 – разработчик",
  description: "Нужен разработчик?",
  authors: [
    {
      name: "YZ13",
      url: "https://github.com/YZ13-ENV",
    },
  ],
  keywords: [
    "NextJS",
    "TypeScript",
    "React",
    "TailwindCSS",
    "YZ13",
    "Web Development",
    "Fullstack Developer",
    "Frontend Development",
    "Backend Development",
  ],
  twitter: {
    card: "summary_large_image",
    site: "@YZ13_DEV",
    creator: "@YZ13_DEV",
    title: "YZ13",
    description: "Полезные материалы по frontend и backend разработке.",
    images: [
      {
        url: "/og/yz-light-window.png",
        width: 1090,
        height: 714,
        alt: "YZ13 – разработчик",
      },
    ],
  },
  openGraph: {
    type: "website",
    title: "YZ13",
    description: "Нужен разработчик?",
    siteName: "YZ13",
    url: "https://yz13.ru",
    locale: "ru_RU",
    determiner: "the",
    emails: ["yztheceo@yandex.ru"],
    images: [
      {
        url: "/og/yz-light-window.png",
        width: 1090,
        height: 714,
        alt: "YZ13 – блог разработчика",
      },
      {
        url: "/og/yz-dark-window.png",
        width: 1090,
        height: 714,
        alt: "YZ13 – блог разработчика (темная тема)",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(SANS.variable, MONO.variable, PIXEL.variable)}
    >
      <body>
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <TooltipProvider>
          <ThemeObserver />
          <SessionObserver />
          <UserProvider>
            {children}
            {modal}
          </UserProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
