import logoUrl from "@/assets/logo.png";

export function RavenMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="MACROW mark" fill="none">
      <path
        d="M4 24 L15 5 L20 14 L28 8 L24 24 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="15" cy="5" r="1.8" fill="currentColor" />
      <circle cx="28" cy="8" r="1.4" fill="currentColor" />
      <circle cx="4" cy="24" r="1.4" fill="currentColor" />
      <circle cx="24" cy="24" r="1.4" fill="currentColor" />
      <path d="M15 5 L24 24" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  if (inverted) {
    return (
      <span className="flex items-center gap-2.5">
        <RavenMark className="h-6 w-6 text-accent" />
        <span className="font-display text-xl font-bold tracking-widest text-ink-foreground">
          MACROW
        </span>
      </span>
    );
  }
  return (
    <span className="flex items-center">
      <img src={logoUrl} alt="MACROW" className="h-12 w-auto object-contain " />
    </span>
  );
}
