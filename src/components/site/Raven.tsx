type RavenProps = {
  className?: string;
  /** Idle animation: subtle tilt, wing lift and blink. */
  animated?: boolean;
  /** Draw-on stroke reveal, used by the loading screen. */
  traced?: boolean;
};

/**
 * MACROW mascot — a perched raven rendered as a single sculptural silhouette.
 * Intelligence (the eye), observation (the forward tilt), adaptability (the wing).
 */
export function RavenMascot({ className = "h-40 w-40", animated = true, traced = false }: RavenProps) {
  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      role="img"
      aria-label="MACROW raven mascot"
      fill="none"
    >
      <defs>
        <linearGradient id="raven-body" x1="20%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor="#3a3d44" />
          <stop offset="55%" stopColor="#22242a" />
          <stop offset="100%" stopColor="#0f1013" />
        </linearGradient>
        <linearGradient id="raven-rim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.75" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <g className={animated ? "raven-tilt" : undefined}>
        {/* body + head */}
        <path
          d="M74 26c19 0 31 13 29 30-2 13-6 22 2 33 20 20 35 49 33 81l13 18-32-8-23-16c-22-14-40-32-46-54-6-22-2-46 8-62 4-12 6-22 16-22Z"
          fill={traced ? "none" : "url(#raven-body)"}
          stroke={traced ? "currentColor" : "url(#raven-rim)"}
          strokeWidth={traced ? 2 : 1.4}
          strokeLinejoin="round"
          className={traced ? "raven-trace" : undefined}
        />
        {/* beak */}
        <path
          d="M57 50 22 60l35 8Z"
          fill={traced ? "none" : "#2e3138"}
          stroke={traced ? "currentColor" : "url(#raven-rim)"}
          strokeWidth={traced ? 2 : 1.2}
          strokeLinejoin="round"
          className={traced ? "raven-trace" : undefined}
        />
        {/* crest feathers */}
        <path
          d="M78 24c6-9 16-12 24-9-6 3-9 7-10 12M66 26c-2-9 3-17 11-19-4 6-5 12-3 18"
          stroke={traced ? "currentColor" : "#4a4e57"}
          strokeWidth="2"
          strokeLinecap="round"
          className={traced ? "raven-trace" : undefined}
        />
        {/* wing */}
        <path
          d="M86 74c29 9 45 34 47 67-19-10-42-27-55-46-8-11-9-19 8-21Z"
          fill={traced ? "none" : "#0b0c0f"}
          fillOpacity={traced ? undefined : 0.9}
          stroke={traced ? "currentColor" : "url(#raven-rim)"}
          strokeWidth="1.4"
          strokeLinejoin="round"
          className={animated ? "raven-wing" : traced ? "raven-trace" : undefined}
        />
        {/* wing feather ribs */}
        <path
          d="M92 84c14 12 25 28 32 46M100 80c12 15 21 30 26 47"
          stroke={traced ? "currentColor" : "#464a53"}
          strokeWidth="1.1"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
        {/* tail */}
        <path
          d="M134 166l44 26-42-4Z"
          fill={traced ? "none" : "#1b1d22"}
          stroke={traced ? "currentColor" : "url(#raven-rim)"}
          strokeWidth={traced ? 2 : 1.2}
          strokeLinejoin="round"
          className={traced ? "raven-trace" : undefined}
        />
        {/* perch */}
        <path d="M84 178l-4 24M96 184l2 20" stroke={traced ? "currentColor" : "#5a4a3f"} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M42 204h132" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        {/* eye */}
        <circle
          cx="66"
          cy="47"
          r="4.6"
          fill="var(--accent)"
          className={animated ? "raven-eye raven-glow" : undefined}
        />
      </g>
    </svg>
  );
}

/** Compact monoline raven head, used in the wordmark and favicons. */
export function RavenGlyph({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="MACROW raven" fill="none">
      <path
        d="M18 4c5 0 7.5 3.5 6.5 8-.6 2.8 0 4.4 2 6.6 3.4 3.6 4.6 8 4 13l-5-2-4-3c-5-3.4-8.6-7-10-11.4C10 10.6 12 4 18 4Z"
        fill="currentColor"
        fillOpacity="0.92"
      />
      <path d="M14.5 11 5 13l9.5 2Z" fill="currentColor" />
      <path d="M20 15c5 2.4 7.6 6.6 8 13-4-2.6-8.4-6.6-10.6-10.4-1.2-2 0-3.4 2.6-2.6Z" fill="currentColor" fillOpacity="0.45" />
      <circle cx="16.5" cy="10.5" r="1.5" fill="var(--accent)" />
    </svg>
  );
}
