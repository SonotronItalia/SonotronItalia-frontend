import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// next.config.js
module.exports = {
  images: {
    domains: ['localhost', 'cdn.sonotronitalia.com', 'strapi.sonotronitalia.it'], // Aggiungi il tuo host reale
  },
};
