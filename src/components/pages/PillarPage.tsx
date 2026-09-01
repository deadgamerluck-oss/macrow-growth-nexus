import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import subrelatedImg from "@/assets/subgrelated.jpg";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/Primitives";
import type { Pillar } from "@/content/site";
import { objectives } from "@/content/site";

const faqCopy: Record<Pillar["slug"], { q: string; a: string }[]> = {
  digital: [
    {
      q: "Where should a business with no digital presence start?",
      a: "With the offer and the destination. A clear proposition and a site that converts, before any spend on channels.",
    },
    {
      q: "How long before performance marketing works?",
      a: "Expect four to eight weeks to reach reliable data, longer for considered purchases. SEO compounds over quarters, not weeks.",
    },
    {
      q: "Do you report on platform metrics?",
      a: "We report on qualified pipeline, acquisition cost and payback. Platform metrics are diagnostics, not outcomes.",
    },
  ],
  marcomm: [
    {
      q: "Is this only for large brands?",
      a: "No. A first-time founder needs positioning as much as an enterprise does — the deliverables are simply smaller.",
    },
    {
      q: "Do you work with our existing identity?",
      a: "Often yes. Many businesses need clarity and a usable system rather than a full redesign.",
    },
    {
      q: "How do brand and performance work together?",
      a: "Brand decides what the market believes. Performance decides how often they hear it. Both are planned together here.",
    },
  ],
  technology: [
    {
      q: "Can you work with our existing stack?",
      a: "Yes. Most engagements involve integrating with systems already in use rather than replacing them.",
    },
    {
      q: "How do you scope an MVP?",
      a: "By identifying the single assumption that must be proven, then building only what tests it.",
    },
    {
      q: "Where does AI actually fit?",
      a: "Where repetitive, language-heavy work exists and a human can review output. We scope it against hours saved.",
    },
  ],
};

export function PillarPage({ pillar }: { pillar: Pillar }) {
  const related = objectives.filter((o) => o.pillars.includes(pillar.name)).slice(0, 6);
  const faqs = faqCopy[pillar.slug];

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: pillar.name }]} />
      <PageHero
        eyebrow={pillar.tagline}
        title={`${pillar.name}: ${pillar.positioning}`}
        intro={pillar.summary}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/contact">{pillar.cta}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-7">
            <Link to="/solutions">Browse by objective</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Capability architecture"
          title="Pillar → Capability → Service → Outcome"
          intro="Services are grouped by the job they do, so you can see how work connects instead of scrolling a flat list."
        />
        <div className="mt-12 space-y-6">
          {pillar.capabilities.map((c, i) => (
            <article key={c.name} className="card-elevate p-6 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
                <div>
                  <span className="font-display text-xs font-bold tracking-[0.2em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold">{c.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {c.services.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-3 rounded-md bg-secondary/70 px-4 py-3 text-sm font-medium"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="How an engagement runs"
          title="What it is, who needs it, and what changes"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "What it is",
              b: `${pillar.name} work at MACROW is a planned system, not a list of tasks. The plan defines sequence, ownership and measurement.`,
            },
            {
              t: "Who needs it",
              b: "Businesses where growth depends on being found, understood or operationally faster — at any stage.",
            },
            {
              t: "What we do",
              b: "Diagnose, prioritise, build, launch and measure. Then improve based on what the data actually shows.",
            },
            {
              t: "Expected outcomes",
              b: "Clearer positioning, lower acquisition cost, faster delivery, and decisions supported by evidence.",
            },
          ].map((item) => (
            <div key={item.t} className="card-elevate p-6">
              <p className="eyebrow">{item.t}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative py-20 lg:py-32 ">
        <div className="absolute inset-0 w-full bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${subrelatedImg})` }} />

        <div className="container-macrow relative z-10">
          <div className="max-w-2xl mb-16">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-4">
              Related objectives
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif text-slate-900 leading-[1.1]">
              Start from what you<br />want to achieve
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o, idx) => (
              <Link
                key={o.slug}
                to="/solutions/$objective"
                params={{ objective: o.slug }}
                className="bg-white border border-accent p-8 hover:shadow-xl transition-all block group"
              >
                <div className="text-[4rem] leading-none font-serif text-accent mb-6">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                  I want to {o.label.toLowerCase()}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {o.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Section tone="muted">
        <SectionHeading eyebrow="FAQ" title={`Common questions about ${pillar.name}`} />
        <Accordion type="single" collapsible className="mt-10 max-w-3xl">
          {faqs?.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <CtaBand
        title={pillar.cta}
        body="Tell us the situation. We'll tell you what we'd do first, and what we'd leave for later."
        action="Start a Conversation"
      />
    </>
  );
}
