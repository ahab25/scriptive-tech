"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/data";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

/**
 * A two-column process layout. The left column is sticky — it stays
 * with the user as they scroll through each step on the right.
 * Each step has a vertical guide line that fills in view.
 */
export function Process() {
  return (
    <section
      id="process"
      className="relative border-t border-white/5 bg-obsidian-975 py-32 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Sticky header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="05">How we work</SectionLabel>
              <RevealText
                as="h2"
                className="mt-8 font-display text-display-sm text-white text-balance"
              >
                A process that respects your time.
              </RevealText>
              <p className="mt-6 max-w-sm text-white/70 leading-relaxed">
                Five phases. Clear artefacts at every step. No mystery, no
                ceremony — just the work.
              </p>
            </div>
          </div>

          {/* Steps */}
          <ol className="relative lg:col-span-8">
            {/* vertical guide */}
            <div className="absolute left-[22px] top-0 h-full w-px bg-white/10 md:left-[26px]" />

            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex gap-6 py-10 first:pt-0 last:pb-0 md:gap-10"
              >
                {/* Node */}
                <div className="relative z-10 grid h-[44px] w-[44px] shrink-0 place-items-center rounded-full border border-white/20 bg-obsidian-975 md:h-[52px] md:w-[52px]">
                  <span className="font-mono text-sm text-neon-cyan">
                    {step.index}
                  </span>
                </div>

                <div className="flex-1 pt-1">
                  <h3 className="font-display text-2xl text-white md:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-white/70 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
