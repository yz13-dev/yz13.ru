import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chat",
    short_name: "Chat",
    background_color: "#000",
    description: "Chat from YZ13",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/chat.png",
        sizes: "256x256",
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
