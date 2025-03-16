import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    serverActions: {},
  },
  env: {
    NEXT_PUBLIC_SOCKET_URL:
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3002", // Update with your actual socket server URL
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "",
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
  },
};

export default nextConfig;
