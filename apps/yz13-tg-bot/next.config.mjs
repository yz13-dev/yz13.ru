/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ["mono", "yz13", "rest-api"],
  experimental: {
    serverComponentsExternalPackages: ["grammy", "rest-api"],
  },
};

export default nextConfig;
