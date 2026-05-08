import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Portfolio",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Portfolio",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
