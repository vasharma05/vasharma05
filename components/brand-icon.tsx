import * as icons from "simple-icons";

type SimpleIcon = { title: string; slug: string; hex: string; path: string };

function normalize(label: string) {
  return label.toLowerCase().replace(/[\s._+/-]/g, "");
}

const ALIAS: Record<string, string> = {
  react: "react",
  reactjs: "react",
  nextjs: "nextdotjs",
  next: "nextdotjs",
  nodejs: "nodedotjs",
  node: "nodedotjs",
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  html5: "html5",
  html: "html5",
  css3: "css",
  css: "css",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  materialui: "mui",
  mui: "mui",
  antdesign: "antdesign",
  redux: "redux",
  angular: "angular",
  django: "django",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  gitpod: "gitpod",
  docker: "docker",
  jenkins: "jenkins",
  jira: "jira",
  confluence: "confluence",
  grafana: "grafana",
  keycloak: "keycloak",
  webpack: "webpack",
  vite: "vite",
  jest: "jest",
  playwright: "playwright",
  mongodb: "mongodb",
  mysql: "mysql",
  aws: "amazon",
  amazonwebservices: "amazon",
  i18next: "i18next",
  claude: "claude",
  githubcopilot: "githubcopilot",
  copilot: "githubcopilot",
  bitwarden: "bitwarden",
  akamai: "akamai",
};

function toSlug(label: string) {
  const key = normalize(label);
  if (ALIAS[key]) return ALIAS[key];
  for (const [k, v] of Object.entries(ALIAS)) {
    if (key.includes(k)) return v;
  }
  return null;
}

function iconFor(label: string): SimpleIcon | null {
  const slug = toSlug(label);
  if (!slug) return null;
  const exportName = "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
  const rec = icons as unknown as Record<string, SimpleIcon>;
  return rec[exportName] ?? null;
}

export function BrandIcon({
  label,
  className = "h-4 w-4",
  colorful = false,
}: {
  label: string;
  className?: string;
  colorful?: boolean;
}) {
  const icon = iconFor(label);
  if (!icon) return null;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill={colorful ? `#${icon.hex}` : "currentColor"}
      aria-hidden
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}

export function hasBrandIcon(label: string): boolean {
  return iconFor(label) !== null;
}
