import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Portfolio-Website",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Portfolio-Website",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
