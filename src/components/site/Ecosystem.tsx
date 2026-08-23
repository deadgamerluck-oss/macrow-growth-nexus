import { useState } from "react";

import { growthLoop } from "@/content/site";

const layers = [
  {
    name: "Digital",
    detail: "Demand, channels and distribution — how the market finds you.",
  },
  {
    name: "Marcomm",
    detail: "Positioning, identity and creative — how the market understands you.",
  },
  {
    name: "Technology",
    detail: "Product, platforms and automation — how the business actually runs.",
  },
  { name: "Data", detail: "Instrumentation and reporting — how you know what is true." },
  { name: "Growth", detail: "Compounding outcomes — revenue, retention and scale." },
];

export function EcosystemFlow() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-5">
      {layers.map((layer, i) => (
        <button
          key={layer.name}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          aria-pressed={active === i}
          className={`relative rounded-xl border p-6 text-left transition-all ${
            active === i
              ? "border-accent bg-card shadow-[var(--shadow-elevate)]"
              : "border-border bg-card/50 hover:border-accent/40"
          }`}
        >
          <span className="font-display text-xs font-bold tracking-[0.2em] text-accent">
            0{i + 1}
          </span>
          <p className="mt-3 text-lg font-semibold">{layer.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{layer.detail}</p>
          {i < layers.length - 1 && (
            <span
              aria-hidden
              className="absolute -right-2 top-1/2 hidden h-px w-4 bg-border lg:block"
            />
          )}
        </button>
      ))}
    </div>
  );
}

export function GrowthLoopSystem() {
  const [active, setActive] = useState(0);
  const step = growthLoop[active]!;

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {growthLoop.map((s, i) => (
          <button
            key={s.step}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`rounded-lg border p-4 text-left transition-all ${
              active === i
                ? "border-accent bg-accent/10 text-ink-foreground"
                : "border-ink-foreground/15 text-ink-foreground/70 hover:border-accent/50"
            }`}
          >
            <span className="block font-display text-xs tracking-[0.2em] text-accent">
              {s.step}
            </span>
            <span className="mt-2 block text-sm font-semibold">{s.name}</span>
          </button>
        ))}
      </div>
      <div key={step.step} className="animate-rise rounded-2xl border border-ink-foreground/15 p-8">
        <p className="font-display text-5xl font-bold text-accent">{step.step}</p>
        <h3 className="mt-4 text-2xl font-semibold text-ink-foreground">{step.name}</h3>
        <p className="mt-3 text-ink-foreground/70">{step.detail}</p>
        <p className="mt-6 text-sm text-ink-foreground/50">
          The loop is continuous. Every cycle informs the next decision.
        </p>
      </div>
    </div>
  );
}
