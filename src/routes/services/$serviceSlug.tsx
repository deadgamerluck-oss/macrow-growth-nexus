import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";

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
  SectionHeading,
} from "@/components/site/Primitives";
import { ContactForm } from "@/components/site/ContactForm";
import { pillars, objectives, type Pillar } from "@/content/site";
import { slugify } from "@/lib/utils";
import { testimonials } from "@/components/site/TestimonialCarousel";

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

export const Route = createFileRoute("/services/$serviceSlug")({
  head: ({ params }) => {
    const slug = params.serviceSlug;
    let name = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    for (const pillar of pillars) {
      for (const cap of pillar.capabilities) {
        for (const s of cap.services) {
          if (slugify(s) === slug) {
            name = s;
          }
        }
      }
    }

    return {
      meta: [
        { title: `${name} | MACROW` },
        { name: "description", content: `Expert solutions and consulting for ${name}.` },
      ],
    };
  },
  component: ServiceRoute,
});

function ServiceRoute() {
  const { serviceSlug } = Route.useParams();

  let serviceName = serviceSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  let parentPillar = pillars[0];
  let parentCapability = pillars[0].capabilities[0];

  for (const pillar of pillars) {
    for (const cap of pillar.capabilities) {
      for (const s of cap.services) {
        if (slugify(s) === serviceSlug) {
          serviceName = s;
          parentCapability = cap;
          parentPillar = pillar;
        }
      }
    }
  }

  const related = objectives.filter((o) => o.pillars.includes(parentPillar.name)).slice(0, 6);
  const faqs = faqCopy[parentPillar.slug as Pillar["slug"]];

  const accentWord = "system"; // Configurable accent word
  
  // Helper to render title with accent word
  const renderTitle = (title: string, wordToAccent: string) => {
    const parts = title.split(new RegExp(`(${wordToAccent})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === wordToAccent.toLowerCase() ? (
            <em key={i} className="text-accent italic not-italic-font">{part}</em>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0c0c0c] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff3b0010_1px,transparent_1px),linear-gradient(to_bottom,#ff3b0010_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" aria-hidden />
        
        {/* Inline Dark Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="container-macrow relative z-10 pt-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            {[
              { label: "Home", to: "/" },
              { label: parentPillar.name, to: `/${parentPillar.slug}` as any },
              { label: serviceName },
            ].map((item, i, arr) => (
              <li key={item.label} className="flex items-center gap-2">
                {item.to ? (
                  <Link to={item.to as "/"} className="transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
                {i < arr.length - 1 && <span aria-hidden>/</span>}
              </li>
            ))}
          </ol>
        </nav>

        <div className="container-macrow relative py-16 lg:py-24">
          <div className="max-w-4xl animate-rise">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-4">{parentPillar.tagline}</p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              {renderTitle(`${serviceName}: ${parentPillar.positioning}`, accentWord)}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">
              {parentCapability.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none bg-accent hover:bg-accent/90 text-white px-7 font-bold uppercase tracking-wider text-xs">
                <Link to="/contact">{parentPillar.cta}</Link>
              </Button>
              <Button asChild size="lg" className="rounded-none bg-transparent border border-white/20 text-white hover:bg-white/10 hover:text-white px-7 font-bold uppercase tracking-wider text-xs">
                <Link to="/solutions">Browse by objective</Link>
              </Button>
            </div>
            <div className="mt-12 pt-6 border-t border-white/10">
              <p className="text-[11px] font-bold tracking-[0.15em] text-white/40 uppercase">Trusted by ambitious brands globally</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="container-macrow">
          <SectionHeading
            eyebrow="Related Services"
            title={`More in ${parentCapability.name}`}
            intro="Services are grouped by the job they do, so you can see how work connects instead of scrolling a flat list."
          />
          <div className="mt-12 space-y-6">
            <article className="bg-gradient-to-br from-[#cc1b00] to-[#b81800] text-white p-6 lg:p-8 rounded-none">
              <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
                <div className="border border-white/10 bg-white/5 p-6 rounded-none flex flex-col justify-center">
                  <span className="font-display text-xs font-bold tracking-[0.2em] text-white/70">
                    01
                  </span>
                  <h3 className="mt-2 text-xl font-serif font-semibold">{parentCapability.name}</h3>
                  <p className="mt-2 text-sm text-white/80">{parentCapability.description}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {parentCapability.services.map((s, idx) => (
                    <div
                      key={s}
                      className="flex flex-col gap-3 border border-white/10 bg-white/5 p-5 rounded-none"
                    >
                      <span className="text-2xl font-serif font-bold text-white/40">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] font-medium leading-snug">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-secondary/60">
        <div className="container-macrow">
          <SectionHeading
            eyebrow="How an engagement runs"
            title="What it is, who needs it, and what changes"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
            {(() => {
              const items = [
                {
                  t: "What it is",
                  b: `${serviceName} work at MACROW is a planned system, not a list of tasks. The plan defines sequence, ownership and measurement.`,
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
              ];
              const [first, ...rest] = items;
              return (
                <>
                  <div className="card-elevate p-8 lg:p-10 border-accent/20 border-2 flex flex-col justify-center bg-white">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase">{first.t}</p>
                    <p className="mt-4 text-lg lg:text-xl leading-relaxed text-slate-800 font-medium">{first.b}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {rest.map((item) => (
                      <div key={item.t} className="card-elevate p-6 flex flex-col bg-white">
                        <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase">{item.t}</p>
                        <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{item.b}</p>
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-20 lg:py-28 text-white">
        <div className="container-macrow">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-4">Related objectives</p>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
              Start from what you want to achieve
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o, idx) => (
              <Link
                key={o.slug}
                to="/solutions/$objective"
                params={{ objective: o.slug }}
                className="bg-white/5 border border-white/10 group flex items-center gap-5 p-5 hover:bg-white/10 transition-colors rounded-none"
              >
                <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white/70 group-hover:bg-accent group-hover:text-white transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <span>
                  <span className="block text-sm font-semibold text-white">
                    I want to {o.label.toLowerCase()}
                  </span>
                  <span className="mt-1 block text-xs text-white/60">{o.description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fdfcf9] py-20 lg:py-28">
        <div className="container-macrow">
          <SectionHeading eyebrow="FAQ" title={`Common questions about ${serviceName}`} />
          <Accordion type="single" collapsible className="mt-10 max-w-3xl">
            {faqs?.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaBand
        title={parentPillar.cta}
        body="Tell us the situation. We'll tell you what we'd do first, and what we'd leave for later."
        action="Start a Conversation"
      />

      <section className="bg-[#111111] py-20 lg:py-28 w-full" id="contact-form">
        <div className="container-macrow max-w-5xl mx-auto">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

