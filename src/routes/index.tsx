import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand, Section, SectionHeading } from "@/components/site/Primitives";
import { EcosystemFlow, GrowthLoopSystem } from "@/components/site/Ecosystem";
import { StageSelector } from "@/components/site/StageSelector";
import { ConsultPopup } from "@/components/site/ConsultPopup";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/site/Reveal";
import { industries, objectives, pillars } from "@/content/site";
import { articles } from "@/content/insights";
import heroLoop from "@/assets/hero-loop.mp4";
import heroPoster from "@/assets/hero-poster.jpg";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import boxImage1 from "@/assets/Box-image-1.jpg";
import boxImage2 from "@/assets/Box-image-2.jpg";
import boxImage3 from "@/assets/Box-image-3.jpg";
import image1 from "@/assets/Image-1.jpg";
import image2 from "@/assets/Image-2.jpg";

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
      <section className="surface-ink relative overflow-hidden">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
          src={heroLoop}
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
        <div className="container-macrow relative pt-28 pb-10 lg:pt-40 lg:pb-16">
          <div className="max-w-4xl animate-rise">
            <p className="eyebrow text-accent">DIGITAL - MARCOMM - TECHNOLOGY</p>
            <h1 className="mt-5 text-4xl leading-[1.03] text-ink-foreground sm:text-6xl lg:text-7xl font-serif">
              Growth Starts with<br />
              <span className="text-accent italic font-medium">Clarity.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-foreground/75 sm:text-xl">
              MACROW is a global growth platform where strategy, marketing, communication and
              technology are planned as one system — so nothing is bought before it is understood.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-none bg-accent hover:bg-accent/90 text-white px-8 text-base">
                <Link to="/contact">
                  Start a conversation <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none border-ink-foreground/30 bg-transparent px-8 text-base text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground"
              >
                <Link to="/solutions">Explore solutions</Link>
              </Button>
            </div>

            <div className="mt-24 max-w-[800px]  pt-8">
              <p className="text-ink-foreground/75 text-[15px] leading-relaxed">
                Working globally with startups, SMEs and enterprises across fourteen sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Section className="bg-[linear-gradient(120deg,#600700_0%,#d82100_50%,#ff3803_100%)] !py-24">
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold tracking-widest text-white/90 uppercase">The ecosystem</p>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.5rem] font-serif text-white font-medium">
            Three pillars that only<br />work together.
          </h2>
          <p className="mt-6 text-base leading-relaxed sm:text-lg text-white/90 max-w-2xl">
            Bought separately they compete for budget. Planned together they compound — one diagnosis, one sequence, one owner.
          </p>
        </div>

        <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.slug} className="h-full">
              <Link to={`/${pillar.slug}`} className="group flex h-full flex-col bg-white p-8 sm:p-10 transition-transform hover:-translate-y-1 rounded-none shadow-sm">
                <p className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase">
                  {pillar.tagline}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="text-3xl font-serif font-bold text-accent">
                    {pillar.name}
                  </h3>
                  <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-5 flex-1 text-[13px] leading-relaxed text-slate-500">
                  {pillar.summary}
                </p>
                <ul className="mt-8 space-y-2 border-t-[1.5px] border-slate-300 pt-6 text-[12px] text-slate-500">
                  {pillar.capabilities.slice(0, 4).map((c) => (
                    <li key={c.name} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {c.name}
                    </li>
                  ))}
                </ul>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <EcosystemFlow />
      </Section>

      <Section className="!bg-[#990a00] !py-24" id="stages">
        <div className="max-w-7xl">
          <p className="text-[10px] font-bold tracking-widest text-white/70 uppercase">Business stage selector</p>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.5rem] font-serif text-white font-medium">
            The right move depends on where<br />you are.
          </h2>
          <p className="mt-6 text-[13px] leading-relaxed text-white/70 max-w-2xl">
            A startup finding its market and an enterprise modernising at scale need opposite advice. Pick your stage.
          </p>
        </div>
        <StageSelector />
      </Section>

      <Section className="relative overflow-hidden !py-24" id="growth-loop">
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url(${image1})`
          }}
        />
        <div className="relative z-10">
          <GrowthLoopSystem />
        </div>
      </Section>

      <Section className="!bg-[#111111] !py-24" id="start-here">
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase">
            Where to start
          </p>
          <h2 className="mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem] font-serif text-white font-medium">
            Pick the outcome. We'll<br />sequence the work.
          </h2>
          <p className="mt-5 text-[13px] leading-relaxed text-white/60 max-w-lg">
            Nobody wakes up wanting a channel — they want a result. Choose an objective, or tell us your sector and we'll adapt the method to it.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {objectives.slice(0, 6).map((o, idx) => (
            <Reveal key={o.slug}>
              <Link
                to="/solutions/$objective"
                params={{ objective: o.slug }}
                className="group flex flex-col justify-between border border-accent/80 p-5 rounded-none min-h-[140px] hover:bg-white/5 transition-colors h-full"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[13px] font-bold text-white">0{idx + 1}</span>
                  <div className="bg-white rounded-full p-[3px] group-hover:bg-accent transition-colors flex items-center justify-center">
                    <ArrowRight className="h-3 w-3 text-accent group-hover:text-white" strokeWidth={3} />
                  </div>
                </div>
                <span className="text-[12px] text-white/70 mt-6 block leading-snug">{o.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="w-full h-px bg-white/10 my-10" />

        <div className="flex flex-wrap gap-3">
          {industries.slice(0, 8).map((i) => (
            <Link
              key={i.slug}
              to="/industries/$industry"
              params={{ industry: i.slug }}
              className="border border-accent/80 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/5 rounded-none"
            >
              {i.name}
            </Link>
          ))}
          <Link
            to="/industries"
            className="border border-accent/80 px-5 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-white/5 rounded-none"
          >
            All industries
          </Link>
        </div>

        <div className="mt-10">
          <Link to="/solutions" className="inline-flex items-center text-[13px] text-white hover:text-white/80 transition-colors">
            Explore all solutions <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Section>


      <Section className="relative overflow-hidden !py-24" id="learning-hub">
        <div
          className="absolute inset-0 bg-cover pointer-events-none"
          style={{
            backgroundImage: `url(${image2})`
          }}
        />

        <div className="relative z-10 max-w-3xl mb-12">
          <p className="text-[15px] font-bold tracking-[0.15em] text-black uppercase">
            Learning hub
          </p>
          <h2 className="mt-5 text-4xl leading-[1.1] sm:text-5xl lg:text-[3.5rem] font-serif text-gray-900 font-medium">
            Understand it before<br />you buy it.
          </h2>
          <p className="mt-5 text-[15px] font-semibold  leading-relaxed text-gray-900 max-w-[400px]">
            Plain-language explainers for founders and teams new to marketing and technology.
          </p>
        </div>

        <div className="relative z-10 grid gap-5 md:grid-cols-3">
          {featured.map((a, idx) => {
            const images = [boxImage1, boxImage2, boxImage3];
            const image = images[idx % images.length];
            return (
              <Reveal key={a.slug} className="h-full">
                <Link
                  to="/insights/$slug"
                  params={{ slug: a.slug }}
                  className="group flex flex-col border border-accent rounded-none h-full bg-white transition-shadow hover:shadow-lg"
                >
                  <img src={image} alt={a.title} className="h-[180px] w-full object-cover" />
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase">
                      {a.category}
                    </p>
                    <h3 className="mt-4 text-[20px] font-serif text-slate-900 leading-snug">
                      {a.title}
                    </h3>
                    <p className="mt-5 text-[13px] leading-relaxed text-slate-500 flex-1">
                      {a.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

        <div className="relative z-10 mt-12">
          <Link to="/insights" className="inline-flex items-center text-[13px] font-bold text-slate-900 hover:text-accent transition-colors">
            Visit the insights hub <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </Section>

      <CtaBand
        eyebrow="FREE 30-MINUTE SESSION"
        title="Let's build what's next."
        body="Tell us where you are and what you're trying to reach. We'll tell you what we'd do first."
        action="Start a conversation"
      />

      <TestimonialCarousel />

    </>
  );
}
