import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { stages } from "@/content/site";

export function StageSelector() {
  const [active, setActive] = useState(stages[0]!.id);
  const stage = stages.find((s) => s.id === active)!;

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-[22rem_1fr]">
      <div role="tablist" aria-label="Business stage" className="flex flex-col gap-2">
        {stages.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(s.id)}
              className={`rounded-lg border px-5 py-4 text-left text-sm font-medium transition-all ${
                isActive
                  ? "border-accent bg-card text-foreground shadow-[var(--shadow-soft)]"
                  : "border-border bg-transparent text-muted-foreground hover:border-accent/40 hover:text-foreground"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" key={stage.id} className="card-elevate animate-rise p-7 lg:p-10">
        <h3 className="text-2xl font-semibold sm:text-3xl">{stage.headline}</h3>
        <p className="mt-4 max-w-2xl text-muted-foreground">{stage.context}</p>
        <p className="eyebrow mt-8">Recommended capabilities</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {stage.recommended.map((r) => (
            <li
              key={r}
              className="flex items-center gap-3 rounded-md bg-secondary/70 px-4 py-3 text-sm font-medium"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              {r}
            </li>
          ))}
        </ul>
        <Button asChild className="mt-8 rounded-full px-6">
          <Link to="/contact">
            Discuss this stage <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
