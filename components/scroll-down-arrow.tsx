"use client";

import { useEffect, useState } from "react";

export function ScrollDownArrow({ targetId = "about" }: { targetId?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={`#${targetId}`}
      aria-label={`Scroll to ${targetId} section`}
      className={`mt-auto inline-flex text-[var(--muted)] transition-opacity duration-500 hover:text-[var(--foreground)] ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
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
