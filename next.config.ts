import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      }
    ]
  }
};

export default nextConfig;
