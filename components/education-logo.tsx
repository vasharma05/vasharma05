"use client";

import { useState } from "react";

type EducationLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export function EducationLogo({ src, alt, className = "" }: EducationLogoProps) {
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <div className="flex-shrink-0">
      <img
        src={src}
        alt={alt}
        className={className}
        onError={() => setError(true)}
      />
    </div>
  );
}
