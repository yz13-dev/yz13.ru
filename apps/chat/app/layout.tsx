import LiveTimeProvider from "@/components/live/live-provider";
import { isDev } from "@/const/api";
import "@/styles/globals.css";
import { TooltipProvider } from "mono/components/tooltip";
import type { Metadata, Viewport } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";

const PIXEL = Pixelify_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: "variable",
  variable: "--font-yz-pixel",
});
//   localFont({
//   src: [
//     {
//       path: "./fonts/departure-mono/departure-mono-nerd-font-mono-regular.otf",
//       weight: "400",
//       style: "normal",
//     },
//   ],
//   variable: "--font-yz-pixel",
// });

const SANS = Inter({
  weight: "variable",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: true,
  variable: "--font-yz-sans",
});

export const metadata: Metadata = {
  title: "Чат",
  description: "YZ13 Чат",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#000000",
    },
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
      className={`${SANS.variable} ${PIXEL.variable} antialiased`}
    >
      {isDev && (
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
      )}
      <body id="root">
        <TooltipProvider>
          <LiveTimeProvider>{children}</LiveTimeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
