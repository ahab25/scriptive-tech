"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RevealText } from "../ui/RevealText";
import { SectionLabel } from "../ui/SectionLabel";

const TEAM = [
  {
    name: "Ahab Khan",
    role: "Founder & CEO",
    bio: "Leads product vision, client strategy, and studio culture. Architect of SCRIPTIVE's engineering-first ethos.",
    avatar: "/images/team/ahab.jpg",
    tags: ["Strategy", "Product", "Leadership"],
    accent: "cyan" as const,
  },
  {
    name: "Kulsoom Ansari",
    role: "CEO & Co-Founder",
    bio: "Drives operations, partnerships, and growth. Turns ambitious briefs into on-time, on-budget deliverables.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    tags: ["Operations", "Growth", "Partnerships"],
    accent: "violet" as const,
  },
  {
    name: "Taba Sualeh",
    role: "Founder & CEO",
    bio: "Shapes studio culture and client relationships. Champion of quality at every stage of the product lifecycle.",
    avatar: "/images/team/taba.jpeg",
    tags: ["Culture", "Clients", "Quality"],
    accent: "magenta" as const,
  },
  {
    name: "Tanzeela Jabbar",
    role: "CEO & Co-Founder",
    bio: "Oversees business development and brand strategy. Ensures every client engagement raises the bar for the next.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    tags: ["Biz Dev", "Brand", "Strategy"],
    accent: "lime" as const,
  },
  {
    name: "Faizan Ali",
    role: "Head of Design",
    bio: "Systems thinker and visual craftsperson. Translates complex problems into interfaces that feel effortless.",
    avatar: "/images/team/faizan.jpeg",
    tags: ["UI/UX", "Brand", "Design Systems"],
    accent: "cyan" as const,
  },
  {
    name: "Khizar Siddique",
    role: "Lead Engineer",
    bio: "Full-stack architect obsessed with performance. Ships production-ready code that scales from day one.",
    avatar: "/images/team/khizar.jpeg",
    tags: ["Next.js", "Node.js", "Infra"],
    accent: "violet" as const,
  },
  {
    name: "Abdul Saboor",
    role: "SEO Strategist",
    bio: "Builds organic growth engines — technical audits, content architecture, and link strategies that compound.",
    avatar: "/images/team/saboor.jpeg",
    tags: ["SEO", "Analytics", "Content"],
    accent: "magenta" as const,
  },
  {
    name: "Muhammad Safi",
    role: "AI & ML Engineer",
    bio: "Builds RAG pipelines and production AI systems that stay reliable well beyond the demo environment.",
    avatar: "/images/team/safi.jpeg",
    tags: ["LLMs", "RAG", "Python"],
    accent: "lime" as const,
  },
  {
    name: "Rubaisa Jawed",
    role: "3D & Motion Lead",
    bio: "Blender artist and WebGL engineer. Ships real-time 3D experiences that consistently land on Awwwards.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    tags: ["Three.js", "Blender", "GSAP"],
    accent: "cyan" as const,
  },
] as const;

type Accent = typeof TEAM[number]["accent"];

const ACCENT_RING: Record<Accent, string> = {
  cyan: "ring-neon-cyan/40",
  violet: "ring-neon-violet/40",
  magenta: "ring-neon-magenta/40",
  lime: "ring-neon-lime/40",
};

const ACCENT_DOT: Record<Accent, string> = {
  cyan: "bg-neon-cyan",
  violet: "bg-neon-violet",
  magenta: "bg-neon-magenta",
  lime: "bg-neon-lime",
};

const ACCENT_TAG: Record<Accent, string> = {
  cyan: "border-neon-cyan/20 text-neon-cyan/80",
  violet: "border-neon-violet/20 text-neon-violet/80",
  magenta: "border-neon-magenta/20 text-neon-magenta/80",
  lime: "border-neon-lime/20 text-neon-lime/80",
};

export function Team() {
  return (
    <section id="team" className="relative border-t border-white/5 py-32 lg:py-48">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[60vh] w-[50vw] rounded-full bg-gradient-to-bl from-neon-cyan/6 to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03">The team</SectionLabel>
            <RevealText
              as="h2"
              className="mt-8 font-display text-display-md text-white text-balance"
            >
              The minds behind the work.
            </RevealText>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.9 }}
              className="text-white/70 leading-relaxed"
            >
              A tight-knit collective of senior engineers, designers, and strategists — no juniors
              farming tickets, no offshore hand-offs. Every person on this page has worked on your
              type of problem before.
            </motion.p>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.8,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.04]"
            >
              {/* Avatar */}
              <div className="relative w-fit">
                <div
                  className={`h-16 w-16 overflow-hidden rounded-full ring-2 transition-all duration-500 group-hover:ring-4 ${ACCENT_RING[member.accent]}`}
                >
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span
                  className={`absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-obsidian-950 ${ACCENT_DOT[member.accent]}`}
                />
              </div>

              {/* Info */}
              <div className="mt-4">
                <div className="font-display text-lg text-white">{member.name}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  {member.role}
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-white/60">{member.bio}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {member.tags.map((t) => (
                  <span
                    key={t}
                    className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${ACCENT_TAG[member.accent]}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
