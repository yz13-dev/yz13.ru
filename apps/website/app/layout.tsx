import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Onest, Pixelify_Sans } from "next/font/google";
import localFont from "next/font/local";
import { cn } from "yz13/cn";

const PIXEL = Pixelify_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  preload: true,
  display: "swap",
  variable: "--font-yz-pixel",
})

const SANS = Onest({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
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
        SANS.variable,
        MONO.variable,
        PIXEL.variable,
      )}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
