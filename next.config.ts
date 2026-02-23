import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,  // ✅ Disable ESLint error saat build
  },
};

export default nextConfig;
