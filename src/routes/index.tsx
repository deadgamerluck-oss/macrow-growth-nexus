import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand, Section, SectionHeading } from "@/components/site/Primitives";
import { EcosystemFlow, GrowthLoopSystem } from "@/components/site/Ecosystem";
import { NeedFinder } from "@/components/site/NeedFinder";
import { StageSelector } from "@/components/site/StageSelector";
import { ConsultPopup } from "@/components/site/ConsultPopup";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { industries, objectives, pillars } from "@/content/site";
import { articles } from "@/content/insights";
import heroLoop from "@/assets/hero-loop.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg";

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
      <ConsultPopup />
      <section className="surface-ink relative overflow-hidden border-b border-border">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
          src={heroLoop.url}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, color-mix(in oklab, var(--ink) 88%, transparent), color-mix(in oklab, var(--ink) 45%, transparent))",
          }}
          aria-hidden
        />
        <div className="grid-mesh pointer-events-none absolute inset-0 opacity-25" aria-hidden />
        <div className="container-macrow relative py-28 lg:py-40">
          <div className="max-w-4xl animate-rise">
            <p className="eyebrow">Digital · Marcomm · Technology</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.03] text-ink-foreground sm:text-6xl lg:text-7xl">
              Growth belongs to those who observe first.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/75 sm:text-xl">
              MACROW is a global growth platform where strategy, marketing, communication and
              technology are planned as one system — so nothing is bought before it is understood.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
                <Link to="/contact">
                  Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-ink-foreground/30 bg-transparent px-7 text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
              >
                <Link to="/solutions">Explore solutions</Link>
              </Button>
            </div>
          </div>

          <p className="mt-20 max-w-xl border-t border-ink-foreground/15 pt-8 text-sm leading-relaxed text-ink-foreground/60">
            Working globally with startups, SMEs and enterprises across fourteen sectors.
          </p>

        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="The ecosystem"
          title="Three pillars that only work together."
          intro="Most companies buy these in fragments. The gaps between vendors are where growth quietly leaks."
        />
        <EcosystemFlow />
        <Stagger className="mt-14 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.slug} className="h-full">
              <Link
                to={`/${pillar.slug}`}
                className="card-elevate group flex h-full flex-col p-7"
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
            </StaggerItem>
          ))}
        </Stagger>
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

      <Section id="start-here">
        <SectionHeading
          eyebrow="Where to start"
          title="Pick the outcome. We'll sequence the work."
          intro="Nobody wakes up wanting a channel — they want a result. Choose an objective, or tell us your sector and we'll adapt the method to it."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.slice(0, 6).map((o) => (
            <Reveal key={o.slug}>
            <Link
              to="/solutions/$objective"
              params={{ objective: o.slug }}
              className="card-elevate group flex items-center justify-between gap-3 p-5"
            >
              <span className="text-sm font-semibold">{o.label}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-1" />
            </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-2.5 border-t border-border pt-8">
          {industries.slice(0, 8).map((i) => (
            <Link
              key={i.slug}
              to="/industries/$industry"
              params={{ industry: i.slug }}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
            >
              {i.name}
            </Link>
          ))}
          <Link
            to="/industries"
            className="rounded-full border border-accent/40 px-4 py-2 text-sm font-medium text-accent"
          >
            All industries
          </Link>
        </div>
        <Button asChild variant="ghost" className="mt-8 rounded-full">
          <Link to="/solutions">
            Explore all solutions <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </Section>


      <Section tone="muted">
        <SectionHeading
          eyebrow="Learning hub"
          title="Understand it before you buy it."
          intro="Plain-language explainers for founders and teams new to marketing and technology."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((a) => (
            <Reveal key={a.slug} className="h-full">
            <Link
              to="/insights/$slug"
              params={{ slug: a.slug }}
              className="card-elevate flex h-full flex-col p-6"
            >
              <p className="eyebrow">{a.category}</p>
              <h3 className="mt-3 text-base font-semibold leading-snug">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.description}</p>
              <p className="mt-5 text-xs text-muted-foreground">{a.readingTime}</p>
            </Link>
            </Reveal>
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
