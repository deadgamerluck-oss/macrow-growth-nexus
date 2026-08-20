import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Layers, Repeat } from "lucide-react";

import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { TeamSection } from "@/components/site/TeamSection";
import { pillars } from "@/content/site";
import teamCollab from "@/assets/team-collab.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MACROW — Digital, Marcomm & Technology Partner" },
      {
        name: "description",
        content:
          "MACROW is a global growth partner combining strategy, marketing, communication and technology for startups, SMEs and enterprises.",
      },
      { property: "og:title", content: "About MACROW" },
      {
        property: "og:description",
        content: "Observe, adapt, compound — the thinking behind MACROW.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "MACROW",
          description:
            "Global digital, marcomm and technology growth platform for startups, SMEs and enterprises.",
          areaServed: "Worldwide",
        }),
      },
    ],
  }),
  component: AboutPage,
});

const principles = [
  {
    icon: Eye,
    title: "Observe before acting",
    body: "We read the market, the data and the internal reality before recommending spend. Most wasted budget is a diagnosis problem, not an execution problem.",
  },
  {
    icon: Compass,
    title: "Strategy owns the sequence",
    body: "Every channel, campaign and system exists inside a plan with an order. Nothing is bought because it is fashionable.",
  },
  {
    icon: Layers,
    title: "One team, three disciplines",
    body: "Digital, marcomm and technology sit in the same room. Handoffs between agencies are where growth quietly dies.",
  },
  {
    icon: Repeat,
    title: "Compound, don't restart",
    body: "We build assets that keep working — content, systems, data and brand equity — instead of campaigns that reset each quarter.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About MACROW"
        title="Intelligence, observation, adaptability."
        intro="MACROW exists because growth stopped being a marketing problem. It is now a question of strategy, communication and technology moving together — which is exactly what fragmented vendors cannot deliver."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Positioning"
              title="A growth platform, not an agency roster."
              intro="We work with startups finding their first market, SMEs professionalising their growth, and enterprises modernising at scale."
            />
            <img
              src={teamCollab}
              alt="MACROW strategists reviewing a growth plan together"
              loading="lazy"
              className="mt-8 aspect-[4/3] w-full rounded-lg object-cover"
            />
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-base leading-[1.75] text-muted-foreground">
            <p>
              Most companies buy capability in fragments: an agency for ads, a studio for brand, a
              vendor for software. Each one optimises its own metric, and nobody is accountable for
              the business outcome.
            </p>
            <p>
              MACROW is built the other way around. A single strategic view, three delivery pillars,
              and one loop that keeps improving as evidence arrives. We tell clients what not to do
              as often as what to do.
            </p>
            <p>
              We operate globally and stay deliberately sector-aware: the method is consistent, the
              application is not.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted" id="team">
        <SectionHeading
          eyebrow="The team"
          title="Senior people, no handoff layers."
          intro="You work with the people who do the thinking. Small teams, deep ownership, global exposure."
        />
        <TeamSection />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Principles"
          title="How we think"
          intro="Four commitments that shape every engagement."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map((p) => (
            <Reveal key={p.title} className="card-elevate p-7">
              <p.icon className="h-5 w-5 text-accent" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Capabilities" title="Three pillars, one plan" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.slug} className="card-elevate p-7">
              <p className="eyebrow">{pillar.tagline}</p>
              <h3 className="mt-3 text-xl font-semibold">{pillar.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.summary}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Let's build what's next."
        body="Bring the ambition and the constraints. We'll bring the plan."
        action="Start a Conversation"
      />
    </>
  );
}