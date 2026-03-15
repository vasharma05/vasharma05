"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faReddit } from "@fortawesome/free-brands-svg-icons";

type ConnectLink = { id: string; label: string; url: string; visible?: boolean };

type HeroConnectProps = {
  label: string;
  links: ConnectLink[];
};

function DailyDevIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 16.5v-9H8.25v9h2.25zm.75-10.5c.414 0 .75-.336.75-.75S11.664 4.5 11.25 4.5s-.75.336-.75.75.336.75.75.75zm3.75 10.5h2.25v-4.875c0-1.313-.469-2.203-1.594-2.203-1.125 0-1.781.89-1.781 2.203V16.5h2.25V9.75h-2.25v1.266h.031c.313-.594 1.031-1.219 2.156-1.219 2.297 0 2.813 1.5 2.813 3.609V16.5z" />
    </svg>
  );
}

const ICON_MAP: Record<string, { type: "fa"; icon: typeof faLinkedin } | { type: "svg"; Icon: React.ComponentType<{ className?: string }> }> = {
  linkedin: { type: "fa", icon: faLinkedin },
  reddit: { type: "fa", icon: faReddit },
  dailydev: { type: "svg", Icon: DailyDevIcon },
};

export function HeroConnect({ label, links }: HeroConnectProps) {
  const visible = links.filter((l) => l.visible !== false);
  if (visible.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {label}
      </span>
      <div className="flex items-center gap-2">
        {visible.map((link) => {
          const key = link.id.toLowerCase().replace(/\s/g, "");
          const iconDef = ICON_MAP[key] ?? ICON_MAP[link.id];
          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition hover:border-[var(--foreground)] hover:bg-[var(--card)]"
              title={link.label}
              aria-label={link.label}
            >
              {iconDef?.type === "fa" && (
                <FontAwesomeIcon icon={iconDef.icon} className="h-4 w-4" />
              )}
              {iconDef?.type === "svg" && (() => {
                const Icon = iconDef.Icon;
                return <Icon className="h-4 w-4" />;
              })()}
              {!iconDef && (
                <span className="text-xs font-semibold">
                  {link.label.charAt(0)}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
