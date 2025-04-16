/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mono", "yz13", "rest-api", "tailwind-config"],
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
