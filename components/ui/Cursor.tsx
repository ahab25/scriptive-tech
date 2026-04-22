"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * A two-layer custom cursor:
 *   - A precise 6px dot that tracks the pointer exactly.
 *   - A larger lagging ring that springs behind it.
 * On hover of elements marked [data-cursor="hover"], the ring
 * expands and fills with a translucent cyan — the signature
 * micro-interaction of award-winning sites.
 */
export function Cursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ring lags behind the dot for the "orbital" feel
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 220, mass: 0.4 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 220, mass: 0.4 });

  const [variant, setVariant] = useState<"default" | "hover" | "text">("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on coarse pointers (touch)
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const cursorAttr = target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor;
      if (cursorAttr === "hover") setVariant("hover");
      else if (cursorAttr === "text") setVariant("text");
      else setVariant("default");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [mouseX, mouseY, visible]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-neon-cyan mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Lagging ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] rounded-full border border-neon-cyan/60 backdrop-invert"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: variant === "hover" ? 64 : variant === "text" ? 4 : 32,
          height: variant === "hover" ? 64 : variant === "text" ? 28 : 32,
          backgroundColor:
            variant === "hover" ? "rgba(0,229,255,0.08)" : "rgba(0,229,255,0)",
          borderRadius: variant === "text" ? "2px" : "9999px",
        }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
      />
    </>
  );
}
