import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE, SOCIAL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-obsidian-1000 pt-12 md:pt-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Top meta row */}
        <div className="flex flex-col gap-10 border-b border-white/5 pb-16 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/scriptive logo.png"
                alt={SITE.name}
                width={36}
                height={36}
                className="h-9 w-auto"
              />
              <span className="font-display text-2xl text-white">
                {SITE.name}
                <span className="text-neon-cyan">.</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              {SITE.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                Menu
              </div>
              <ul className="mt-4 space-y-2">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      data-cursor="hover"
                      className="focus-ring text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                Social
              </div>
              <ul className="mt-4 space-y-2">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="focus-ring text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                Contact
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    data-cursor="hover"
                    className="focus-ring text-white/80 hover:text-white"
                  >
                    {SITE.email}
                  </a>
                </li>
                <li className="text-white/60">{SITE.phone}</li>
                <li className="text-white/60">{SITE.address}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative overflow-hidden py-12 md:py-20">
          <h2
            aria-hidden
            className="font-display tracking-[-0.05em] text-neon text-center leading-[0.85]"
            style={{ fontSize: "clamp(4rem, 20vw, 18rem)" }}
          >
            SCRIPTIVE
          </h2>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/5 py-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="font-mono uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {SITE.name} — all rights reserved
          </div>
          <div className="font-mono uppercase tracking-[0.2em]">
            Designed &amp; built in-house · Karachi · Remote · Worldwide
          </div>
        </div>
      </div>
    </footer>
  );
}
