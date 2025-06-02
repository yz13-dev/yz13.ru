import LiveTimeProvider from "@/components/live/live-provider";
import "@/styles/globals.css";
import "dayjs/locale/ru";
import type { Metadata } from "next";
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
  title: "Сводка новостей",
  description: "Собранные новости за последние несколько дней",
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
      <body>
        <LiveTimeProvider>
          {children}
        </LiveTimeProvider>
      </body>
    </html>
  );
}
