/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["yz13", "rest-api"],
  compress: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

export default nextConfig;
