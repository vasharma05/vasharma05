"use client";

import { projectCardId } from "@/lib/project-card-id";

export type ProjectJumpItem = {
  slug: string;
  label: string;
};

export function ExperienceProjectJumpLinks({
  heading,
  items,
}: {
  heading: string;
  items: ProjectJumpItem[];
}) {
  if (items.length === 0) return null;

  function goToProject(slug: string) {
    const id = projectCardId(slug);
    const el = document.getElementById(id);
    if (!el || !(el instanceof HTMLElement)) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
    const hash = `#${id}`;
    if (typeof window !== "undefined" && window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
  }

  return (
    <div className="border-t border-[var(--border)] pt-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
        {heading}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`#${projectCardId(item.slug)}`}
            onClick={(e) => {
              e.preventDefault();
              goToProject(item.slug);
            }}
            className="inline-flex rounded-full border border-[var(--border)] bg-[var(--background)]/80 px-3 py-1 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]/30 hover:bg-[var(--foreground)]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
