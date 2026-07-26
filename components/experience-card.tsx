"use client";

import { useState } from "react";
import { EducationLogo } from "@/components/education-logo";
import { ExperienceProjectJumpLinks } from "@/components/experience-project-jump-links";
import { withBasePath } from "@/lib/base-path";

type Position = {
  visible: boolean;
  type?: string;
  title: string;
  period: string;
  responsibilities?: ({ text?: string } | string)[];
};

type Highlight = { visible: boolean; text: string };

type JumpLinkItem = { visible: boolean; slug: string; label: string };

export type ExperienceItem = {
  company?: string;
  location?: string;
  period?: string;
  summary?: string;
  logo?: { visible?: boolean; src?: string; alt?: string };
  primaryLink?: { visible?: boolean; url: string; label: string };
  projectJumpLinks?: {
    visible?: boolean;
    heading?: string;
    items?: JumpLinkItem[];
  };
  positions?: Position[];
  highlights?: Highlight[];
  techStackUsed?: string[];
};

const TECH_CAP = 8;
const HIGHLIGHTS_PREVIEW = 1;

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

export function ExperienceCard({ item }: { item: ExperienceItem }) {
  const [expanded, setExpanded] = useState(false);
  const [techExpanded, setTechExpanded] = useState(false);

  const logo = item.logo;
  const showLogo = !!(logo?.visible && logo?.src && logo.src.trim());

  const jump = item.projectJumpLinks?.visible ? item.projectJumpLinks : null;
  const jumpItems = jump?.items?.filter((x) => x.visible) ?? [];
  const hasJump = jumpItems.length > 0;

  const positions = (item.positions ?? []).filter((p) => p.visible);
  const highlights = (item.highlights ?? []).filter((h) => h.visible);
  const tech = item.techStackUsed ?? [];

  const previewHighlights = highlights.slice(0, HIGHLIGHTS_PREVIEW);
  const extraHighlights = highlights.slice(HIGHLIGHTS_PREVIEW);
  const canExpand = extraHighlights.length > 0;
  const leadText = previewHighlights[0]?.text ?? item.summary ?? null;

  const visibleTech = techExpanded ? tech : tech.slice(0, TECH_CAP);
  const hiddenTech = Math.max(0, tech.length - TECH_CAP);

  return (
    <article className="timeline-card text-base">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        {showLogo && (
          <EducationLogo
            src={withBasePath(logo!.src!)}
            alt={logo!.alt ?? item.company ?? "Logo"}
            className="h-12 w-12 object-contain sm:h-14 sm:w-14"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                {item.company}
              </h3>
              {item.location && (
                <p className="mt-0.5 text-sm text-[var(--muted)]">
                  {item.location}
                </p>
              )}
            </div>
            <span className="text-sm font-medium text-[var(--muted)]">
              {item.period}
            </span>
          </div>

          {hasJump && jump ? (
            <div className="mt-3">
              <ExperienceProjectJumpLinks
                heading={jump.heading ?? ""}
                items={jumpItems.map(({ slug, label }) => ({ slug, label }))}
              />
            </div>
          ) : item.primaryLink?.visible ? (
            <p className="mt-3 text-sm text-[var(--muted)]">
              <a
                href={item.primaryLink.url}
                className="underline underline-offset-2"
                {...(isExternal(item.primaryLink.url)
                  ? {
                      target: "_blank" as const,
                      rel: "noreferrer" as const,
                    }
                  : {})}
              >
                {item.primaryLink.label}
              </a>
            </p>
          ) : null}

          {positions.length > 0 && (
            <div className="mt-6 rounded-md bg-gradient-to-r from-sky-500/[0.06] to-transparent px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                Progression
              </p>
              <ol className="mt-2 relative space-y-4">
                <span
                  aria-hidden
                  className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-sky-500/60 via-[var(--border)] to-transparent"
                />
                {positions.map((p, i) => {
                  const isCurrent = i === 0;
                  const hasResp =
                    Array.isArray(p.responsibilities) &&
                    p.responsibilities.length > 0;
                  return (
                    <li key={i} className="relative pl-6">
                      <span
                        aria-hidden
                        className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
                          isCurrent
                            ? "border-transparent bg-gradient-to-br from-sky-500 to-indigo-500"
                            : "border-[var(--border)] bg-[var(--background)]"
                        }`}
                      />
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span
                          className={`text-sm font-semibold ${
                            isCurrent
                              ? "text-[var(--foreground)]"
                              : "text-[var(--foreground)]/80"
                          }`}
                        >
                          {p.title}
                        </span>
                        <span className="ml-auto text-xs font-medium tabular-nums text-[var(--muted)]">
                          {p.period}
                        </span>
                      </div>
                      {hasResp && (
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs leading-relaxed text-[var(--muted)]">
                          {p.responsibilities!.map((r, rIdx) => (
                            <li key={rIdx}>
                              {typeof r === "string" ? r : r.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          )}

          {leadText && (
            <blockquote className="relative mt-7 border-l-2 border-transparent px-4 py-2 [border-image:linear-gradient(to_bottom,#0ea5e9,#6366f1)_1_100%]">
              <p className="pl-5 text-base leading-relaxed text-[var(--foreground)]/90 sm:text-lg">
                {leadText}
              </p>
            </blockquote>
          )}

          {canExpand && (
            <div className="mt-4">
              <div
                className="grid transition-[grid-template-rows,margin-top] duration-300 ease-out"
                style={{
                  gridTemplateRows: expanded ? "1fr" : "0fr",
                  marginTop: expanded ? "0.5rem" : 0,
                }}
                aria-hidden={!expanded}
              >
                <div className="overflow-hidden">
                  <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--muted)] marker:text-sky-500/70">
                    {extraHighlights.map((h, i) => (
                      <li key={i}>{h.text}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpanded((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)]/80 px-3 py-1 text-xs font-semibold text-[var(--foreground)] transition hover:border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  {expanded
                    ? "Show less"
                    : `Show ${extraHighlights.length} more`}
                  <svg
                    className={`h-3 w-3 transition-transform ${expanded ? "rotate-180" : ""}`}
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
            </div>
          )}

          {tech.length > 0 && (
            <div className="mt-6 border-t border-dashed border-[var(--border)] pt-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[var(--muted)]">
                Tech Stack
              </p>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {visibleTech.map((t, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-[var(--border)] bg-[var(--background)]/60 px-2 py-0.5 text-[var(--muted)]"
                  >
                    {t}
                  </span>
                ))}
                {!techExpanded && hiddenTech > 0 && (
                  <button
                    type="button"
                    onClick={() => setTechExpanded(true)}
                    aria-label={`Show ${hiddenTech} more technologies`}
                    className="rounded-full border border-[var(--border)] bg-[var(--background)]/60 px-2 py-0.5 text-[var(--muted)] transition hover:border-[var(--foreground)]/40 hover:text-[var(--foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                  >
                    +{hiddenTech} more
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
