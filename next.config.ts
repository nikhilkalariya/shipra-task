import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stock-v2.s3.us-east-1.amazonaws.com',
        pathname: '/public/**',
      },
    ],
  },
};

export default nextConfig;
