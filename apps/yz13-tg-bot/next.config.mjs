/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["rest-api"],
  experimental: {
    serverComponentsExternalPackages: ["grammy"],
  },
};

export default nextConfig;
