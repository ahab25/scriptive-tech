"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { PORTFOLIO } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

type Project = (typeof PORTFOLIO)[number];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.a
      href={`/work/${p.slug}`}
      data-cursor="hover"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{
        duration: 0.85,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/10"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={p.image}
          alt={p.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-35 mix-blend-overlay",
            p.color,
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-1000/90 via-obsidian-1000/20 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
            <span>{p.category}</span>
            <span>{p.year}</span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <h3 className="font-display text-xl text-white tracking-[-0.02em] md:text-2xl">
              {p.title}
            </h3>
            <span className="translate-x-[-8px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 flex-shrink-0">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-neon-cyan text-obsidian-1000 text-sm">
                →
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle horizontal drift: rows move in opposite directions
  const x1 = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);

  const half = Math.ceil(PORTFOLIO.length / 2);
  const row1 = PORTFOLIO.slice(0, half);
  const row2 = PORTFOLIO.slice(half);

  return (
    <section id="work" className="relative py-32 lg:py-48">
      {/* Ambient */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[60vh] w-[70vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-cyan/5 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04">Selected work</SectionLabel>
            <RevealText
              as="h2"
              className="mt-8 font-display text-display-md text-white text-balance"
            >
              Work that rewards a closer look.
            </RevealText>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40"
          >
            {PORTFOLIO.length} projects · updated 2025
          </motion.div>
        </div>
      </div>

      {/* ─── Mobile & tablet: standard responsive grid ─── */}
      <div className="mt-16 mx-auto max-w-[1400px] px-6 lg:hidden lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PORTFOLIO.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>

      {/* ─── Desktop: two rows with horizontal drift ─── */}
      <div
        ref={sectionRef}
        className="mt-16 hidden overflow-hidden lg:block"
      >
        {/* Row 1 — drifts left on scroll */}
        <motion.div
          className="flex gap-4 px-10"
          style={{ x: x1 }}
        >
          {row1.map((p, i) => (
            <div key={p.slug} className="w-[calc((100vw-80px-16px*2)/3)] max-w-[460px] flex-shrink-0">
              <ProjectCard p={p} index={i} />
            </div>
          ))}
        </motion.div>

        {/* Row 2 — drifts right on scroll */}
        {row2.length > 0 && (
          <motion.div
            className="mt-4 flex gap-4 px-10"
            style={{ x: x2 }}
          >
            {row2.map((p, i) => (
              <div key={p.slug} className="w-[calc((100vw-80px-16px*2)/3)] max-w-[460px] flex-shrink-0">
                <ProjectCard p={p} index={i + half} />
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mt-14 flex justify-center"
      >
        <Link
          href="/#contact"
          className="group flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
        >
          <span className="h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-16 group-hover:bg-neon-cyan/60" />
          Start a project
          <span className="h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-16 group-hover:bg-neon-cyan/60" />
        </Link>
      </motion.div>
    </section>
  );
}
