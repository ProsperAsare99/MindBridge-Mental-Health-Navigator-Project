import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only enable static export for Capacitor mobile builds
  output: process.env.STATIC_EXPORT === 'true' ? 'export' : undefined,
  images: {
    unoptimized: process.env.STATIC_EXPORT === 'true',
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "http", hostname: "localhost", port: "5000" },
      { protocol: "http", hostname: "127.0.0.1", port: "5000" }
    ],
  },
};

export default nextConfig;
