"use client";

import { motion, useInView } from "framer-motion";
import type React from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type TagName = "h1" | "h2" | "h3" | "p" | "span";

type Props = {
  children: string;
  className?: string;
  /** Delay between each word reveal, in seconds. */
  stagger?: number;
  /** Animate once only when the element first enters the viewport. */
  once?: boolean;
  as?: TagName;
};

/**
 * Splits text into words and animates each one from below with a
 * slight blur-and-rise. Used for all big headlines across the site.
 * Keeps text selectable — renders real DOM spans, not images.
 *
 * The `ref as unknown as ...` cast is intentional: TypeScript cannot
 * narrow a ref's type from a polymorphic tag variable. Using
 * `useRef<HTMLElement>` is correct at runtime; the cast is cosmetic.
 */
export function RevealText({
  children,
  className,
  stagger = 0.04,
  once = true,
  as: Tag = "h2",
}: Props) {
  // HTMLElement covers every tag this component can render.
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(
    // useInView expects RefObject<Element>; HTMLElement extends Element ✓
    ref as unknown as React.RefObject<Element>,
    { once, margin: "-10% 0px -10% 0px" },
  );

  const words = children.split(" ");

  return (
    <Tag
      // Tag is a union type; TypeScript can't prove the ref matches it
      // without a conditional type. This cast is safe: every tag the
      // `as` prop accepts is an HTMLElement subtype.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn("inline-block", className)}
      aria-label={children}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="relative inline-block overflow-hidden pb-[0.15em] mr-[0.25em]"
          aria-hidden
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={
              inView
                ? { y: "0%", opacity: 1, filter: "blur(0px)" }
                : { y: "110%", opacity: 0, filter: "blur(8px)" }
            }
            transition={{
              duration: 0.8,
              delay: i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
