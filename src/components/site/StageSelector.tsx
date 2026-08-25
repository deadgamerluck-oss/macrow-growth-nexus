import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { stages } from "@/content/site";

export function StageSelector() {
  const [active, setActive] = useState(stages[0]!.id);
  const stage = stages.find((s) => s.id === active)!;

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[20rem_1fr] lg:gap-16">
      <div role="tablist" aria-label="Business stage" className="flex flex-col gap-2">
        {stages.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(s.id)}
              className={`border p-4 text-left text-[13px] font-medium transition-all rounded-none ${
                isActive
                  ? "border-white bg-white text-slate-900"
                  : "border-accent/60 bg-transparent text-white/90 hover:border-accent hover:bg-white/5"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" key={stage.id} className="bg-white p-8 sm:p-10 lg:p-14 animate-rise rounded-none shadow-xl">
        <h3 className="text-3xl font-serif text-slate-900">{stage.headline}</h3>
        <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-slate-500">{stage.context}</p>
        <p className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase mt-10">Recommended capabilities</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {stage.recommended.map((r, idx) => (
            <li
              key={r}
              className="flex flex-col border border-accent/70 bg-white p-4 rounded-none"
            >
              <span className="text-[13px] font-bold text-slate-900">0{idx + 1}</span>
              <span className="mt-2 text-[12px] text-slate-500">{r}</span>
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8 rounded-none bg-accent hover:bg-accent/90 text-white px-6">
          <Link to="/contact">
            Discuss this stage <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
