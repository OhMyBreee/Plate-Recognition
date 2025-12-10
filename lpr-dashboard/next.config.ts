import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: __dirname, // force turbopack to use this folder as root
  },
};

export default nextConfig;
