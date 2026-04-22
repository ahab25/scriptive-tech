"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { Service } from "@/lib/data";
import { cn } from "@/lib/utils";

const ACCENT_BG: Record<Service["accent"], string> = {
  cyan: "from-neon-cyan/30 to-transparent",
  violet: "from-neon-violet/30 to-transparent",
  magenta: "from-neon-magenta/30 to-transparent",
  lime: "from-neon-lime/30 to-transparent",
};

const ACCENT_TEXT: Record<Service["accent"], string> = {
  cyan: "text-neon-cyan",
  violet: "text-neon-violet",
  magenta: "text-neon-magenta",
  lime: "text-neon-lime",
};

const ACCENT_DOT: Record<Service["accent"], string> = {
  cyan: "bg-neon-cyan",
  violet: "bg-neon-violet",
  magenta: "bg-neon-magenta",
  lime: "bg-neon-lime",
};

type Props = {
  service: Service;
  onExplore: () => void;
};

export function ServiceCard({ service, onExplore }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);

  const spotlight = useMotionTemplate`radial-gradient(400px circle at ${mx}px ${my}px, rgba(0,229,255,0.12), transparent 50%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mx.set(x);
    my.set(y);
    rotY.set(((x / rect.width) - 0.5) * 10);
    rotX.set(-((y / rect.height) - 0.5) * 10);
  };

  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      data-cursor="hover"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", damping: 30, stiffness: 220 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-white/25 will-change-transform"
    >
      {/* Corner accent */}
      <div
        aria-hidden
        className={cn(
          "absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70",
          ACCENT_BG[service.accent],
        )}
      />

      {/* Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            {service.index}
          </span>
          <span className={cn("h-2 w-2 rounded-full", ACCENT_DOT[service.accent])} />
        </div>

        <h3
          className={cn(
            "mt-14 font-display text-3xl leading-[1] tracking-[-0.02em] text-white md:text-[2rem]",
          )}
        >
          {service.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-white/60">{service.summary}</p>

        <div className="mt-8 flex flex-wrap gap-1.5">
          {service.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 border-t border-white/5 pt-6">
          <button
            type="button"
            onClick={onExplore}
            data-cursor="hover"
            className={cn(
              "group/btn flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300",
              ACCENT_TEXT[service.accent],
            )}
          >
            <span>Explore</span>
            <span className="translate-x-0 transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
