import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@yz13/ui", "@yz13/link"],
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org"
      },
      {
        protocol: "https",
        hostname: "twenty-icons.com"
      }
    ]
  },
};

export default withContentCollections(nextConfig);
