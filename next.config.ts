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
};

export default nextConfig;
