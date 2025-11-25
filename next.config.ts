import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: undefined,
  assetPrefix: undefined,
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
