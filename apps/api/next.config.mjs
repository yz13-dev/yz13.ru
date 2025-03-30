/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mono", "yz13", "rest-api"],
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
