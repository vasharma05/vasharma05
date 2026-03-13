"use client";

export function ScrollDownArrow({ targetId = "about" }: { targetId?: string }) {
  return (
    <a
      href={`#${targetId}`}
      className="mt-auto flex flex-col items-center gap-1 text-[var(--muted)] transition hover:text-[var(--foreground)]"
      aria-label={`Scroll to ${targetId} section`}
    >
      <span className="text-sm font-medium uppercase tracking-widest">
        Scroll
      </span>
      <svg
        className="h-10 w-10 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </a>
  );
}
