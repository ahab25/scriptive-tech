import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-obsidian-1000 px-6 text-center">
      <div className="max-w-lg space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
          404 — not in this dimension
        </p>
        <h1 className="font-display text-display-md text-white tracking-[-0.03em]">
          This page drifted off the grid.
        </h1>
        <p className="text-white/60">
          The link you followed may be broken, or the page may have been moved. Let's
          get you somewhere real.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-neon-cyan px-6 py-3 text-sm font-medium text-obsidian-1000 transition-colors hover:bg-white"
        >
          Back to home →
        </Link>
      </div>
    </main>
  );
}
