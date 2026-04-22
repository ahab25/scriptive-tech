import { cn } from "@/lib/utils";

type Props = {
  items: readonly string[];
  className?: string;
  /** "services" = large display text (default); "collaborators" = mono label style */
  variant?: "services" | "collaborators";
};

export function Marquee({ items, className, variant = "services" }: Props) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "flex overflow-hidden border-y border-white/5 select-none",
        variant === "collaborators" ? "py-3" : "py-4",
        className,
      )}
      aria-hidden
    >
      <ul className="flex shrink-0 animate-marquee items-center gap-0">
        {doubled.map((item, i) => (
          <li key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
            {variant === "collaborators" ? (
              <>
                <span className="mx-8 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30 transition-colors duration-300 hover:text-white/60">
                  {item}
                </span>
                <span className="text-neon-cyan/20" aria-hidden>
                  ◆
                </span>
              </>
            ) : (
              <>
                <span className="mx-6 font-display text-2xl tracking-[-0.01em] text-white/30 transition-colors duration-300 hover:text-white md:text-4xl">
                  {item}
                </span>
                <span className="text-neon-cyan/40" aria-hidden>
                  ✦
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
