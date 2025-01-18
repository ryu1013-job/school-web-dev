import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "*",
        search: "",
      },
    ],
  },
  optimizePackageImports: [
    "@mantine/core",
    "@mantine/hooks",
    "@mantine/form",
    "@mantine/dates",
  ],
  env: {
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
};

export default nextConfig;
