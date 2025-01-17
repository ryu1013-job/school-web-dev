import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
		ppr: true,
		dynamicIO: true,
		reactCompiler: true,
		optimizePackageImports: [
			"@mantine/core",
			"@mantine/hooks",
			"@mantine/form",
			"@mantine/dates",
		],
	},
};

export default nextConfig;
