"use client";

import { useReveal } from "@/lib/hooks/use-reveal";

export function TimelineItem({
  children,
  delayMs = 0,
}: {
  children: React.ReactNode;
  delayMs?: number;
  year?: string | null;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>({
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  });

  return (
    <div
      ref={ref}
      className={`timeline-item ${visible ? "is-visible" : "is-hidden"}`}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
