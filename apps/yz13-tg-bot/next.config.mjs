/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["grammy", "rest-api"],
  },
};

export default nextConfig;
