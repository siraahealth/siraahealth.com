import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const url = new URL(strapiUrl);

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: "127.0.0.1",
        port: url.port,
        pathname: "/uploads/**",
      },
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: "localhost",
        port: url.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
