"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/**
 * Enables buttery smooth inertia-based scrolling across the site.
 * Lenis is the de-facto standard for Awwwards-tier scrollers.
 *
 * We wrap it in its own client component so the rest of the app
 * can stay Server-first. The provider mounts Lenis at the root,
 * drives it with rAF, and disables itself for users with
 * prefers-reduced-motion enabled.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect accessibility preferences — do not override native scroll.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      // Classic Lusion / GSAP easeOutExpo — decelerates dramatically
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    // Expose for other components (e.g. scroll-to-anchor)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return <>{children}</>;
}
