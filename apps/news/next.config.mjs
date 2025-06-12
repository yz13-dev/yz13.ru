/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@yz13/ui", "@yz13/supabase", "@yz13/api", "tailwind-config"],
  compress: true,
  experimental: {
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
