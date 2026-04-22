"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A tight pre-load sequence:
 *   1. SCRIPTIVE mark fades in
 *   2. Counter ticks 00 → 100
 *   3. A horizontal line sweeps across
 *   4. Panels split and reveal the site
 *
 * We don't block on real asset loading — that would feel inconsistent
 * depending on cache. Instead we give every visitor a tight 1.8s ritual.
 */
export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out for a natural deceleration at the end
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 350);
    };
    raf = requestAnimationFrame(tick);

    // Lock scroll during preload
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] grid place-items-center bg-obsidian-1000"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Splitting panels on exit */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-obsidian-1000"
            exit={{ x: "-100%" }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-obsidian-1000"
            exit={{ x: "100%" }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          />

          <div className="relative z-10 flex flex-col items-center gap-10 px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl tracking-[-0.03em] text-white sm:text-6xl"
            >
              SCRIPTIVE
            </motion.div>

            <div className="flex w-[min(80vw,420px)] items-center gap-4">
              <div className="font-mono text-xs text-white/60">
                {String(progress).padStart(3, "0")}
              </div>
              <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-magenta"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="font-mono text-xs text-white/60">100</div>
            </div>

            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Compiling experience…
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
