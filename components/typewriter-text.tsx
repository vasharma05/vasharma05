"use client";

import { useEffect, useState } from "react";

type TypewriterTextProps = {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  speed = 80,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplay("");
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else {
        setDone(true);
        onComplete?.();
        clearInterval(t);
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed, onComplete]);

  return (
    <span className={className}>
      {display}
      <span
        className={`ml-1 inline-block align-middle ${
          done ? "opacity-40" : "animate-pulse"
        }`}
        style={{
          animationDuration: "0.8s",
          borderLeft: "1px solid var(--muted)",
          height: "0.9em",
        }}
        aria-hidden
      >
      </span>
    </span>
  );
}
