/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["mono", "yz13"],
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
