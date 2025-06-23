import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@yz13/ui", "@yz13/supabase", "@yz13/api", "tailwind-config"],
  // output: "standalone",
  compress: true,
  experimental: {
    inlineCss: true,
    reactCompiler: true,
    optimizeCss: true,
    optimizeServerReact: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
