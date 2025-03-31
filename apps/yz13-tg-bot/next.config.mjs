/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["rest-api"],
  compress: true,
  experimental: {
    serverComponentsExternalPackages: ["grammy"],
  },
};

export default nextConfig;
