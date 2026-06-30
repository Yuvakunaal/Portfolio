import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Hide the dev-only on-screen route indicator (the "N" badge, bottom-left).
  devIndicators: false,
};

export default nextConfig;
