import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/Primitives";
import { industries } from "@/content/site";
import { caseStudies } from "@/content/insights";

export const Route = createFileRoute("/industries/$industry")({
  loader: ({ params }) => {
    const industry = industries.find((i) => i.slug === params.industry);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Industry not found | MACROW" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.industry.name} — Digital, Marcomm & Technology | MACROW`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.industry.focus },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.industry.focus },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/industries/${params.industry}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/industries/${params.industry}` }],
    };
  },
  component: IndustryPage,
  notFoundComponent: IndustryNotFound,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const related = caseStudies.filter((c) => c.industry === industry.name);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Industries", to: "/industries" },
          { label: industry.name },
        ]}
      />
      <PageHero eyebrow="Industry" title={industry.name} intro={industry.focus} />

      <Section>
        <SectionHeading
          eyebrow="Priorities"
          title="Where we normally start in this sector"
          intro="A starting hypothesis, refined once we see your data and systems."
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-3">
          {industry.priorities.map((p: string) => (
            <li key={p} className="card-elevate p-5 text-sm font-semibold">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Case studies" title="Work in this sector" />
        {related.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {related.map((c) => (
              <Link
                key={c.slug}
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="card-elevate p-6"
              >
                <p className="eyebrow">{c.service}</p>
                <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.summary}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-8 max-w-2xl text-muted-foreground">
            Case studies for this sector will be published here. The section is structured so
            approved client work can be added without redesigning the page.
          </p>
        )}
      </Section>

      <CtaBand
        title={`Let's talk about ${industry.name.toLowerCase()}.`}
        body="We'll start with your market, your buying cycle and the systems you already run."
        action="Start a Conversation"
      />
    </>
  );
}

function IndustryNotFound() {
  return (
    <Section>
      <SectionHeading
        title="This industry page doesn't exist"
        intro="Browse all sectors instead."
      />
      <Button asChild className="mt-8 rounded-full">
        <Link to="/industries">All industries</Link>
      </Button>
    </Section>
  );
}
