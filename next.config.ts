import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
