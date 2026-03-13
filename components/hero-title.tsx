"use client";

import { useEffect, useState } from "react";

type HeroTitleProps = {
  options: string[];
  speed?: number;
  pauseMs?: number;
  className?: string;
};

export function HeroTitle({
  options,
  speed = 90,
  pauseMs = 1200,
  className = "",
}: HeroTitleProps) {
  const safeOptions = options.length > 0 ? options : [""];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!safeOptions.length) {
      return;
    }

    const current = safeOptions[index];
    const isWordComplete = text === current;
    const isWordEmpty = text === "";

    let timeout: NodeJS.Timeout;

    if (!isDeleting && isWordComplete) {
      // Pause on full word, then start deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseMs);
    } else if (isDeleting && isWordEmpty) {
      // Finished deleting, move to next word and start typing
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % safeOptions.length);
      }, 200);
    } else {
      const nextText = isDeleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);

      const typingSpeed = speed;
      const deletingSpeed = Math.max(40, Math.floor((speed ?? 90) / 2));

      timeout = setTimeout(
        () => setText(nextText),
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [safeOptions, index, text, isDeleting, speed, pauseMs]);

  return (
    <span className={className}>
      {text}
      <span
        className="ml-1 inline-block align-middle animate-pulse"
        style={{
          borderLeft: "1px solid var(--muted)",
          height: "0.9em",
        }}
        aria-hidden
      />
    </span>
  );
}

