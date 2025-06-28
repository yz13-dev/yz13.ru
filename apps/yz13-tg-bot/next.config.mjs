/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  compress: true,
  experimental: {
    serverComponentsExternalPackages: ["grammy", "@yz13/api"],
  },
};

export default nextConfig;
