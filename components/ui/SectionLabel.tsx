import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  index: string;
  children: ReactNode;
  className?: string;
};

/**
 * A small eyebrow label with a monospaced index marker.
 * Adds editorial rigor — every section gets labelled and numbered.
 */
export function SectionLabel({ index, children, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-white/60",
        className,
      )}
    >
      <span className="text-neon-cyan">[{index}]</span>
      <span className="h-px w-8 bg-white/20" />
      <span>{children}</span>
    </div>
  );
}
