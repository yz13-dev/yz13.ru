import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yz13.ru/",
      priority: 1,
    },
  ];
}
