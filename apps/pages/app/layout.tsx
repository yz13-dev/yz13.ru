import "@/styles/globals.css";
import dayjs from "dayjs";
import "mono/css/globals.css";
import type { Viewport } from "next";
import localFont from "next/font/local";
import { cn } from "yz13/cn";

import "dayjs/locale/ru";
dayjs.locale("ru");

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(SANS.variable, MONO.variable, PIXEL.variable)}
    >
      <body>{children}</body>
    </html>
  );
}
