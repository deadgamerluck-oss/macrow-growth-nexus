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
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Situation" title="Where they started" />
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{study.challenge}</p>
          </div>
          <div>
            <SectionHeading eyebrow="Strategy" title="The decision" />
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{study.strategy}</p>
          </div>
          <div>
            <SectionHeading eyebrow="Execution" title="What we did" />
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{study.execution}</p>
          </div>
          <div>
            <SectionHeading eyebrow="Technology" title="What we built" />
            <p className="mt-5 text-base leading-[1.75] text-muted-foreground">{study.technology}</p>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Outcome" title="What changed" />
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {(study.results as string[]).map((r, i) => (
            <li key={i} className="card-elevate p-6 text-sm font-semibold">
              {r}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Have a similar problem to solve?"
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