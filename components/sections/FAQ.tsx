"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

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

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-white/8"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="group flex w-full items-start justify-between gap-6 py-7 text-left"
      >
        <span
          className={`font-display text-lg leading-snug transition-colors duration-300 md:text-xl ${
            open ? "text-white" : "text-white/70 group-hover:text-white"
          }`}
        >
          {q}
        </span>

        {/* +/× icon */}
        <span
          className={`relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan rotate-45"
              : "border-white/20 text-white/40 group-hover:border-white/40 group-hover:text-white"
          }`}
        >
          <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3">
            <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-7 pr-12 text-white/60 leading-relaxed md:pr-20">
              {a}
            </p>
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
        className="pointer-events-none absolute right-0 top-1/2 h-[50vh] w-[40vw] -translate-y-1/2 rounded-full bg-gradient-to-l from-neon-cyan/6 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">

          {/* Left — sticky heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="07">FAQ</SectionLabel>
              <RevealText
                as="h2"
                className="mt-8 font-display text-display-sm text-white text-balance"
              >
                Questions we hear every day.
              </RevealText>
              <p className="mt-6 max-w-sm text-white/60 leading-relaxed">
                Still not answered? Drop us a line at{" "}
                <a
                  href="mailto:hello@scriptive.tech"
                  className="text-neon-cyan transition-opacity hover:opacity-75"
                >
                  hello@scriptive.tech
                </a>
              </p>
            </div>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            {FAQS.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
