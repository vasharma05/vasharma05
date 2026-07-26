"use client";

import { useReveal } from "@/lib/hooks/use-reveal";

type SectionFadeProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionFade({ children, className = "" }: SectionFadeProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
