import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    BACKEND_URL: process.env.BACKEND_URL
  }
};

export default nextConfig;
