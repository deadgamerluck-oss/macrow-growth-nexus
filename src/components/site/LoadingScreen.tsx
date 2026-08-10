import { useEffect, useState } from "react";

import { RavenMascot } from "./Raven";

const SEEN_KEY = "macrow-intro-seen";

/**
 * Intro loader: the raven draws itself, then the mascot settles and the
 * curtain lifts into the site. Shown once per browser session.
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<"hidden" | "in" | "out" | "done">("hidden");

  useEffect(() => {
    if (sessionStorage.getItem(SEEN_KEY)) {
      setPhase("done");
      return;
    }
    setPhase("in");
    document.body.style.overflow = "hidden";
    const outTimer = window.setTimeout(() => setPhase("out"), 2100);
    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      setPhase("done");
      document.body.style.overflow = "";
    }, 2750);
    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done" || phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background ${
        phase === "out" ? "loader-out" : ""
      }`}
      aria-hidden
    >
      <div className="grid-mesh pointer-events-none absolute inset-0 opacity-40" />
      <div
        className="pointer-events-none absolute h-72 w-72 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-accent)" }}
      />
      <RavenMascot className="relative h-44 w-44 text-foreground" animated={false} traced />
      <p className="relative mt-8 font-display text-sm font-bold tracking-[0.4em] text-foreground">
        MACROW
      </p>
      <p className="relative mt-3 text-xs tracking-[0.22em] text-muted-foreground uppercase">
        Observe · Decide · Grow
      </p>
    </div>
  );
}
