import { isDev } from "@/const/env";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "dayjs/locale/ru";
import { Toaster } from "mono/components/toaster";
import { TooltipProvider } from "mono/components/tooltip";
import type { Metadata, Viewport } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "yz13/cn";

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
  title: "Konfa",
  description: "Приложения для создания и управления конференциями",
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
      <body id="root" className="antialiased">
        <Analytics />
        <SpeedInsights />
        <Toaster />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
