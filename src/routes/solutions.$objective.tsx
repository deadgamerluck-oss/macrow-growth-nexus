import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/Primitives";
import { ContactForm } from "@/components/site/ContactForm";
import { objectives } from "@/content/site";

export const Route = createFileRoute("/solutions/$objective")({
  loader: ({ params }) => {
    const objective = objectives.find((o) => o.slug === params.objective);
    if (!objective) throw notFound();
    return { objective };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Solution not found | MACROW" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.objective.label} — MACROW Solutions`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.objective.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.objective.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/solutions/${params.objective}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/solutions/${params.objective}` }],
    };
  },
  component: ObjectivePage,
  notFoundComponent: ObjectiveNotFound,
});

function ObjectivePage() {
  const { objective } = Route.useLoaderData();
  const others = objectives.filter((o) => o.slug !== objective.slug).slice(0, 6);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Solutions", to: "/solutions" },
          { label: objective.label },
        ]}
      />
      <PageHero
        eyebrow={`I want to ${objective.label.toLowerCase()}`}
        title={objective.label}
        intro={objective.description}
      >
        <Button asChild size="lg" className="rounded-full px-7">
          <Link to="/contact">Discuss this objective</Link>
        </Button>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Capabilities involved"
          title="What this usually requires"
          intro="The exact combination depends on your stage, market and existing systems."
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {objective.services.map((s: string) => (
            <li key={s} className="card-elevate p-5 text-sm font-semibold">
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted-foreground">
          Pillars involved: <span className="text-foreground">{objective.pillars.join(", ")}</span>
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Other objectives" title="Related directions" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/solutions/$objective"
              params={{ objective: o.slug }}
              className="card-elevate p-5 text-sm font-semibold"
            >
              {o.label}
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Want this outcome in your business?"
        body="We'll map this objective to a sequence that fits your stage and budget."
        action="Start a Conversation"
      />
      <Section className="py-12 w-full" id="contact-form" tone="muted">
        <ContactForm />
      </Section>
    </>
  );
}

function ObjectiveNotFound() {
  return (
    <Section>
      <SectionHeading
        title="This solution doesn't exist"
        intro="It may have been renamed. Browse all objectives instead."
      />
      <Button asChild className="mt-8 rounded-full">
        <Link to="/solutions">All solutions</Link>
      </Button>
    </Section>
  );
}
