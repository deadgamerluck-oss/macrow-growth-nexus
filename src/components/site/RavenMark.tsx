import { RavenGlyph } from "./Raven";

export function RavenMark({ className = "h-7 w-7" }: { className?: string }) {
  return <RavenGlyph className={className} />;
}

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="group flex items-center gap-2.5">
      <RavenGlyph className="h-7 w-7 text-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]" />
      <span
        className={`font-display text-lg font-bold tracking-[0.14em] ${
          inverted ? "text-ink-foreground" : "text-foreground"
        }`}
      >
        MACROW
      </span>
    </span>
  );
}
