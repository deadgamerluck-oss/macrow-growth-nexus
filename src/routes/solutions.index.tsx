import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";

import { NeedFinder } from "@/components/site/NeedFinder";
import { objectives } from "@/content/site";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: "Solutions by Business Objective | MACROW" },
      {
        name: "description",
        content:
          "Start from the outcome: build a brand, generate leads, build a product, automate operations or enter new markets.",
      },
      { property: "og:title", content: "Solutions by Business Objective | MACROW" },
      {
        property: "og:description",
        content: "Navigate MACROW capabilities by what you want to achieve.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/solutions" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsIndex,
});

function SolutionsIndex() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Start from the outcome, not the service list."
        intro="Most people don't wake up wanting SEO. They want to be found. Pick the objective and we'll show the capabilities behind it."
      />
      <Section>
        <SectionHeading eyebrow="I want to…" title="Choose an objective" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o) => (
            <Link
              key={o.slug}
              to="/solutions/$objective"
              params={{ objective: o.slug }}
              className="card-elevate group p-6"
            >
              <p className="eyebrow">{o.pillars.join(" · ")}</p>
              <h3 className="mt-3 flex items-center gap-2 text-lg font-semibold">
                {o.label}
                <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="muted" id="discovery">
        <SectionHeading
          eyebrow="Discovery tool"
          title="A guided consultation, not a quiz."
          intro="Five questions, answered the way you'd answer them in a first meeting. You get a recommendation — no email required."
        />
        <NeedFinder />
      </Section>
      <CtaBand
        title="Bring the objective, we'll bring the sequence."
        body="Tell us the outcome you're measured on and we'll tell you what we'd do first."
        action="Start a Conversation"
      />
    </>
  );
}
