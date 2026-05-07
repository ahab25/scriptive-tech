"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SERVICES, type Service } from "@/lib/data";
import { ServiceModal } from "../ui/ServiceModal";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <>
      <section
        id="services"
        className="relative border-t border-white/5 bg-obsidian-975 py-32 lg:py-48"
      >
        {/* Section ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-violet/10 to-transparent blur-3xl"
        />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel index="03">What we do</SectionLabel>
              <RevealText
                as="h2"
                className="mt-8 font-display text-display-md text-white text-balance"
              >
                Twelve disciplines. One opinionated studio.
              </RevealText>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 lg:pt-4">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.9 }}
                className="text-white/70 leading-relaxed"
              >
                We don't separate strategy from design, or design from engineering. Each discipline
                below is practised in-house — handoffs vanish and quality compounds. Click Explore
                on any card to see exactly what we deliver.
              </motion.p>
            </div>
          </div>

          {/* Grid */}
          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  duration: 0.9,
                  delay: (i % 3) * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ServiceCard
                  service={service}
                  onExplore={() => setActive(service)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </>
  );
}
