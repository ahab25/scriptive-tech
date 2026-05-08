"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Service } from "@/lib/data";
import { cn } from "@/lib/utils";

type Props = {
  service: Service | null;
  onClose: () => void;
};

const ACCENT_TEXT: Record<Service["accent"], string> = {
  cyan: "text-neon-cyan",
  violet: "text-neon-violet",
  magenta: "text-neon-magenta",
  lime: "text-neon-lime",
};
const ACCENT_BG: Record<Service["accent"], string> = {
  cyan: "bg-neon-cyan/10 border-neon-cyan/25 text-neon-cyan",
  violet: "bg-neon-violet/10 border-neon-violet/25 text-neon-violet",
  magenta: "bg-neon-magenta/10 border-neon-magenta/25 text-neon-magenta",
  lime: "bg-neon-lime/10 border-neon-lime/25 text-neon-lime",
};
const ACCENT_DOT: Record<Service["accent"], string> = {
  cyan: "bg-neon-cyan",
  violet: "bg-neon-violet",
  magenta: "bg-neon-magenta",
  lime: "bg-neon-lime",
};
const ACCENT_GLOW: Record<Service["accent"], string> = {
  cyan: "from-neon-cyan/15 to-transparent",
  violet: "from-neon-violet/15 to-transparent",
  magenta: "from-neon-magenta/15 to-transparent",
  lime: "from-neon-lime/15 to-transparent",
};
const ACCENT_DIVIDER: Record<Service["accent"], string> = {
  cyan: "bg-neon-cyan",
  violet: "bg-neon-violet",
  magenta: "bg-neon-magenta",
  lime: "bg-neon-lime",
};

export function ServiceModal({ service, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = service ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-obsidian-1000/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Sheet — full-width slide-up on mobile, centered card on desktop */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            className="relative w-full max-h-[92dvh] overflow-hidden rounded-t-3xl border border-white/10 bg-obsidian-950 shadow-2xl sm:max-w-2xl sm:rounded-3xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner glow */}
            <div aria-hidden className={cn("pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl opacity-40", ACCENT_GLOW[service.accent])} />

            {/* Drag handle — mobile only */}
            <div className="flex justify-center pt-3 sm:hidden">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            {/* Sticky header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-obsidian-950/95 px-6 pb-4 pt-5 backdrop-blur-sm sm:px-8 sm:pt-8">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className={cn("h-2 w-2 shrink-0 rounded-full", ACCENT_DOT[service.accent])} />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                    Service {service.index}
                  </span>
                </div>
                <h2 className={cn("mt-2 font-display text-2xl tracking-[-0.02em] sm:text-4xl", ACCENT_TEXT[service.accent])}>
                  {service.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="mt-1 shrink-0 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/50 transition-colors hover:border-white/40 hover:text-white"
              >
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-3.5 w-3.5">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Accent divider */}
            <div className={cn("mx-6 h-px sm:mx-8", ACCENT_DIVIDER[service.accent])} style={{ opacity: 0.2 }} />

            {/* Scrollable body */}
            <div className="overflow-y-auto overscroll-contain px-6 pb-8 pt-6 sm:px-8 max-h-[calc(92dvh-120px)]">

              {/* Description */}
              <p className="text-[15px] leading-relaxed text-white/70">
                {service.detail.description}
              </p>

              {/* Deliverables */}
              <div className="mt-8">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  What you'll receive
                </div>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {service.detail.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
                      <span className={cn("mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full", ACCENT_DOT[service.accent])} />
                      <span className="text-sm leading-relaxed text-white/80">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div className="mt-8">
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Tools & tech
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.detail.tech.map((t) => (
                    <span key={t} className={cn("rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em]", ACCENT_BG[service.accent])}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-base text-white">Ready to get started?</p>
                  <p className="mt-0.5 text-sm text-white/40">Let's talk about your project.</p>
                </div>
                <a
                  href="/#contact"
                  onClick={onClose}
                  data-cursor="hover"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-[0.12em] transition-all duration-300",
                    "bg-neon-cyan text-obsidian-1000 hover:bg-white",
                  )}
                >
                  Start a project →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
