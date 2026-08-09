import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand, Section, SectionHeading } from "@/components/site/Primitives";
import { EcosystemFlow, GrowthLoopSystem } from "@/components/site/Ecosystem";
import { NeedFinder } from "@/components/site/NeedFinder";
import { StageSelector } from "@/components/site/StageSelector";
import { industries, objectives, pillars } from "@/content/site";
import { articles } from "@/content/insights";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MACROW — Global Digital, Marcomm & Technology Growth Platform" },
      {
        name: "description",
        content:
          "MACROW combines strategy, marketing, communication and technology into one growth system for startups, SMEs and enterprises worldwide.",
      },
      {
        property: "og:title",
        content: "MACROW — Digital, Marcomm & Technology Growth Platform",
      },
      {
        property: "og:description",
        content:
          "One strategic view, three delivery pillars, one compounding growth loop. Global by design.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MACROW",
          url: "/",
          description:
            "Global digital, marcomm and technology growth platform for startups, SMEs and enterprises.",
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = articles.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-mesh pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full opacity-[0.18] blur-3xl animate-drift"
          style={{ background: "var(--gradient-accent)" }}
          aria-hidden
        />
        <div className="container-macrow relative py-24 lg:py-36">
          <div className="max-w-4xl animate-rise">
            <p className="eyebrow">Digital · Marcomm · Technology</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.03] sm:text-6xl lg:text-7xl">
              Growth belongs to those who observe first.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              MACROW is a global growth platform where strategy, marketing, communication and
              technology are planned as one system — so nothing is bought before it is understood.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/contact">
                  Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <Link to="/solutions">Explore solutions</Link>
              </Button>
            </div>
          </div>

          <dl className="mt-20 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.slug}>
                <dt className="eyebrow">{pillar.tagline}</dt>
                <dd className="mt-3 text-lg font-semibold">{pillar.name}</dd>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.summary}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="The ecosystem"
          title="Three pillars that only work together."
          intro="Most companies buy these in fragments. The gaps between vendors are where growth quietly leaks."
        />
        <EcosystemFlow />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.slug}
              to={`/${pillar.slug}`}
              className="card-elevate group flex flex-col p-7"
            >
              <p className="eyebrow">{pillar.tagline}</p>
              <h3 className="mt-3 flex items-center gap-2 text-xl font-semibold">
                {pillar.name}
                <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {pillar.summary}
              </p>
              <ul className="mt-6 space-y-1.5 border-t border-border pt-5 text-sm text-muted-foreground">
                {pillar.capabilities.slice(0, 4).map((c) => (
                  <li key={c.name}>{c.name}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted" id="stages">
        <SectionHeading
          eyebrow="Business stage selector"
          title="The right move depends on where you are."
          intro="A startup finding its market and an enterprise modernising at scale need opposite advice. Pick your stage."
        />
        <StageSelector />
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="The MACROW Growth Loop"
          title="Observe, decide, build, amplify, measure, adapt."
          intro="Not a funnel with an end. A loop that gets sharper every cycle because evidence accumulates."
          inverted
        />
        <GrowthLoopSystem />
      </Section>

      <Section id="need-finder">
        <SectionHeading
          eyebrow="Need finder"
          title="Not sure what you actually need?"
          intro="Answer a few questions the way you'd answer them in a first meeting. You'll get a recommendation, not a sales pitch."
        />
        <NeedFinder />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="By objective"
          title="Start from the outcome you want."
          intro="Nobody wakes up wanting a channel. They want a result."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.slice(0, 6).map((o) => (
            <Link
              key={o.slug}
              to="/solutions/$objective"
              params={{ objective: o.slug }}
              className="card-elevate group flex items-center justify-between gap-3 p-5"
            >
              <span className="text-sm font-semibold">{o.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <Button asChild variant="ghost" className="mt-8 rounded-full">
          <Link to="/solutions">
            All solutions <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Industries"
          title="Context changes the answer."
          intro="The method is consistent. The application never is."
        />
        <div className="mt-12 flex flex-wrap gap-2.5">
          {industries.map((i) => (
            <Link
              key={i.slug}
              to="/industries/$industry"
              params={{ industry: i.slug }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
            >
              {i.name}
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Learning hub"
          title="Understand it before you buy it."
          intro="Plain-language explainers for founders and teams new to marketing and technology."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((a) => (
            <Link
              key={a.slug}
              to="/insights/$slug"
              params={{ slug: a.slug }}
              className="card-elevate flex flex-col p-6"
            >
              <p className="eyebrow">{a.category}</p>
              <h3 className="mt-3 text-base font-semibold leading-snug">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.description}</p>
              <p className="mt-5 text-xs text-muted-foreground">{a.readingTime}</p>
            </Link>
          ))}
        </div>
        <Button asChild variant="ghost" className="mt-8 rounded-full">
          <Link to="/insights">
            Visit the insights hub <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Section>

      <CtaBand
        title="Let's build what's next."
        body="Tell us where you are and what you're trying to reach. We'll tell you what we'd do first."
        action="Start a Conversation"
      />
    </>
  );
}
