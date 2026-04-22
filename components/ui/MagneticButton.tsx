"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-[15px]",
  lg: "h-14 px-9 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-neon-cyan text-obsidian-1000 hover:bg-white shadow-neon-cyan",
  ghost:
    "bg-transparent text-white hover:bg-white/5",
  outline:
    "bg-transparent text-white border border-white/15 hover:border-neon-cyan hover:text-neon-cyan",
};

/**
 * A button that gently pulls toward the cursor when hovered.
 * The inner text has its own slight counter-movement for a
 * premium sense of depth (see child span).
 */
export function MagneticButton({
  children,
  className,
  variant = "primary",
  size = "md",
  magnetic = true,
  ...rest
}: Props) {
  const ref = useMagnetic<HTMLButtonElement>(magnetic ? 18 : 0);

  return (
    <button
      ref={ref}
      data-cursor="hover"
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight",
        "transition-[background,color,border-color,box-shadow] duration-300",
        "focus-ring magnet",
        "disabled:cursor-not-allowed disabled:opacity-50",
        sizes[size],
        variants[variant],
        className,
      )}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
