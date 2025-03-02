import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_SOCKET_URL: 'http://localhost:3001', // Update with your actual socket server URL
  },
};

export default nextConfig;
