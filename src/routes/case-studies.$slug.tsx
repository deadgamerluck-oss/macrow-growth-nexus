import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Breadcrumbs, CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { caseStudies } from "@/content/insights";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = caseStudies.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Case study not found | MACROW" }, { name: "robots", content: "noindex" }],
      };
    }
    const s = loaderData.study;
    return {
      meta: [
        { title: `${s.title} — Case Study | MACROW` },
        { name: "description", content: s.summary },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/case-studies/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/case-studies/${params.slug}` }],
    };
  },
  component: CaseStudyPage,
  notFoundComponent: CaseStudyNotFound,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Case studies", to: "/case-studies" },
          { label: study.industry },
        ]}
      />
      <PageHero
        eyebrow={`${study.industry} · ${study.service}`}
        title={study.title}
        intro={study.summary}
      />

      <Section>
        <dl className="grid gap-6 sm:grid-cols-3">
          {study.metrics.map((m) => (
            <div key={m.label} className="card-elevate p-6">
              <dt className="eyebrow">{m.label}</dt>
              <dd className="mt-2 text-3xl font-semibold">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Situation" title="Where they started" />
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{study.challenge}</p>
          </div>
          <div>
            <SectionHeading eyebrow="Approach" title="What we did" />
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{study.approach}</p>
          </div>
        </div>
      </Section>

      <CtaBand
        title="Let's build what's next."
        body="Every engagement starts with a conversation about outcomes, not deliverables."
        action="Start a Conversation"
      />
    </>
  );
}

function CaseStudyNotFound() {
  return (
    <Section>
      <SectionHeading title="This case study doesn't exist" intro="Browse all published work instead." />
      <Button asChild className="mt-8 rounded-full">
        <Link to="/case-studies">All case studies</Link>
      </Button>
    </Section>
  );
}