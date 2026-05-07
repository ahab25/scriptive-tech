"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function ScriptiveLogo({ className }: Props) {
  const id = useId();
  const blueId = `${id}-blue`;
  const silverId = `${id}-silver`;

  return (
    <svg
      viewBox="0 0 60 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={blueId} x1="60" y1="0" x2="0" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2878FF" />
          <stop offset="60%" stopColor="#1A5CE0" />
          <stop offset="100%" stopColor="#0B38B0" />
        </linearGradient>
        <linearGradient id={silverId} x1="0" y1="32" x2="60" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6890B4" />
          <stop offset="50%" stopColor="#A8C4D8" />
          <stop offset="100%" stopColor="#E4F0FA" />
        </linearGradient>
      </defs>

      {/* Silver lower piece — rendered first (behind) */}
      <path
        d="M54 30 C58 32 58 40 56 47 C53 54 46 58 36 58 L20 58 C10 58 4 53 4 43 C4 36 8 31 17 30 L42 22 Z"
        fill={`url(#${silverId})`}
      />

      {/* Blue upper piece — rendered second (in front at crossing) */}
      <path
        d="M6 34 C2 32 2 23 4 17 C7 9 14 5 24 5 L40 5 C50 5 56 10 56 20 C56 28 50 33 42 34 L17 42 Z"
        fill={`url(#${blueId})`}
      />
    </svg>
  );
}
