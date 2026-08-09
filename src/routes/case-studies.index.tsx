import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { caseStudies } from "@/content/insights";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Growth, Brand and Technology Work | MACROW" },
      {
        name: "description",
        content:
          "How MACROW approaches growth, brand and technology engagements across SaaS, healthcare, manufacturing and D2C.",
      },
      { property: "og:title", content: "Case Studies | MACROW" },
      { property: "og:description", content: "Selected engagements and the thinking behind them." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/case-studies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="The work, and the reasoning behind it."
        intro="Each engagement is written up the same way: the situation, the decision, the sequence and what changed."
      />
      <Section>
        <SectionHeading eyebrow="Selected engagements" title="Recent work" />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              to="/case-studies/$slug"
              params={{ slug: c.slug }}
              className="card-elevate flex flex-col p-7"
            >
              <p className="eyebrow">
                {c.industry} · {c.service}
              </p>
              <h2 className="mt-3 text-xl font-semibold leading-snug">{c.title}</h2>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.summary}</p>
              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-5">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                      {m.label}
                    </dt>
                    <dd className="mt-1 text-lg font-semibold">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Want this kind of clarity on your growth?"
        body="Tell us where you are. We'll tell you what we'd do first."
        action="Start a Conversation"
      />
    </>
  );
}