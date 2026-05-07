"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const duration = 1600;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 350);
    };
    raf = requestAnimationFrame(tick);

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

          <div className="relative z-10 flex flex-col items-center gap-8 px-8">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-4"
            >
              <Image
                src="/scriptive logo.png"
                alt="Scriptive"
                width={160}
                height={160}
                priority
                className="h-40 w-auto"
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex w-[min(80vw,380px)] items-center gap-4"
            >
              <div className="font-mono text-xs text-white/50">
                {String(progress).padStart(3, "0")}
              </div>
              <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-cyan2"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="font-mono text-xs text-white/50">100</div>
            </motion.div>

            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Loading experience…
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
