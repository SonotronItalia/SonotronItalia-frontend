//netx.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sonotronitalia.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'strapi.sonotronitalia.it',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
