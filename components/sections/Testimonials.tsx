"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/data";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const current = TESTIMONIALS[idx]!;

  // Auto-advance every 7s, pause on hover
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="testimonials"
      className="relative py-32 lg:py-48"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel index="06">Words from collaborators</SectionLabel>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <RevealText
              as="h2"
              className="font-display text-display-sm text-white text-balance"
            >
              Kind words from kind people.
            </RevealText>
          </div>

          <div className="lg:col-span-8">
            <div className="relative min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={idx}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-2xl leading-[1.1] tracking-[-0.01em] text-white sm:text-3xl md:text-5xl"
                >
                  <span className="mr-2 text-neon-cyan">"</span>
                  {current.quote}
                  <span className="ml-1 text-neon-cyan">"</span>
                </motion.blockquote>
              </AnimatePresence>

              <div className="mt-8 flex items-end justify-between gap-2 sm:mt-12 sm:gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${idx}-meta`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="font-mono text-sm text-white">
                      {current.name}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                      {current.role}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <button
                    data-cursor="hover"
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={() =>
                      setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                    }
                    className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-neon-cyan hover:text-neon-cyan"
                  >
                    ←
                  </button>
                  <span className="w-14 text-center font-mono text-xs text-white/60">
                    {String(idx + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
                  </span>
                  <button
                    data-cursor="hover"
                    type="button"
                    aria-label="Next testimonial"
                    onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
                    className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-neon-cyan hover:text-neon-cyan"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
