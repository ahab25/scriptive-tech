"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "What does a project with Scriptive typically cost?",
    a: "Every project is scoped individually — a landing page, a mobile app, and an AI-powered platform are very different beasts. We don't believe in one-size-fits-all pricing. After a short discovery call, we'll send a transparent, itemised proposal with no hidden fees. Most web projects start from $3,000; full product builds from $10,000.",
  },
  {
    q: "How long does it take to go from idea to launch?",
    a: "A polished marketing site typically takes 3–5 weeks. A mobile app or custom software product runs 8–16 weeks depending on scope and integrations. We work in focused sprints with clear milestones, so you always know exactly where your project stands — no black-box development.",
  },
  {
    q: "Do you only build websites, or can you handle full product development?",
    a: "We handle the full stack — strategy, design, front-end, back-end, AI integrations, mobile apps, and 3D experiences. Think of us as a dedicated product team you can switch on. Many clients start with a website and grow into a long-term development partnership.",
  },
  {
    q: "We're based overseas — can we still work together?",
    a: "Absolutely. We operate across UAE, Pakistan, and the USA, and the majority of our clients are remote. We run async-first workflows with weekly video syncs, shared project boards, and clear documentation at every stage. Time zones have never stopped a great collaboration.",
  },
  {
    q: "What happens after my project goes live?",
    a: "Launch is a beginning, not an ending. We offer post-launch retainers covering maintenance, performance monitoring, iterative improvements, and ongoing feature development. We're invested in your long-term growth — not just delivering a file and disappearing.",
  },
] as const;

function FAQCard({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border transition-colors duration-300 ${
        open
          ? "border-neon-cyan/30 bg-white/[0.05]"
          : "border-white/8 bg-white/[0.03] hover:border-white/15"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 px-6 py-5 text-left md:gap-6 md:px-8 md:py-6"
      >
        {/* Number badge */}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold transition-colors duration-300 md:h-10 md:w-10 ${
            open ? "bg-neon-cyan text-obsidian-1000" : "bg-white/10 text-white/60"
          }`}
        >
          {num}
        </span>

        {/* Question */}
        <span
          className={`flex-1 font-display text-base leading-snug transition-colors duration-300 md:text-lg ${
            open ? "text-white" : "text-white/80"
          }`}
        >
          {q}
        </span>

        {/* Chevron badge */}
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 md:h-10 md:w-10 ${
            open ? "bg-neon-cyan text-obsidian-1000" : "bg-white/10 text-white/50"
          }`}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/8 px-6 py-5 md:px-8 md:py-6">
              <p className="text-white/60 leading-relaxed md:pl-16">
                {a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative border-t border-white/5 bg-obsidian-975 py-32 lg:py-48 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 h-[50vh] w-[60vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-cyan/6 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[860px] px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-neon-cyan">
            Got questions?
          </span>
          <h2 className="mt-6 font-display text-3xl text-white tracking-[-0.03em] sm:text-4xl md:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-white/50 leading-relaxed">
            Everything you need to know before kicking off your project.<br className="hidden sm:block" />
            No surprises, no hidden fees.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-3">
          {FAQS.map((item, i) => (
            <FAQCard key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center text-sm text-white/40"
        >
          Still have questions?{" "}
          <a
            href="mailto:hello@scriptive.tech"
            className="text-neon-cyan transition-opacity hover:opacity-75"
          >
            hello@scriptive.tech
          </a>
        </motion.p>
      </div>
    </section>
  );
}
