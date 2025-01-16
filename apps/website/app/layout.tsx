import ThemeObserver from "@/components/theme/theme-observer";
import "@/styles/globals.css";
import { TooltipProvider } from "mono/components/tooltip";
import "mono/css/globals.css";
import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { cn } from "yz13/cn";
const SessionObserver = dynamic(
  () => import("./visitor-session/session-observer"),
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
// localFont({
//   src: "./fonts/geist/GeistVF.woff",
//   fallback: ["Inter"],
//   variable: "--font-yz-sans",
// });

const MONO = localFont({
  src: "./fonts/geist/GeistMonoVF.woff",
  variable: "--font-yz-mono",
});

export const metadata: Metadata = {
  title: "YZ13",
  description: "Developer",
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: light)",
      url: "/yz-light.svg",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      media: "(prefers-color-scheme: dark)",
      url: "/yz-dark.svg",
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
      <body>
        <TooltipProvider>
          <ThemeObserver />
          <SessionObserver />
          {children}
          {modal}
        </TooltipProvider>
      </body>
    </html>
  );
}
