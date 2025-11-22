import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: [
    "@yz13/ui",
    "@yz13/link",
    "@yz13/registries",
    "@yz13/flags",
    "@yz13/api",
  ],
  compress: true,
  reactCompiler: true,
  productionBrowserSourceMaps: false,
  cacheComponents: true,
  experimental: {
    inlineCss: true,
    optimizeCss: true,
    serverMinification: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "twenty-icons.com",
      },
    ],
  },
};

export default withContentCollections(nextConfig);
