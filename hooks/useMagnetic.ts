"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic hover effect — translates the element toward the pointer
 * while hovering, then eases back on leave. Signature interaction
 * of award-winning sites (awwwards.com, lusion.co, etc).
 *
 * @param strength  Pixels of maximum displacement (default 24).
 */
export function useMagnetic<T extends HTMLElement>(strength = 24) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let targetX = 0;
    let targetY = 0;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      // Normalize by half the element's size and multiply by strength
      targetX = (relX / (rect.width / 2)) * strength;
      targetY = (relY / (rect.height / 2)) * strength;
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      tx += (targetX - tx) * 0.12;
      ty += (targetY - ty) * 0.12;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
