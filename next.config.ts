import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "twenty-icons.com"
      }
    ]
  }
};

export default nextConfig;
