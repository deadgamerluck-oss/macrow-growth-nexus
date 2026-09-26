import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  CtaBand,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/site/Primitives";

import { objectives } from "@/content/site";
import { slugify } from "@/lib/utils";

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

import brandbgImg from "@/assets/brandbg.jpg";
import teamCollabImg from "@/assets/team-collab.jpg";
import { ArrowRight } from "lucide-react";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";

function ObjectivePage() {
  const { objective } = Route.useLoaderData();
  const others = objectives.filter((o) => o.slug !== objective.slug).slice(0, 4);

  const titleWords = objective.label.split(" ");
  const lastWord = titleWords.pop() + ".";
  const firstPart = titleWords.join(" ");

  return (
    <div className="bg-[#111] text-white selection:bg-accent selection:text-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{ backgroundImage: `url(${brandbgImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
        
        <div className="container-macrow relative z-20 flex-1 flex flex-col justify-center">
          <div className="max-w-3xl animate-rise">
            <p className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase mb-6">
              I WANT TO
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-serif font-medium leading-[1.05] tracking-tight">
              {firstPart} <span className="text-accent italic font-light">{lastWord}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl font-light">
              {objective.description}
            </p>
            <div className="mt-12">
              <Button asChild size="lg" className="rounded-none bg-accent hover:bg-accent/90 text-white px-8 py-6 text-sm font-medium">
                <Link to="/contact">Discuss this objective <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="container-macrow relative z-20 mt-auto pt-20">
          <div className="border-t border-white/20 pt-8">
            <p className="text-sm text-white/60">
              Working globally with startups, SMEs and enterprises across fourteen sectors.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Capabilities Section */}
      <section className="bg-accent py-24 lg:py-32">
        <div className="container-macrow">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white uppercase mb-4">
              CAPABILITIES INVOLVED
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-white leading-[1.1]">
              What this usually requires.
            </h2>
            <p className="mt-6 text-white/90 text-lg">
              The exact combination depends on your stage, market and existing systems.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {objective.services.map((s: string, index: number) => (
              <Link 
                key={s} 
                to={`/services/${slugify(s)}` as any}
                className="group relative border border-white/30 p-8 hover:bg-white/10 transition-colors flex flex-col justify-center min-h-[160px]"
              >
                <span className="text-sm font-bold text-white mb-2">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-lg font-semibold text-white group-hover:translate-x-1 transition-transform">
                  {s}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Related Directions Section */}
      <section className="relative bg-[#f3f4f6] text-black py-24 lg:py-32 overflow-hidden">
        <div 
          className="absolute left-0 top-0 bottom-0 w-[50%] lg:w-[40%] bg-cover bg-center z-0"
          style={{ 
            backgroundImage: `url(${teamCollabImg})`,
            maskImage: 'linear-gradient(to right, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 100%)'
          }}
        />
        
        <div className="container-macrow relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 items-start">
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-black/60 uppercase mb-4">
                OTHER OBJECTIVES
              </p>
              <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-serif font-medium leading-[1.1]">
                Related directions
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {others.map((o, i) => (
                <Link
                  key={o.slug}
                  to="/solutions/$objective"
                  params={{ objective: o.slug }}
                  className="bg-transparent border border-accent/30 p-8 hover:border-accent hover:bg-white transition-all flex flex-col justify-center min-h-[140px] group"
                >
                  <span className="text-sm font-bold text-black mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg font-semibold text-black group-hover:text-accent transition-colors">
                    {o.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="FREE 30-MINUTE SESSION"
        title="Let's build what's next."
        body="Tell us where you are and what you're trying to reach. We'll tell you what we'd do first."
        action="Start a conversation"
      />
      
      <TestimonialCarousel />
    </div>
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
