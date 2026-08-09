import { createFileRoute, Link } from "@tanstack/react-router";

import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { industries } from "@/content/site";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    meta: [
      { title: "Industries We Work With | MACROW" },
      {
        name: "description",
        content:
          "SaaS, startups, healthcare, education, manufacturing, retail, D2C, finance, real estate and enterprise — sector context for digital, marcomm and technology work.",
      },
      { property: "og:title", content: "Industries We Work With | MACROW" },
      {
        property: "og:description",
        content: "Sector-specific priorities across fourteen industries.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/industries" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Context changes the answer."
        intro="The same capability behaves differently in a hospital, a factory and a SaaS company. These are the priorities we start from in each sector."
      />
      <Section>
        <SectionHeading eyebrow="Sectors" title="Where we focus" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$industry"
              params={{ industry: i.slug }}
              className="card-elevate p-6"
            >
              <h3 className="text-lg font-semibold">{i.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.focus}</p>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand
        title="Working in a sector not listed?"
        body="The method transfers. Tell us the market and we'll tell you how we'd approach it."
        action="Start a Conversation"
      />
    </>
  );
}