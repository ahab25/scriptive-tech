"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import type { Service } from "@/lib/data";
import { cn } from "@/lib/utils";

/* ── Accent maps ── */
const ACCENT_GLOW: Record<Service["accent"], string> = {
  cyan:    "from-neon-cyan/20 to-transparent",
  violet:  "from-neon-violet/20 to-transparent",
  magenta: "from-neon-magenta/20 to-transparent",
  lime:    "from-neon-lime/20 to-transparent",
};
const ACCENT_TEXT: Record<Service["accent"], string> = {
  cyan:    "text-neon-cyan",
  violet:  "text-neon-violet",
  magenta: "text-neon-magenta",
  lime:    "text-neon-lime",
};
const ACCENT_BORDER: Record<Service["accent"], string> = {
  cyan:    "bg-neon-cyan",
  violet:  "bg-neon-violet",
  magenta: "bg-neon-magenta",
  lime:    "bg-neon-lime",
};
const ACCENT_TAG: Record<Service["accent"], string> = {
  cyan:    "border-neon-cyan/20 text-neon-cyan/80 bg-neon-cyan/5",
  violet:  "border-neon-violet/20 text-neon-violet/80 bg-neon-violet/5",
  magenta: "border-neon-magenta/20 text-neon-magenta/80 bg-neon-magenta/5",
  lime:    "border-neon-lime/20 text-neon-lime/80 bg-neon-lime/5",
};
const ACCENT_ICON_BG: Record<Service["accent"], string> = {
  cyan:    "bg-neon-cyan/10 text-neon-cyan",
  violet:  "bg-neon-violet/10 text-neon-violet",
  magenta: "bg-neon-magenta/10 text-neon-magenta",
  lime:    "bg-neon-lime/10 text-neon-lime",
};

/* ── Per-service SVG icons ── */
const ICONS: Record<string, React.ReactNode> = {
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="8" x2="21" y2="8"/>
      <line x1="8" y1="3" x2="8" y2="8"/><circle cx="6" cy="5.5" r="0.5" fill="currentColor" stroke="none"/>
      <circle cx="9.5" cy="5.5" r="0.5" fill="currentColor" stroke="none"/>
      <path d="M7 13h4M7 16h6" strokeWidth="1.5"/>
    </svg>
  ),
  uiux: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      <path d="M15 5l3 3" strokeWidth="1.2" opacity="0.5"/>
    </svg>
  ),
  mobile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/>
      <path d="M9 6h6" strokeWidth="1.2" opacity="0.5"/>
    </svg>
  ),
  marketing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
      <path d="M8 11h6M11 8v6" strokeWidth="1.2" opacity="0.6"/>
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 2a2 2 0 012 2v1a2 2 0 01-4 0V4a2 2 0 012-2z"/><path d="M12 19v3M5 12H2M22 12h-3"/>
      <circle cx="12" cy="12" r="4"/>
      <path d="M6.34 6.34l1.42 1.42M16.24 16.24l1.42 1.42M6.34 17.66l1.42-1.42M16.24 7.76l1.42-1.42" strokeWidth="1.2"/>
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  ),
  "3d": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      <line x1="14" y1="4" x2="10" y2="20" strokeWidth="1.2" opacity="0.6"/>
    </svg>
  ),
};

type Props = { service: Service; onExplore: () => void };

export function ServiceCard({ service, onExplore }: Props) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(29,106,255,0.10), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    if (!isTouch) {
      rotY.set(((e.clientX - r.left) / r.width - 0.5) * 8);
      rotX.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
    }
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  const icon = ICONS[service.id] ?? ICONS["custom"];

  return (
    <motion.div
      data-cursor="hover"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileHover={{ y: -6 }}
      style={isTouch ? {} : { rotateX: rotX, rotateY: rotY, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", damping: 28, stiffness: 200 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.04] transition-colors duration-500"
    >
      {/* Corner glow */}
      <div aria-hidden className={cn("pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60", ACCENT_GLOW[service.accent])} />

      {/* Spotlight */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: spotlight }} />

      {/* Animated bottom border */}
      <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full">
        <div className={cn("h-full w-full opacity-70", ACCENT_BORDER[service.accent])} />
      </div>

      <div className="relative flex h-full flex-col p-7">

        {/* Header row */}
        <div className="flex items-start justify-between">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.12, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn("flex h-12 w-12 items-center justify-center rounded-xl", ACCENT_ICON_BG[service.accent])}
          >
            {icon}
          </motion.div>

          {/* Index */}
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/25 transition-colors duration-300 group-hover:text-white/50">
            {service.index}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "mt-6 font-display text-[1.65rem] leading-[1.1] tracking-[-0.02em] transition-colors duration-300",
          "text-white group-hover:" + ACCENT_TEXT[service.accent].replace("text-", ""),
        )}>
          {service.title}
        </h3>

        {/* Summary */}
        <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-white/55">
          {service.summary}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {service.tags.map((t) => (
            <span key={t} className={cn("rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300", ACCENT_TAG[service.accent])}>
              {t}
            </span>
          ))}
        </div>

        {/* Explore button */}
        <div className="mt-6 border-t border-white/5 pt-5">
          <button
            type="button"
            onClick={onExplore}
            data-cursor="hover"
            className={cn(
              "group/btn flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300",
              ACCENT_TEXT[service.accent],
            )}
          >
            <span className="relative">
              Explore
              <span className={cn("absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover/btn:w-full", ACCENT_BORDER[service.accent])} />
            </span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current transition-all duration-300 group-hover/btn:scale-110">
              <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-2.5 w-2.5 translate-x-0 transition-transform duration-300 group-hover/btn:translate-x-0.5">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
