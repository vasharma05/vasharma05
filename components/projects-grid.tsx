"use client";

import * as React from "react";
import { projectCardId } from "@/lib/project-card-id";
import { withBasePath } from "@/lib/base-path";
import type { ProjectItem } from "@/lib/content-types";

export function ProjectsGrid({ items }: { items: ProjectItem[] }) {
  const [open, setOpen] = React.useState<Record<string, boolean>>({});

  return (
    <ul className="grid gap-0 md:grid-cols-2">
      {items
        .filter((item) => item.visible !== false)
        .map((item) => {
          const visibleHighlights = item.highlights?.filter((h) => h.visible !== false) ?? [];
          const [leadHighlight, ...restHighlights] = visibleHighlights;
          const canExpand = restHighlights.length > 0;
          const isOpen = !!open[item.slug];
          const contentId = `${projectCardId(item.slug)}-details`;

          return (
            <li
              key={item.slug}
              className="border-b border-[var(--border)] py-5 md:[&:nth-last-child(-n+2):nth-child(odd)]:border-b-0 md:odd:border-r md:odd:pr-5 md:even:pl-5 last:border-b-0"
            >
              <article
                id={projectCardId(item.slug)}
                tabIndex={-1}
                className="project-card-focusable text-base"
              >
                {item.image?.visible && item.image?.src && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={withBasePath(item.image.src)}
                    alt={item.image.alt ?? item.title}
                    className="mb-4 aspect-[16/9] w-full rounded-md border border-[var(--border)] object-cover"
                    loading="lazy"
                  />
                )}
                <h3 className="text-base font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {item.organization} · {item.role}
                </p>
                <p className="mt-3 text-sm text-[var(--muted)]">{item.summary}</p>

                {leadHighlight && (
                  <blockquote className="relative mt-4 rounded-md bg-gradient-to-r from-sky-500/[0.06] to-transparent px-4 py-2 [border-image:linear-gradient(to_bottom,#0ea5e9,#6366f1)_1_100%] border-l-2 border-transparent">
                    <p className="text-sm leading-relaxed text-[var(--foreground)]/90">
                      {leadHighlight.text}
                    </p>
                  </blockquote>
                )}

                {canExpand && (
                  <>
                    <div
                      id={contentId}
                      className="grid transition-[grid-template-rows,margin-top] duration-300 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        marginTop: isOpen ? "0.75rem" : 0,
                      }}
                      aria-hidden={!isOpen}
                    >
                      <ul className="list-disc space-y-2 overflow-hidden pl-4 text-sm leading-relaxed text-[var(--muted)] marker:text-sky-500/70">
                        {restHighlights.map((h, j) => (
                          <li key={j}>{h.text}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)]/80 px-3 py-1 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        onClick={() =>
                          setOpen((prev) => ({
                            ...prev,
                            [item.slug]: !prev[item.slug],
                          }))
                        }
                      >
                        {isOpen ? "Show less" : `Show ${restHighlights.length} more`}
                        <svg
                          className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5 text-xs">
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
            </li>
          );
        })}
    </ul>
  );
}
