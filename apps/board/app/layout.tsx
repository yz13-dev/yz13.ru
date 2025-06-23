import "@/styles/globals.css";
import { isDev } from "@yz13/supabase/env";
import { cn } from "@yz13/ui/cn";
import { Toaster } from "@yz13/ui/components/toaster";
import { TooltipProvider } from "@yz13/ui/components/tooltip";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Pixelify_Sans } from "next/font/google";

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
  creator: "YZ13",
  title: "Доска",
  description: "Просто доска?",
  authors: [
    {
      name: "YZ13",
      url: "https://github.com/YZ13-ENV",
    },
  ],
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
        <Toaster />
        <TooltipProvider>
          {children}
          {modal}
        </TooltipProvider>
      </body>
    </html>
  );
}
