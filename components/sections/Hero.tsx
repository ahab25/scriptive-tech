"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { MagneticButton } from "../ui/MagneticButton";

// Load the 3D scene only on the client — saves ~350kb from the server bundle
const HeroScene = dynamic(
  () => import("../three/HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-975 via-obsidian-950 to-obsidian-1000" />
    ),
  },
);

/**
 * The Hero is the first impression — we spend budget here.
 * Layout: 3D canvas fills the viewport, display copy layered above
 * via pointer-events-none, interactive chrome (CTAs) on top.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* 3D layer */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Radial cursor spotlight overlay — DOM level */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70"
      />

      {/* Scanline grid — subtle futurism */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Copy & chrome */}
      <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-12 pt-32 lg:px-10">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/50"
        >
          <span>[ studio / karachi ]</span>
          <span className="hidden sm:inline">[ est. 2020 — awwwards-ready ]</span>
        </motion.div>

        {/* Headline block */}
        <div className="pointer-events-none relative">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-cyan"
          >
            ● A software studio
          </motion.p>

          <h1 className="font-display text-display-lg text-white text-balance">
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 2.2, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                We build
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block text-neon italic"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 2.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                digital
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 2.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                experiences.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/70"
          >
            SCRIPTIVE is an independent studio engineering premium websites,
            mobile apps, 3D interfaces and AI-powered products for ambitious
            brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton size="lg">Start a project</MagneticButton>
            <MagneticButton size="lg" variant="outline">
              View work →
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/40"
        >
          <span>scroll to explore</span>
          <span className="flex items-center gap-3">
            <span className="relative h-8 w-px bg-white/20">
              <motion.span
                className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-neon-cyan"
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span>01 / 08</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
