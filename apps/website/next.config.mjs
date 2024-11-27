/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [ "mono", "yz13" ],
  experimental: {
    serverComponentsExternalPackages: [ "mono", "yz13" ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      }
    ]
  }
};

export default nextConfig;
