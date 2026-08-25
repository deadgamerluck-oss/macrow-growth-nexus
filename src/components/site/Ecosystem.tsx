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
    <div className="mt-8 lg:mt-12 grid gap-4 lg:grid-cols-5">
      {layers.map((layer, i) => (
        <button
          key={layer.name}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          aria-pressed={active === i}
          className={`relative border p-5 sm:p-6 text-left transition-all ${
            active === i
              ? "border-white/60 bg-white/5"
              : "border-white/30 bg-transparent hover:border-white/50 hover:bg-white/5"
          }`}
        >
          <span className="block text-[13px] font-bold text-white">
            0{i + 1}<br />
            <span className="text-base mt-1 block">{layer.name}</span>
          </span>
          <p className="mt-4 text-[13px] leading-relaxed text-white/80">{layer.detail}</p>
        </button>
      ))}
    </div>
  );
}

export function GrowthLoopSystem() {
  const [active, setActive] = useState(0);
  const step = growthLoop[active]!;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-24 items-stretch">
      <div className="flex flex-col justify-center">
        <div className="mb-12 max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase">
            The MACROW Growth Loop
          </p>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem] font-serif text-slate-900 font-medium">
            Observe, decide, build,<br />amplify, measure, adapt.
          </h2>
          <p className="mt-5 text-[13px] leading-relaxed text-slate-500 max-w-lg">
            Not a funnel with an end. A loop that gets sharper every cycle because evidence accumulates.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {growthLoop.map((s, i) => (
            <button
              key={s.step}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`border p-4 text-left transition-all rounded-none min-h-[90px] flex flex-col justify-center ${
                active === i
                  ? "border-accent bg-accent text-white shadow-md"
                  : "border-accent bg-transparent text-slate-900 hover:bg-white/40 hover:shadow-sm"
              }`}
            >
              <span className={`block text-[13px] font-bold ${active === i ? "text-white" : "text-slate-900"}`}>
                {s.step}
              </span>
              <span className={`mt-1 block text-[11px] ${active === i ? "text-white/90" : "text-slate-500"}`}>
                {s.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <div key={step.step} className="animate-rise border-[1.5px] border-accent bg-transparent p-10 lg:p-14 flex flex-col justify-center rounded-none shadow-sm min-h-[400px]">
        <p className="font-serif text-[7rem] leading-[0.9] font-medium text-accent">
          {step.step}
        </p>
        <h3 className="mt-6 text-[22px] font-bold text-slate-900">{step.name}</h3>
        <p className="mt-3 text-[14px] leading-relaxed text-slate-500 max-w-sm">
          {step.detail}
        </p>
      </div>
    </div>
  );
}
