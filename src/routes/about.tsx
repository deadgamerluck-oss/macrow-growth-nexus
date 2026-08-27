import { createFileRoute } from "@tanstack/react-router";
import { Compass, Eye, Layers, Repeat, ArrowRight, Star } from "lucide-react";

import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { Reveal } from "@/components/site/Reveal";
import { TeamSection } from "@/components/site/TeamSection";
import { ContactForm } from "@/components/site/ContactForm";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { pillars } from "@/content/site";
import teamCollab from "@/assets/team-banner.jpg";
import team2 from "@/assets/team.jpg";
import heroPoster from "@/assets/hero-bg.jpg";

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
      <section className="relative min-h-[80vh] flex items-center bg-[#111111] overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <img src={heroPoster} alt="Hero background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 z-10" />
        </div>
        <div className="container-macrow relative z-20 flex flex-col lg:flex-row gap-12 lg:items-center">
          <div className="flex-1 max-w-2xl text-white">
            <p className="text-[#ff3b00] font-bold text-[10px] tracking-[0.15em] uppercase mb-6">ABOUT MACROW</p>
            <h1 className="text-5xl lg:text-7xl font-serif font-medium leading-[1.1] mb-6">
              Intelligence.<br />Observation.<br />Adaptability.
            </h1>
          </div>
          <div className="lg:w-[450px] shrink-0 bg-white">
            <div className="aspect-[16/9] bg-muted overflow-hidden relative">
              <img src={teamCollab} alt="Team" className="object-cover w-full h-full" />
            </div>
            <div className="p-8 lg:p-10">
              <h3 className="font-bold text-lg font-serif mb-4">One Team. One Direction. Real Growth.</h3>
              <p className="text-sm text-muted-foreground leading-[1.7]">
                Growth is no longer just a marketing challenge. It's about aligning strategy, communication, and technology to move in one direction—with one team driving the outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f4f4] py-20 lg:py-28">
        <div className="container-macrow max-w-9xl mx-auto">
          <div className="max-w-3xl mb-12">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-600 uppercase mb-4">POSITIONING</p>
            <h2 className="text-4xl lg:text-5xl font-serif font-medium leading-[1.1] mb-5 text-slate-900">
              A growth platform,<br />not an agency roster.
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              We work with startups finding their first market, SMEs professionalising their growth, and enterprises modernising at scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
            <Reveal className="bg-[#ff3b00] text-white p-8 lg:p-12 flex flex-col justify-center space-y-5 text-[14px] leading-[1.7]">
              <p>
                We started MACROW after watching the same pattern repeat: three vendors, three
                dashboards, three definitions of success, and no single person answerable for revenue.
              </p>
              <p>
                So we built the opposite. One strategic view, three delivery pillars, and a loop that
                sharpens as evidence arrives. We tell clients what not to do as often as what to do —
                and we say no to work that would only look busy.
              </p>
              <p>
                We operate globally and stay deliberately sector-aware: the method is consistent, the
                application never is.
              </p>
              <p>
                Our teams are senior by design. We don't sell you on partners and staff your account
                with juniors. The strategists who diagnose the problem are the same people who own the
                execution and report on the outcome.
              </p>
              <p>
                This means smaller teams, faster iteration, and complete alignment between what is
                promised and what is delivered. We believe that strategy without execution is just
                hallucination, and execution without strategy is just noise.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <img
                src={team2}
                alt="MACROW strategists reviewing a growth plan together"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#cc1b00] to-[#b81800] py-20 lg:py-28" id="team">
        <div className="container-macrow">
          <div className="max-w-3xl mb-12">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/80 uppercase mb-4">THE TEAM</p>
            <h2 className="text-4xl lg:text-5xl font-serif font-medium leading-[1.1] mb-6 text-white">
              Senior people,<br />no handoff layers.
            </h2>
            <p className="text-white/80 text-base lg:text-lg max-w-xl">
              You work with the people who do the thinking. Small teams, deep ownership, global exposure.
            </p>
          </div>
          <TeamSection />
        </div>
      </section>

      <section className="bg-[#111111] py-20 lg:py-28">
        <div className="container-macrow">
          <div className="max-w-3xl mb-12">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-4">PRINCIPLES</p>
            <h2 className="text-4xl lg:text-5xl font-serif font-medium leading-[1.1] mb-6 text-white">
              How we think
            </h2>
            <p className="text-white/60 text-base lg:text-lg">
              Four commitments that shape every engagement.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {principles.map((p) => (
              <Reveal key={p.title} className="bg-[#f4f4f4] p-8 flex flex-col h-full rounded-none">
                <h3 className="text-2xl font-serif font-semibold text-[#ff3b00] leading-tight mb-4">{p.title}</h3>
                <p className="text-[14px] leading-relaxed text-slate-700">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-[#111111]">
        <div className="container-macrow">
          <hr className="border-white/10" />
        </div>
      </div>

      <section className="bg-[#111111] py-20 lg:py-28">
        <div className="container-macrow flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.15em] text-[#ff3b00] uppercase mb-4">
              FREE 30-MINUTE SESSION
            </p>
            <h2 className="text-4xl lg:text-[3.5rem] font-serif font-medium leading-[1.1] mb-5 text-white">
              Let's build what's<br />next.
            </h2>
            <p className="text-white/60 text-[15px] leading-relaxed max-w-md">
              Tell us where you are and what you're trying to reach. We'll tell you what we'd do first.
            </p>
          </div>
          <div className="shrink-0">
            <a href="#contact-form" className="inline-flex items-center justify-center bg-[#ff3b00] text-white px-8 py-4 text-[15px] font-medium hover:bg-[#e63500] transition-colors rounded-none">
              Start a conversation <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      <section className="bg-[#111111] py-20 lg:py-28" id="contact-form">
        <div className="container-macrow max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-4">CONTACT US</p>
            <h2 className="text-4xl lg:text-5xl font-serif font-medium leading-[1.1] mb-6 text-white">
              Partner with<br />MACROW
            </h2>
            <p className="text-white/60 text-base lg:text-lg max-w-xl">
              Bring us your product, roadmap, or problem. We'll tell you where to start.
            </p>
          </div>
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
