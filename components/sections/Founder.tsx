"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image from "next/image";
import { SectionLabel } from "../ui/SectionLabel";
import { RevealText } from "../ui/RevealText";

const EXPERTISE = [
  "Full-Stack Engineering",
  "Product Strategy",
  "UI / UX Design",
  "AI & Automation",
  "Growth & SEO",
  "Brand Identity",
  "Web3 & DeFi",
  "E-commerce",
];

const EXPOSURE = [
  { value: "5+", label: "Years building" },
  { value: "140+", label: "Products shipped" },
  { value: "15+", label: "Countries" },
  { value: "6", label: "Industry verticals" },
];

export function Founder() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, rgba(0,229,255,0.06), transparent 60%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section
      id="founder"
      className="relative border-t border-white/5 bg-obsidian-1000 py-32 lg:py-48 overflow-hidden"
      onPointerMove={onMove}
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 h-[60vh] w-[60vw] -translate-y-1/2 rounded-full bg-gradient-to-r from-neon-cyan/8 to-transparent blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 h-[40vh] w-[40vw] rounded-full bg-gradient-to-l from-neon-violet/8 to-transparent blur-3xl" />

      {/* Spotlight */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-60" style={{ background: spotlight }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel index="07">The person behind the work</SectionLabel>

        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-20 lg:items-center">

          {/* ── Portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Decorative grid border */}
              <div aria-hidden className="absolute -inset-3 rounded-3xl border border-neon-cyan/10" />
              <div aria-hidden className="absolute -inset-6 rounded-3xl border border-white/5" />

              {/* Glow behind image */}
              <div aria-hidden className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-violet/10 blur-2xl scale-95" />

              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/team/ahab.jpg"
                  alt="Ahab Khan — Founder & CEO, SCRIPTIVE"
                  width={560}
                  height={680}
                  className="w-full object-cover object-top"
                  priority
                />
                {/* Subtle colour grade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-1000/70 via-obsidian-1000/10 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent" />

                {/* Name badge */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="rounded-xl border border-white/10 bg-obsidian-1000/80 px-4 py-3 backdrop-blur-md">
                    <div className="font-display text-lg text-white leading-tight">Ahab Khan</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-neon-cyan">
                      Founder &amp; CEO · SCRIPTIVE
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-4 top-12 rounded-2xl border border-white/10 bg-obsidian-975/90 px-4 py-3 backdrop-blur-md sm:-right-8"
              >
                <div className="font-display text-3xl text-neon-cyan">5+</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Yrs building</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-4 bottom-24 rounded-2xl border border-white/10 bg-obsidian-975/90 px-4 py-3 backdrop-blur-md sm:-left-8"
              >
                <div className="font-display text-3xl text-neon-violet">140+</div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">Products shipped</div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Content ── */}
          <div className="lg:col-span-7 space-y-10">

            {/* Headline */}
            <div>
              <RevealText
                as="h2"
                className="font-display text-display-md text-white text-balance leading-[1.05]"
              >
                Engineer. Designer. Entrepreneur.
              </RevealText>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-white/70 leading-relaxed max-w-xl"
              >
                I founded SCRIPTIVE with one conviction: the gap between a great idea and a great product
                is almost always a craft problem, not a capital problem. I've spent five years closing
                that gap — writing production code, directing design systems, and shipping products that
                consistently outperform what the brief imagined.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 text-white/70 leading-relaxed max-w-xl"
              >
                From early-stage startups in Silicon Valley to enterprise brands across the UAE, I've
                operated at every layer of the digital stack — product strategy, engineering architecture,
                growth, and brand. That full-spectrum exposure is what lets SCRIPTIVE move fast without
                breaking things.
              </motion.p>
            </div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {EXPOSURE.map((e, i) => (
                <motion.div
                  key={e.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="rounded-xl border border-white/8 bg-white/[0.025] px-4 py-4 text-center"
                >
                  <div className="font-display text-3xl text-neon-cyan">{e.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">{e.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                Domains &amp; expertise
              </div>
              <div className="flex flex-wrap gap-2">
                {EXPERTISE.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-neon-cyan/80"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="https://www.linkedin.com/in/ahab-khan"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2.5 rounded-full bg-neon-cyan px-6 py-3 font-mono text-sm uppercase tracking-[0.12em] text-obsidian-1000 transition-all duration-300 hover:bg-white hover:scale-105"
              >
                Connect on LinkedIn ↗
              </a>
              <a
                href="/#contact"
                data-cursor="hover"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
              >
                Start a project
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current">
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-2.5 w-2.5">
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"/>
                  </svg>
                </span>
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
