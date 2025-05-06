import { MetadataRoute } from "next";

export default function (): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/radio",
        "/settings",
        "/services",
        "/apps",
        "/:appId",
        "/login",
        "signup",
        "/account/*",
        "/onboard",
        "/contact-me",
        "/store",
      ],
    },
    sitemap: "https://yz13.ru/sitemap.xml",
  };
}

// Allow: /?hl=
// Disallow: /?hl=*&
