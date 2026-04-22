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
  cyan: "bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan",
  violet: "bg-neon-violet/10 border-neon-violet/20 text-neon-violet",
  magenta: "bg-neon-magenta/10 border-neon-magenta/20 text-neon-magenta",
  lime: "bg-neon-lime/10 border-neon-lime/20 text-neon-lime",
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

export function ServiceModal({ service, onClose }: Props) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-obsidian-1000/85 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-obsidian-950 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner glow */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br blur-3xl opacity-50",
                ACCENT_GLOW[service.accent],
              )}
            />

            <div className="relative p-8 md:p-12">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full shrink-0",
                        ACCENT_DOT[service.accent],
                      )}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                      Service {service.index}
                    </span>
                  </div>
                  <h2
                    className={cn(
                      "mt-3 font-display text-3xl tracking-[-0.02em] md:text-4xl",
                      ACCENT_TEXT[service.accent],
                    )}
                  >
                    {service.title}
                  </h2>
                </div>

                {/* Close */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  data-cursor="hover"
                  className="shrink-0 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <p className="mt-8 text-[15px] leading-relaxed text-white/70">
                {service.detail.description}
              </p>

              {/* Deliverables */}
              <div className="mt-8">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  What you'll receive
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.detail.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full",
                          ACCENT_DOT[service.accent],
                        )}
                      />
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
                    <span
                      key={t}
                      className={cn(
                        "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.15em]",
                        ACCENT_BG[service.accent],
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Ready to get started?
                </p>
                <a
                  href="#contact"
                  onClick={onClose}
                  data-cursor="hover"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-[0.15em] transition-all duration-300",
                    "bg-white text-obsidian-1000 hover:bg-neon-cyan",
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
