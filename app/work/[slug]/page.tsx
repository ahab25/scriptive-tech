import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PORTFOLIO } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { Footer } from "@/components/sections/Footer";
import { Navigation } from "@/components/ui/Navigation";
import { RevealText } from "@/components/ui/RevealText";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * /work/[slug] — individual case study page.
 *
 * The data model lives in lib/data.ts. Each portfolio entry has a
 * slug; this route reads that slug, finds the entry, and renders a
 * structured case study. Replace the placeholder content blocks with
 * real MDX files or a CMS fetch once you have real copy.
 *
 * Static params are generated at build time so Vercel deploys every
 * case study as a static edge page.
 */

// ---------------------------------------------------------------------------
// Static generation
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

// ---------------------------------------------------------------------------
// Per-page metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = `How SCRIPTIVE delivered ${project.category} for ${project.title} in ${project.year}.`;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE.url}/work/${slug}`,
    },
    alternates: { canonical: `${SITE.url}/work/${slug}` },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PORTFOLIO.find((p) => p.slug === slug);
  if (!project) notFound();

  // In a real build, fetch rich case-study content from your CMS here.
  // e.g.: const content = await sanityClient.fetch(query, { slug })
  const content = {
    overview: `${project.title} came to us needing a complete rethink of their digital presence. The brief: make the brand unmistakable, the interface delightful, and the performance bulletproof.`,
    challenge: `The existing site was slow, visually inconsistent, and not converting. The brand had evolved but the website hadn't kept up. Every stakeholder had a different opinion on what "better" looked like.`,
    solution: `We ran a three-week discovery sprint that aligned the team on a single north-star metric: demo requests. From there, every design decision was tested against that goal. We shipped a completely rebuilt interface in eight weeks.`,
    outcome: `Demo requests up 38% in the first month. Lighthouse performance score 97. The team now ships design updates in hours, not weeks, thanks to the component system we left them.`,
    scope: project.category.split(" · "),
    year: project.year,
    metrics: [
      { value: "38%", label: "More demo requests" },
      { value: "97", label: "Lighthouse score" },
      { value: "8wk", label: "Delivery" },
    ],
  };

  return (
    <>
      <Navigation />
      <main className="grain">
        {/* ---------------------------------------------------------------- */}
        {/* Hero */}
        {/* ---------------------------------------------------------------- */}
        <section className="relative flex min-h-[70svh] flex-col justify-end overflow-hidden pb-16 pt-36 lg:pb-24">
          {/* Background gradient */}
          <div
            className={`absolute inset-0 bg-gradient-to-br opacity-40 ${project.color}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-1000 via-obsidian-1000/60 to-transparent" />

          <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-10">
            <SectionLabel index={project.year}>Case Study</SectionLabel>

            <RevealText
              as="h1"
              className="mt-6 font-display text-display-md text-white"
            >
              {project.title}
            </RevealText>

            <div className="mt-8 flex flex-wrap gap-2">
              {content.scope.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Metrics bar */}
        {/* ---------------------------------------------------------------- */}
        <div className="border-y border-white/5 bg-obsidian-975">
          <div className="mx-auto grid max-w-[1400px] grid-cols-3 divide-x divide-white/5 px-6 lg:px-10">
            {content.metrics.map((m) => (
              <div key={m.label} className="py-10 text-center">
                <div className="font-display text-4xl text-white md:text-5xl">
                  {m.value}
                </div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Case study body */}
        {/* ---------------------------------------------------------------- */}
        <article className="mx-auto max-w-[1400px] px-6 py-32 lg:px-10 lg:py-48">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Client
                  </div>
                  <div className="mt-2 text-white">{project.title}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Scope
                  </div>
                  <div className="mt-2 space-y-1">
                    {content.scope.map((s) => (
                      <div key={s} className="text-white/80">{s}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Year
                  </div>
                  <div className="mt-2 text-white">{content.year}</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Studio
                  </div>
                  <div className="mt-2 text-white">SCRIPTIVE</div>
                </div>
              </div>
            </aside>

            {/* Body copy */}
            <div className="space-y-20 lg:col-span-8">
              <CaseSection label="01 — Overview" body={content.overview} />
              <CaseSection label="02 — Challenge" body={content.challenge} />
              <CaseSection label="03 — Solution" body={content.solution} />
              <CaseSection label="04 — Outcome" body={content.outcome} />

              {/* Visuals */}
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
                  05 — Visuals
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.images.map((src, i) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
                    >
                      <Image
                        src={src}
                        alt={`${project.title} — visual ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${project.color}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ---------------------------------------------------------------- */}
        {/* Next project navigation */}
        {/* ---------------------------------------------------------------- */}
        <NextProject current={slug} />
      </main>
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function CaseSection({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
        {label}
      </div>
      <p className="text-lg leading-relaxed text-white/80 max-w-2xl">{body}</p>
    </div>
  );
}

function NextProject({ current }: { current: string }) {
  const idx = PORTFOLIO.findIndex((p) => p.slug === current);
  const next = PORTFOLIO[(idx + 1) % PORTFOLIO.length]!;

  return (
    <section className="border-t border-white/5 bg-obsidian-975">
      <Link
        href={`/work/${next.slug}`}
        className="group mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-6 py-20 lg:px-10"
        data-cursor="hover"
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
            Next project
          </div>
          <h2 className="mt-3 font-display text-4xl text-white transition-colors group-hover:text-neon-cyan md:text-6xl">
            {next.title}
          </h2>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            {next.category}
          </div>
        </div>
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 text-white transition-all duration-300 group-hover:border-neon-cyan group-hover:bg-neon-cyan group-hover:text-obsidian-1000">
          →
        </span>
      </Link>
    </section>
  );
}
