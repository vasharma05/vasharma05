"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCode,
  faDatabase,
  faServer,
  faCloud,
  faFlask,
  faCogs,
  faUsers,
  faBrain,
} from "@fortawesome/free-solid-svg-icons";
import {
  faReact,
  faJs,
  faPython,
  faGitAlt,
  faDocker,
  faAws,
  faNodeJs,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const SKILL_ICON_MAP: Record<string, IconDefinition> = {
  react: faReact,
  "react.js": faReact,
  "reactjs": faReact,
  javascript: faJs,
  "javascript ": faJs,
  typescript: faJs,
  "typescript ": faJs,
  python: faPython,
  "python ": faPython,
  "c/c++": faCode,
  "node.js": faNodeJs,
  "nodejs": faNodeJs,
  django: faPython,
  git: faGitAlt,
  github: faGithub,
  docker: faDocker,
  aws: faAws,
  mysql: faDatabase,
  mongodb: faDatabase,
  "rest api": faServer,
  api: faServer,
  webpack: faCogs,
  vite: faCogs,
  jest: faFlask,
  playwright: faFlask,
  "react testing library": faFlask,
  jenkins: faCogs,
  jira: faUsers,
  confluence: faUsers,
  "cursor ai": faBrain,
  "github copilot": faBrain,
  claude: faBrain,
  gpt: faBrain,
  "next.js": faReact,
  nextjs: faReact,
  angular: faJs,
  redux: faReact,
  "tailwind css": faCode,
  "material ui": faCode,
  "ant design": faCode,
  "carbon design": faCode,
  bootstrap: faCode,
  html5: faCode,
  css3: faCode,
  "microfrontends": faCode,
  "single-spa": faCode,
  "piral": faCode,
  "web workers": faCode,
  "i18next": faCode,
  "keycloak": faServer,
  "webpack 5": faCogs,
  "module federation": faCogs,
  "turbopack": faCogs,
  "django channels": faServer,
  "websockets": faServer,
  "grafana": faCloud,
  "akamai": faCloud,
  "bitwarden": faCogs,
  "gitlab": faGitAlt,
  "gitpod": faGitAlt,
};

function getIconForSkill(label: string): IconDefinition {
  const key = Object.keys(SKILL_ICON_MAP).find(
    (k) => label.toLowerCase().includes(k) || label.toLowerCase() === k
  );
  return key ? SKILL_ICON_MAP[key] : faCode;
}

type SkillItem = { visible: boolean; label: string };
type SkillDomain = {
  id: string;
  visible: boolean;
  label: string;
  items: SkillItem[];
};

type SkillsSectionProps = {
  title: string;
  domains: SkillDomain[];
};

export function SkillsSection({ title, domains }: SkillsSectionProps) {
  const visibleDomains = domains.filter((d) => d.visible);
  const leftCol = visibleDomains.filter((_, i) => i % 2 === 0);
  const rightCol = visibleDomains.filter((_, i) => i % 2 === 1);

  const DomainBlock = ({ domain }: { domain: SkillDomain }) => (
    <div className="py-8 first:pt-0 text-center">
      <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">
        {domain.label}
      </h3>
      <div className="flex flex-wrap justify-center gap-4 text-base">
        {domain.items
          .filter((s) => s.visible)
          .map((s, idx) => (
            <span
              key={idx}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/60 px-4 py-2 text-center text-[var(--muted)]"
            >
              <FontAwesomeIcon
                icon={getIconForSkill(s.label)}
                className="h-4 w-4 shrink-0 text-[var(--muted)]"
                aria-hidden
              />
              {s.label}
            </span>
          ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="section px-6 py-12 sm:px-8 md:py-16">
      <h2 className="section-title">{title}</h2>
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {/* Left column */}
        <div className="space-y-0 border-b border-[var(--border)] pb-8 md:border-b-0 md:border-r md:pr-10 md:pb-0 md:pl-2">
          {leftCol.map((domain) => (
            <div
              key={domain.id}
              className="border-t border-[var(--border)] pt-10 first:border-t-0 first:pt-0"
            >
              <DomainBlock domain={domain} />
            </div>
          ))}
        </div>
        {/* Right column */}
        <div className="space-y-0 pt-10 md:pl-10 md:pt-0 md:pr-2">
          {rightCol.map((domain) => (
            <div
              key={domain.id}
              className="border-t border-[var(--border)] pt-10 first:border-t-0 first:pt-0"
            >
              <DomainBlock domain={domain} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
