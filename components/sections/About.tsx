"use client";

import { motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 40, stiffness: 80 });
  const rounded = useTransform(spring, (v) => Math.round(v));

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${v}${suffix}`;
    });
    return unsub;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const GRID_POSITIONS = [
  "aspect-[4/3] sm:aspect-auto sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-3",
  "aspect-[4/3] sm:aspect-auto sm:col-start-2 sm:col-end-4 sm:row-start-1 sm:row-end-2",
  "aspect-[4/3] sm:aspect-auto sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3",
  "aspect-[4/3] sm:aspect-auto sm:col-start-3 sm:col-end-4 sm:row-start-2 sm:row-end-3",
  "aspect-[4/3] sm:aspect-auto sm:col-start-1 sm:col-end-2 sm:row-start-3 sm:row-end-4",
  "aspect-[4/3] sm:aspect-auto sm:col-start-2 sm:col-end-4 sm:row-start-3 sm:row-end-4",
] as const;

const OFFICE_IMAGES = [
  "/images/office/office10.jpeg",
  "/images/office/office11.jpg",
  "/images/office/office12.jpg",
  "/images/office/office13.jpg",
  "/images/office/office14.jpg",
  "/images/office/office15.jpg",
];

const AWARDS = [
  { name: "Awwwards", detail: "Site of the Day · 2024" },
  { name: "CSS Design Awards", detail: "Special Kudos · 2024" },
  { name: "Webby Awards", detail: "Nominee · Best Agency · 2025" },
  { name: "FWA", detail: "Favourite Website Award · 2023" },
];

export function About() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const galleryY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="about" className="relative py-32 lg:py-48">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <SectionLabel index="02">About the studio</SectionLabel>

        <div className="mt-12 grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <RevealText as="h2" className="font-display text-display-md text-white text-balance">
              An award-winning studio engineering software that performs as well as it looks.
            </RevealText>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-white/70 leading-relaxed"
            >
              An award winning studio engineering softwares that performs as well as it looks with
              a team of principle level creative minds eager to innovate world from their skills and
              expertise by turning digital ideas into the amazing experiences.
            </motion.p>
          </div>

          <div className="space-y-6 lg:col-span-5 lg:pt-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 leading-relaxed"
            >
              Founded in 2020, SCRIPTIVE has shipped over 140 products for founders, Fortune 500
              brands, and venture-backed startups across 15 countries. Our work has been recognised
              by Awwwards, the CSS Design Awards, and the Webby Awards — validating what we've
              always believed: that craft is a compounding business advantage.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/70 leading-relaxed"
            >
              We operate at the intersection of engineering rigour and design excellence — where
              milliseconds matter, motion has intention, and every detail compounds into a
              measurable competitive edge. Small team, strong opinions, zero bureaucracy.
            </motion.p>
          </div>
        </div>

        {/* Studio gallery */}
        <motion.div
          ref={galleryRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16"
          style={{ y: galleryY }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
              SCRIPTIVE HQ · California, USA
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:h-[520px] sm:grid-cols-3 sm:grid-rows-3 sm:gap-3">
            {OFFICE_IMAGES.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-xl border border-white/10 ${GRID_POSITIONS[i]}`}
              >
                <Image
                  src={src}
                  alt={`SCRIPTIVE studio space ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-1000/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {AWARDS.map((a) => (
            <div
              key={a.name}
              className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white">
                {a.name}
              </span>
              <span className="font-mono text-[10px] text-white/40">{a.detail}</span>
            </div>
          ))}
        </motion.div>

        {/* Stat row */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:grid-cols-4">
          {[
            { n: 140, s: "+", label: "Projects shipped" },
            { n: 5, s: "+", label: "Years of excellence" },
            { n: 15, s: "", label: "Countries served" },
            { n: 12, s: "", label: "Industry awards" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="font-display text-5xl tracking-[-0.02em] text-white md:text-6xl">
                <Counter value={stat.n} suffix={stat.s} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
