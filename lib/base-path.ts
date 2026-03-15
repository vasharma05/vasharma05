/**
 * Base path for deployment (e.g. /Portfolio on GitHub Pages project site).
 * Set NEXT_PUBLIC_BASE_PATH at build time so public assets load correctly.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a path with the base path when set.
 * Use for public asset URLs (e.g. /images/..., /resume.pdf) so they work under username.github.io/Portfolio/.
 * External URLs (http/https) and hash-only links are returned unchanged.
 */
export function withBasePath(path: string): string {
  if (!path || typeof path !== "string") return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("#")) return path;
  const prefix = BASE_PATH.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return prefix ? `${prefix}${normalized}` : normalized;
}
