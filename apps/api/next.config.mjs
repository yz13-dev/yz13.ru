/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@yz13/supabase", "@yz13/api"],
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
