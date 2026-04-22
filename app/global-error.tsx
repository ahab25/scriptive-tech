"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook into your error tracker (Sentry, etc.) here
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-obsidian-1000 text-white">
        <main className="grid min-h-screen place-items-center p-8 text-center">
          <div className="max-w-md space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">
              Error — signal lost
            </p>
            <h1 className="font-display text-5xl tracking-[-0.02em]">
              Something broke in the pipeline.
            </h1>
            <p className="text-white/60">
              This is on us. Refresh and try again, or head home — we'll be looking into it.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={reset}
                className="rounded-full bg-neon-cyan px-6 py-3 text-sm font-medium text-obsidian-1000 transition-colors hover:bg-white"
              >
                Try again
              </button>
              <Link
                href="/"
                className="rounded-full border border-white/20 px-6 py-3 text-sm text-white transition-colors hover:border-neon-cyan hover:text-neon-cyan"
              >
                Go home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
