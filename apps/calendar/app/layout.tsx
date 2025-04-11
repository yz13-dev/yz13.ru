import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import localFont from "next/font/local";
import { Inter, Pixelify_Sans } from "next/font/google";
import { cn } from "yz13/cn";
import LiveTimeProvider from "@/components/live/live-provider";
import { isDev } from "yz13/env";
import "dayjs/locale/ru";

const PIXEL = Pixelify_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: "variable",
  variable: "--font-yz-pixel",
});

const SANS = Inter({
  weight: "variable",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  variable: "--font-yz-sans",
});

const MONO = localFont({
  src: "./fonts/geist/GeistMonoVF.woff",
  variable: "--font-yz-mono",
});

export const metadata: Metadata = {
  title: "Календарь",
  description: "Календарь для своих задач",
};

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
      {isDev && (
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
      )}
      <body>
        <LiveTimeProvider>{children}</LiveTimeProvider>
      </body>
    </html>
  );
}
