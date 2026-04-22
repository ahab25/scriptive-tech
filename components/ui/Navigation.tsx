"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";

const LOGO_WORD = "Scriptive";

function LogoMark() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((c) => {
          if (c >= LOGO_WORD.length) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, 70);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  const done = count === LOGO_WORD.length;

  return (
    <span className="font-mono tracking-tight">
      <span className="text-neon-cyan/70">&lt;/</span>
      <span className="text-white">{LOGO_WORD.slice(0, count)}</span>
      {done && <span className="text-neon-cyan/70">&gt;</span>}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="ml-px inline-block text-neon-cyan"
      >
        _
      </motion.span>
    </span>
  );
}

export function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-[padding,background-color,backdrop-filter] duration-500",
          scrolled ? "py-3 backdrop-blur-xl bg-obsidian-1000/60 border-b border-white/5" : "py-6",
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            data-cursor="hover"
            className="text-xl"
            aria-label={`${SITE.name} home`}
          >
            <LogoMark />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  data-cursor="hover"
                  className="focus-ring rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <MagneticButton size="sm" variant="outline">
              Start a project →
            </MagneticButton>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="focus-ring relative z-[51] h-10 w-10 md:hidden"
          >
            <span
              className={cn(
                "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-white transition-transform duration-300",
                menuOpen ? "rotate-45" : "-translate-y-[5px]",
              )}
            />
            <span
              className={cn(
                "absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-white transition-transform duration-300",
                menuOpen ? "-rotate-45" : "translate-y-[5px]",
              )}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      <motion.div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-obsidian-1000/95 backdrop-blur-xl md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {NAV_LINKS.map((l, i) => (
          <motion.div
            key={l.href}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: menuOpen ? 0.1 + i * 0.06 : 0, duration: 0.5 }}
          >
            <Link
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-4xl text-white"
            >
              {l.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
