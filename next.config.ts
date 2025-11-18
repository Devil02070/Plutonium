import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: [
    'pino',
    'thread-stream',
    '@walletconnect/logger',
  ],
  env: {
    PROJECT_ID: process.env.PROJECT_ID,
    BACKEND_URL: process.env.BACKEND_URL,
    SOCKET_SERVER: process.env.SOCKET_SERVER,
    COOKIE_TOKEN: process.env.COOKIE_TOKEN
  },
};

export default nextConfig;
