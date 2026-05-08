"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { PORTFOLIO } from "@/lib/data";
import type { ProjectPhase } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/ui/Navigation";

/* ── Animated project phase timeline ── */
function ProjectTimeline({ phases }: { phases: readonly ProjectPhase[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
        06 — Project Timeline
      </div>
      <div className="relative">
        {/* Vertical spine */}
        <div className="absolute left-[22px] top-0 h-full w-px bg-white/8 md:left-[26px]" />

        <div className="flex flex-col gap-0">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setActive(active === i ? null : i)}
                className="group relative flex w-full items-start gap-5 py-5 text-left md:gap-8"
              >
                {/* Node */}
                <div className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 md:h-[52px] md:w-[52px] ${active === i ? "border-neon-cyan bg-neon-cyan/15 text-neon-cyan" : "border-white/20 bg-obsidian-975 text-white/40 group-hover:border-neon-cyan/50 group-hover:text-neon-cyan/70"}`}>
                  <span className="font-mono text-xs">{phase.phase}</span>
                </div>

                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <h4 className={`font-display text-xl transition-colors duration-300 md:text-2xl ${active === i ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                      {phase.title}
                    </h4>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-xl text-sm text-white/50 leading-relaxed">
                    {phase.description}
                  </p>

                  <AnimatePresence initial={false}>
                    {active === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                          {phase.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2.5 rounded-lg border border-neon-cyan/10 bg-neon-cyan/5 px-3.5 py-2.5">
                              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" />
                              <span className="text-xs text-white/70 leading-relaxed">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Chevron */}
                <span className={`mt-2 shrink-0 transition-transform duration-300 text-white/30 ${active === i ? "rotate-180 text-neon-cyan" : ""}`}>
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              {i < phases.length - 1 && (
                <div className="ml-[22px] h-px bg-white/5 md:ml-[26px]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Case section ── */
function CaseSection({ label, body }: { label: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
        {label}
      </div>
      <p className="text-lg leading-relaxed text-white/80 max-w-2xl">{body}</p>
    </motion.div>
  );
}

/* ── Next project ── */
function NextProject({ current }: { current: string }) {
  const idx = PORTFOLIO.findIndex((p) => p.slug === current);
  const next = PORTFOLIO[(idx + 1) % PORTFOLIO.length]!;

  return (
    <section className="border-t border-white/5 bg-obsidian-975">
      <Link
        href={`/work/${next.slug}`}
        className="group mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-20 lg:px-10"
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Next project</div>
          <h2 className="mt-3 font-display text-4xl text-white transition-colors group-hover:text-neon-cyan md:text-6xl">
            {next.title}
          </h2>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">{next.category}</div>
        </div>
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-neon-cyan group-hover:bg-neon-cyan group-hover:text-obsidian-1000">
          →
        </span>
      </Link>
    </section>
  );
}

/* ── Page ── */
export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PORTFOLIO.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden pb-16 pt-36 lg:pb-24">
          <div className={`absolute inset-0 bg-gradient-to-br opacity-40 ${project.color}`} />
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-1000 via-obsidian-1000/60 to-transparent" />

          <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                Case Study · {project.year}
              </span>
              <span className="h-px w-6 bg-white/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                {project.location}
              </span>
            </div>

            <h1 className="font-display text-5xl text-white tracking-[-0.03em] md:text-7xl lg:text-8xl">
              {project.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.category.split(" · ").map((s) => (
                <span key={s} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                  {s}
                </span>
              ))}
            </div>

            {/* Live preview button */}
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-neon-cyan px-6 py-3 font-mono text-sm uppercase tracking-[0.15em] text-obsidian-1000 transition-all duration-300 hover:bg-white hover:scale-105"
            >
              <span className="h-2 w-2 rounded-full bg-obsidian-1000 animate-pulse" />
              Live Preview ↗
            </motion.a>
          </div>
        </section>

        {/* Metrics bar */}
        <div className="border-y border-white/5 bg-obsidian-975">
          <div className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x divide-white/5 px-6 lg:px-10">
            {project.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-10 text-center"
              >
                <div className="font-display text-4xl text-neon-cyan md:text-5xl">{m.value}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">{m.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Body */}
        <article className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-40">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Sticky sidebar */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Client</div>
                  <div className="mt-2 text-white">{project.title}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Location</div>
                  <div className="mt-2 text-white/80">{project.location}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Scope</div>
                  <div className="mt-2 space-y-1">
                    {project.category.split(" · ").map((s) => (
                      <div key={s} className="text-white/80">{s}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Year</div>
                  <div className="mt-2 text-white">{project.year}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Studio</div>
                  <div className="mt-2 text-white">SCRIPTIVE</div>
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-neon-cyan transition-all hover:bg-neon-cyan hover:text-obsidian-1000"
                >
                  View live ↗
                </a>
              </div>
            </aside>

            {/* Content */}
            <div className="space-y-20 lg:col-span-9">
              <CaseSection label="01 — Overview" body={project.overview} />
              <CaseSection label="02 — Challenge" body={project.challenge} />
              <CaseSection label="03 — Solution" body={project.solution} />
              <CaseSection label="04 — Outcome" body={project.outcome} />

              {/* Visuals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
                  05 — Visuals
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.map((src, i) => (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-5%" }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} — visual ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br opacity-15 ${project.color}`} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Timeline */}
              <ProjectTimeline phases={project.phases} />
            </div>
          </div>
        </article>

        <NextProject current={slug} />
      </main>
      <Footer />
    </>
  );
}
