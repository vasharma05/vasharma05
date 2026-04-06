"use client";

import * as React from "react";
import { projectCardId } from "@/lib/project-card-id";

type VisibleText = { visible?: boolean; text: string };
type VisibleTag = { visible?: boolean | string; label: string };

export type ProjectItem = {
  visible?: boolean;
  slug: string;
  title: string;
  role: string;
  organization: string;
  summary: string;
  tags: VisibleTag[];
  highlights?: VisibleText[];
};

export function ProjectsGrid({
  items,
}: {
  items: ProjectItem[];
}) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items
        .filter((item) => item.visible !== false)
        .map((item) => {
          const visibleHighlights =
            item.highlights?.filter((h) => h.visible !== false) ?? [];
          const canExpand = visibleHighlights.length > 0;
          const isOpen = !!open[item.slug];
          const contentId = `${projectCardId(item.slug)}-details`;

          return (
            <article
              key={item.slug}
              id={projectCardId(item.slug)}
              tabIndex={-1}
              className="card project-card-focusable text-base"
            >
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                {item.organization} · {item.role}
              </p>
              <p className="mt-3 text-sm text-[var(--muted)]">{item.summary}</p>

              {canExpand && (
                <div className="mt-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--background)]/80 px-3 py-1 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() =>
                      setOpen((prev) => ({ ...prev, [item.slug]: !prev[item.slug] }))
                    }
                  >
                    {isOpen ? "Show less" : "Know more"}
                  </button>
                </div>
              )}

              {canExpand && isOpen && (
                <ul
                  id={contentId}
                  className="mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed text-[var(--muted)]"
                >
                  {visibleHighlights.map((h, j) => (
                    <li key={j}>{h.text}</li>
                  ))}
                </ul>
              )}

              <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                {item.tags
                  .filter((t) => t.visible !== false)
                  .map((t, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-[var(--border)] bg-[var(--background)]/60 px-2 py-0.5 text-[var(--muted)]"
                    >
                      {t.label}
                    </span>
                  ))}
              </div>
            </article>
          );
        })}
    </div>
  );
}

