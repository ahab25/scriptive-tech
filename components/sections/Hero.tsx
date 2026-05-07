"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef } from "react";
import { MagneticButton } from "../ui/MagneticButton";

const HeroScene = dynamic(
  () => import("../three/HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-975 via-obsidian-950 to-obsidian-1000" />
    ),
  },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* 3D layer — parallax on scroll */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <HeroScene />
      </motion.div>

      {/* Radial cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-glow opacity-70"
      />

      {/* Scanline grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Bottom fade to next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-obsidian-975 to-transparent"
      />

      {/* Copy & chrome */}
      <motion.div
        style={{ opacity }}
        className="pointer-events-none relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-between px-6 pb-12 pt-32 lg:px-10"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/40"
        >
          <span>[ studio / karachi ]</span>
          <span className="hidden sm:inline">[ est. 2020 — digital studio ]</span>
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
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/60"
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
            <Link href="/#contact">
              <MagneticButton size="lg">Start a project</MagneticButton>
            </Link>
            <Link href="/#work">
              <MagneticButton size="lg" variant="outline">
                View work →
              </MagneticButton>
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/30"
        >
          <span>scroll to explore</span>
          <span className="flex items-center gap-3">
            <span className="relative h-8 w-px bg-white/15">
              <motion.span
                className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-neon-cyan"
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
            <span>01 / 07</span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
