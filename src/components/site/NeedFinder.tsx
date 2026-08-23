import { Link } from "@tanstack/react-router";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type Question = {
  id: string;
  question: string;
  options: { label: string; tags: string[] }[];
};

const questions: Question[] = [
  {
    id: "stage",
    question: "What stage is your business at?",
    options: [
      { label: "Idea, nothing built yet", tags: ["Brand Foundation", "Website Development"] },
      { label: "Early startup", tags: ["Product Design", "MVP Development"] },
      { label: "Established and growing", tags: ["Performance Marketing", "SEO"] },
      { label: "Enterprise or multi-market", tags: ["Digital Transformation", "Data & Analytics"] },
    ],
  },
  {
    id: "goal",
    question: "What are you trying to achieve first?",
    options: [
      { label: "Be understood clearly", tags: ["Brand Strategy", "Content Strategy"] },
      { label: "Generate enquiries", tags: ["Performance Marketing", "Lead Generation"] },
      { label: "Launch a product", tags: ["Product Design", "Web Applications"] },
      { label: "Reduce manual work", tags: ["Business Automation", "CRM Development"] },
    ],
  },
  {
    id: "challenge",
    question: "What is your biggest challenge right now?",
    options: [
      { label: "Nobody knows we exist", tags: ["SEO", "Social Media Marketing"] },
      { label: "Traffic doesn't convert", tags: ["Conversion Rate Optimization", "UI/UX Design"] },
      {
        label: "Our systems don't talk to each other",
        tags: ["API Development", "CRM Development"],
      },
      {
        label: "We can't see what's working",
        tags: ["Analytics & Reporting", "Attribution Setup"],
      },
    ],
  },
  {
    id: "mix",
    question: "Which areas do you think you need?",
    options: [
      { label: "Marketing", tags: ["Digital Strategy", "Performance Marketing"] },
      { label: "Branding and communication", tags: ["Brand Identity", "Creative Design"] },
      { label: "Technology", tags: ["Website Development", "Custom Software"] },
      {
        label: "Honestly, a combination",
        tags: ["Digital Strategy", "Brand Strategy", "Technology Consulting"],
      },
    ],
  },
  {
    id: "scale",
    question: "What is your approximate scale?",
    options: [
      { label: "Just me", tags: ["Website Development", "Local SEO"] },
      { label: "A small team", tags: ["Marketing Automation", "Growth Marketing"] },
      { label: "Mid-market", tags: ["CRM Development", "Campaign Development"] },
      { label: "Enterprise", tags: ["Enterprise Technology", "AI Solutions"] },
    ],
  },
];

export function NeedFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const done = step >= questions.length;

  const select = (q: Question, tags: string[]) => {
    setAnswers((prev) => ({ ...prev, [q.id]: tags }));
    setStep((s) => s + 1);
  };

  const recommendation = Array.from(new Set(Object.values(answers).flat()));

  return (
    <div className="card-elevate mt-12 overflow-hidden p-0">
      <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4 lg:px-9">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {done ? "Your recommendation" : `Question ${step + 1} of ${questions.length}`}
        </p>
        <div className="flex w-32 gap-1" aria-hidden>
          {questions.map((q, i) => (
            <span
              key={q.id}
              className={`h-1 flex-1 rounded-full ${i < step ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 lg:p-10">
        {!done && (
          <div key={questions[step]!.id} className="animate-rise">
            <h3 className="text-2xl font-semibold sm:text-3xl">{questions[step]!.question}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {questions[step]!.options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => select(questions[step]!, o.tags)}
                  className="rounded-lg border border-border px-5 py-4 text-left text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-soft)]"
                >
                  {o.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground"
              >
                Back
              </button>
            )}
          </div>
        )}

        {done && (
          <div className="animate-rise">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Your MACROW growth recommendation
            </h3>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Based on your answers, this is the combination we would discuss first. It is a
              starting point for a conversation, not a fixed package.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {recommendation.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-accent/30 bg-accent/8 px-4 py-2 text-sm font-medium"
                >
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full px-6">
                <Link to="/contact">
                  Discuss Your Growth Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6"
                onClick={() => {
                  setAnswers({});
                  setStep(0);
                }}
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Start again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
