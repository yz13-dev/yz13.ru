import { UserProvider } from "@/app/account/settings/user.store";
import LiveTimeProvider from "@/components/live/live-provider";
import ThemeObserver from "@/components/theme/theme-observer";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "dayjs/locale/ru";
import { Toaster } from "mono/components/toaster";
import { TooltipProvider } from "mono/components/tooltip";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Pixelify_Sans } from "next/font/google";
import { cn } from "yz13/cn";
import { isDev } from "yz13/env";

const PIXEL = Pixelify_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: "variable",
  variable: "--font-pixel",
});

const SANS = Inter({
  weight: "variable",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  variable: "--font-sans",
});

const MONO = Geist_Mono({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  category: "Разработчик",
  applicationName: "YZ13",
  creator: "YZ13",
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
    description: "Нужен разработчик?",
    images: [
      {
        url: "/og/og.png",
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
        url: "/og/og.png",
        width: 1090,
        height: 714,
        alt: "YZ13 – блог разработчика",
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
      {isDev && (
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
      )}
      <body id="root" className="antialiased">
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <TooltipProvider>
          <ThemeObserver />
          <UserProvider>
            <LiveTimeProvider>
              {children}
              {modal}
            </LiveTimeProvider>
          </UserProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
