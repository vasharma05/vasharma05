"use client";

import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

type NavItem = { id: string; label: string; targetId: string };

type SiteNavProps = {
  brand: string;
  items: NavItem[];
};

export function SiteNav({ brand, items }: SiteNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = items
      .map((i) => document.getElementById(i.targetId))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header
      className={`sticky top-0 z-30 border-b bg-[var(--background)]/80 backdrop-blur transition-shadow ${
        scrolled
          ? "border-[var(--border)] shadow-sm"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[72rem] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#hero"
          className="text-base font-semibold tracking-tight text-[var(--foreground)] sm:text-lg"
        >
          {brand}
        </a>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-5 text-sm font-medium md:flex">
            {items.map((item) => {
              const active = activeId === item.targetId;
              return (
                <a
                  key={item.id}
                  href={`#${item.targetId}`}
                  aria-current={active ? "location" : undefined}
                  className={`relative transition-colors ${
                    active
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[var(--foreground)] transition-all duration-300 ${
                      active ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--foreground)] transition hover:bg-[var(--card)] md:hidden"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-[var(--border)] bg-[var(--background)] transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[72rem] flex-col gap-1 px-4 py-3 text-sm font-medium sm:px-6 lg:px-8">
          {items.map((item) => {
            const active = activeId === item.targetId;
            return (
              <a
                key={item.id}
                href={`#${item.targetId}`}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 transition ${
                  active
                    ? "bg-[var(--card)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--card)] hover:text-[var(--foreground)]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
