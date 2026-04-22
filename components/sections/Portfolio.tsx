"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PORTFOLIO } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

export function Portfolio() {
  return (
    <section id="work" className="relative py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="05">Selected work</SectionLabel>
            <RevealText
              as="h2"
              className="mt-8 font-display text-display-md text-white text-balance"
            >
              Work that rewards a closer look.
            </RevealText>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
            {PORTFOLIO.length} projects · updated 2025
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="mt-20 grid grid-cols-12 gap-4 auto-rows-[240px] md:auto-rows-[300px]">
          {PORTFOLIO.map((p, i) => {
            const spans = [
              "col-span-12 md:col-span-7 row-span-2",
              "col-span-12 md:col-span-5 row-span-1",
              "col-span-12 md:col-span-5 row-span-1",
              "col-span-12 md:col-span-4 row-span-2",
              "col-span-12 md:col-span-4 row-span-1",
              "col-span-12 md:col-span-4 row-span-1",
            ];
            const spanClass = spans[i % spans.length];

            return (
              <motion.a
                key={p.slug}
                href={`/work/${p.slug}`}
                data-cursor="hover"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10",
                  spanClass,
                )}
              >
                {/* Photo */}
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Gradient fallback tint */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-40 mix-blend-overlay",
                    p.color,
                  )}
                />

                {/* Noise */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay"
                />

                {/* Dark scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-1000/90 via-obsidian-1000/20 to-transparent" />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-display text-3xl text-white tracking-[-0.02em] md:text-4xl">
                      {p.title}
                    </h3>
                    <span className="translate-x-[-8px] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-neon-cyan text-obsidian-1000">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
