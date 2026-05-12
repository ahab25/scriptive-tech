"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MagneticButton } from "./MagneticButton";

function LogoMark() {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/scriptive logo.png"
        alt={SITE.name}
        width={36}
        height={36}
        className="h-9 w-auto"
        priority
      />
      <span className="font-display text-[17px] tracking-[-0.02em] text-white">
        SCRIPTIVE
      </span>
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
          "fixed left-0 right-0 top-0 z-50 transition-[padding,background-color,backdrop-filter] duration-500 pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
          scrolled ? "py-3 backdrop-blur-xl bg-obsidian-1000/70 border-b border-white/5" : "py-6",
        )}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            data-cursor="hover"
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
            <Link href="/#contact" data-cursor="hover">
              <MagneticButton size="sm" variant="outline">
                Start a project →
              </MagneticButton>
            </Link>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: menuOpen ? 0.1 + NAV_LINKS.length * 0.06 : 0, duration: 0.5 }}
        >
          <Link href="/#contact" onClick={() => setMenuOpen(false)}>
            <MagneticButton size="md">Start a project →</MagneticButton>
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}
