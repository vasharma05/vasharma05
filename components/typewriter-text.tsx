"use client";

import { useEffect, useRef, useState } from "react";

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
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(text);
      setDone(true);
      onCompleteRef.current?.();
      return;
    }
    setDisplay("");
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      if (i <= text.length) {
        setDisplay(text.slice(0, i));
        i++;
      } else {
        setDone(true);
        onCompleteRef.current?.();
        clearInterval(t);
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);

  const skip = () => {
    setDisplay(text);
    setDone(true);
    onCompleteRef.current?.();
  };

  return (
    <span className={className} onClick={!done ? skip : undefined}>
      {display}
      <span
        className={`ml-1 inline-block align-middle ${
          done ? "opacity-40" : "caret-blink"
        }`}
        style={{
          borderLeft: "2px solid var(--muted)",
          height: "0.9em",
        }}
        aria-hidden
      />
    </span>
  );
}
