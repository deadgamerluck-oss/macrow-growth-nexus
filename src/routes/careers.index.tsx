import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MapPin } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { publishedOpeningsQuery } from "@/lib/content";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers at MACROW — Digital, Marcomm & Technology Roles" },
      {
        name: "description",
        content:
          "Join MACROW. Open roles across growth strategy, performance marketing, communication and engineering — remote and hybrid, worldwide.",
      },
      { property: "og:title", content: "Careers at MACROW" },
      {
        property: "og:description",
        content: "Open roles across strategy, marketing, communication and technology.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/careers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/careers" }],
  }),
  component: CareersIndex,
});

function CareersIndex() {
  const { data, isLoading } = useQuery(publishedOpeningsQuery);
  const openings = data ?? [];

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work where strategy meets execution."
        intro="We hire people who ask better questions than they're asked. Small senior teams, real ownership, global clients."
      />

      <Section>
        <SectionHeading
          eyebrow="Open roles"
          title={
            isLoading
              ? "Loading roles…"
              : `${openings.length} open position${openings.length === 1 ? "" : "s"}`
          }
          intro="Don't see your role? Write to us anyway — we keep a bench of people we want to work with."
        />

        {isLoading ? (
          <div className="mt-12 space-y-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        ) : openings.length === 0 ? (
          <p className="mt-10 text-muted-foreground">
            No roles are open right now.{" "}
            <Link to="/contact" className="text-accent underline-offset-4 hover:underline">
              Introduce yourself
            </Link>{" "}
            and we'll keep you in mind.
          </p>
        ) : (
          <Stagger className="mt-12 space-y-3">
            {openings.map((job) => (
              <StaggerItem key={job.id}>
                <Link
                  to="/careers/$slug"
                  params={{ slug: job.slug }}
                  className="card-elevate group flex flex-wrap items-center justify-between gap-4 p-6"
                >
                  <div>
                    <p className="eyebrow">{job.department}</p>
                    <h3 className="mt-2 text-lg font-semibold">{job.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {job.location} · {job.work_type} · {job.employment_type}
                    </p>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-accent">
                    View role
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Section>

      <CtaBand
        title="Not a role, but still a fit?"
        body="Send us the work you're proudest of and what you want to build next."
        action="Get in touch"
        href="mailto:careers@macrow.com?subject=General%20Application"
      />
    </>
  );
}
