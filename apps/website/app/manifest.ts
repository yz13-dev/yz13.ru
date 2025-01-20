import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YZ13",
    short_name: "YZ13",
    background_color: "#000",
    description: "Developer",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/yz-icon-128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      // {
      //   name: "Journal",
      //   url: "/journal",
      //   icons: [
      //     {
      //       src: "https://yzstatic.yz13.space/logo/yz-light-32.png",
      //       sizes: "32x32",
      //       type: "image/png",
      //       purpose: "any",
      //     },
      //   ],
      // },
    ],
  };
}
