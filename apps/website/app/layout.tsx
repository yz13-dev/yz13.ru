import { cn } from "@yz13/ui/cn";
import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  preload: true,
  display: "swap",
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});
const geistMono = JetBrains_Mono({
  preload: true,
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "YZ13 - фронтенд разработчик",
  description: "Нужен разработчик? Разработаю фронтенд для вашего проекта.",
  appleWebApp: {
    capable: true,
    title: "YZ13 - фронтенд разработчик",
    statusBarStyle: "default",
    startupImage: "/logo/512x512.png",
  },
  applicationName: "YZ13",
  creator: "yz13",
  keywords: ["yz13", "developer", "frontend", "backend", "react", "nextjs", "typescript", "tailwindcss"],
  openGraph: {
    title: "YZ13 - фронтенд разработчик",
    description: "Нужен разработчик? Разработаю фронтенд для вашего проекта.",
    url: "https://yz13.ru",
    type: "website",
    locale: "ru_RU",
    siteName: "YZ13",
    images: new URL("https://yz13.ru/og/og.png"),
  },
  twitter: {
    card: "summary_large_image",
    title: "YZ13 - фронтенд разработчик",
    description: "Нужен разработчик? Разработаю фронтенд для вашего проекта.",
    creator: "@yz13_dev",
    site: "@yz13_dev",
    images: new URL("https://yz13.ru/og/og.png"),
  },
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
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable)}>
      <body className="relative">
        {children}
      </body>
    </html>
  );
}
