import type { NextConfig } from "next";

/**
 * For GitHub Pages project site (e.g. username.github.io/portfolio), set
 * NEXT_PUBLIC_BASE_PATH=/portfolio in the environment when building.
 * Leave unset for user/org site (username.github.io) or custom domain.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
