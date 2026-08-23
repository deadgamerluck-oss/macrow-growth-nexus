import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

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
import { ContactForm } from "@/components/site/ContactForm";
import { pillars, objectives, type Pillar } from "@/content/site";
import { slugify } from "@/lib/utils";

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

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: parentPillar.name, to: `/${parentPillar.slug}` as any },
          { label: serviceName },
        ]}
      />
      <PageHero
        eyebrow={parentPillar.tagline}
        title={`${serviceName}: ${parentPillar.positioning}`}
        intro={parentCapability.description}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-7">
            <Link to="/contact">{parentPillar.cta}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-7">
            <Link to="/solutions">Browse by objective</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Related Services"
          title={`More in ${parentCapability.name}`}
          intro="Services are grouped by the job they do, so you can see how work connects instead of scrolling a flat list."
        />
        <div className="mt-12 space-y-6">
          <article className="card-elevate p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[20rem_1fr]">
              <div>
                <span className="font-display text-xs font-bold tracking-[0.2em] text-accent">
                  01
                </span>
                <h3 className="mt-2 text-xl font-semibold">{parentCapability.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{parentCapability.description}</p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-2">
                {parentCapability.services.map((s) => (
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
          ].map((item) => (
            <div key={item.t} className="card-elevate p-6">
              <p className="eyebrow">{item.t}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Related objectives" title="Start from what you want to achieve" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((o) => (
            <Link
              key={o.slug}
              to="/solutions/$objective"
              params={{ objective: o.slug }}
              className="card-elevate group flex items-center justify-between gap-4 p-5"
            >
              <span>
                <span className="block text-sm font-semibold">
                  I want to {o.label.toLowerCase()}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{o.description}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="FAQ" title={`Common questions about ${serviceName}`} />
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
        title={parentPillar.cta}
        body="Tell us the situation. We'll tell you what we'd do first, and what we'd leave for later."
        action="Start a Conversation"
      />
      <Section className="py-12 w-full" id="contact-form" tone="muted">
        <ContactForm />
      </Section>
    </>
  );
}
