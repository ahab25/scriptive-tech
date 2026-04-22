export default function Loading() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-obsidian-1000">
      <div className="flex flex-col items-center gap-6">
        <div className="font-display text-3xl tracking-[-0.02em] text-white">
          SCRIPTIVE<span className="text-neon-cyan">.</span>
        </div>
        <div className="relative h-px w-40 overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
        </div>
      </div>
    </div>
  );
}
