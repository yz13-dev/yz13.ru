/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mono", "yz13", "types", "tailwind-config"],
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
