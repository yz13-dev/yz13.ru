import { TooltipProvider } from "@yz13/mono/components/tooltip";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cn } from "yz13/cn";
import "../styles/globals.css";

const PIXEL = localFont({
  src: "./fonts/neue-pixel-sans/neue-pixel-sans.ttf",
  variable: "--font-pixel",
  preload: true,
  adjustFontFallback: "Arial",
});

const RU_FONT = localFont({
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
  variable: "--font-sans",
});

const GeistMono = localFont({
  src: "./fonts/geist/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "YZ13",
  description: "Developer",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: light)",
      url: "https://yzstatic.yz13.space/logo/yz-light.svg",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: dark)",
      url: "https://yzstatic.yz13.space/logo/yz-dark.svg",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff" },
    { media: "(prefers-color-scheme: dark)", color: "#000" },
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
      className={cn(
        RU_FONT.variable,
        GeistMono.variable,
        PIXEL.variable,
      )}
    >
      <body >
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
