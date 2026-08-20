import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs, CtaBand } from "@/components/site/Primitives";
import { publishedOpeningsQuery } from "@/lib/content";

export const Route = createFileRoute("/careers/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Careers at MACROW` },
      {
        name: "description",
        content: "An open role at MACROW across growth strategy, communication and technology.",
      },
      { property: "og:title", content: "Open role at MACROW" },
      {
        property: "og:description",
        content: "An open role at MACROW across growth strategy, communication and technology.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `/careers/${params.slug}` },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: `/careers/${params.slug}` }],
  }),
  component: CareerDetail,
});

function List({ title, value }: { title: string; value: string }) {
  const items = value
    .split("\n")
    .map((l) => l.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function CareerDetail() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery(publishedOpeningsQuery);
  const job = (data ?? []).find((j) => j.slug === slug);

  if (isLoading) {
    return (
      <div className="container-macrow space-y-4 py-20">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container-macrow py-24 text-center">
        <h1 className="text-2xl font-semibold">This role has closed</h1>
        <p className="mt-3 text-muted-foreground">
          See{" "}
          <Link to="/careers" className="text-accent underline-offset-4 hover:underline">
            all open positions
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Careers", to: "/careers" },
          { label: job.department },
        ]}
      />
      <div className="container-macrow py-12 lg:py-16">
        <p className="eyebrow">{job.department}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
          {job.title}
        </h1>
        <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" aria-hidden />
          {job.location} · {job.work_type} · {job.employment_type}
        </p>
        {job.summary && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {job.summary}
          </p>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="space-y-10">
            {job.responsibilities && <List title="What you'll do" value={job.responsibilities} />}
            {job.requirements && <List title="What we're looking for" value={job.requirements} />}
          </div>
          <aside className="card-elevate h-fit p-6">
            <h2 className="text-base font-semibold">Apply</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Send a short note about why this role, plus links to work you own.
            </p>
            <Button asChild className="mt-5 w-full rounded-full">
              <a href={`mailto:${job.apply_email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>
                Apply by email
              </a>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">{job.apply_email}</p>
          </aside>
        </div>
      </div>

      <CtaBand
        title="Prefer to talk business instead?"
        body="If you're here as a client, we'd rather hear about the problem than the brief."
        action="Start a Conversation"
      />
    </>
  );
}