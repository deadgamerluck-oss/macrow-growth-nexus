import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import careerBannerImg from "@/assets/career-banner-image.png";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/site/ContactForm";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { CtaBand } from "@/components/site/Primitives";

export const Route = createFileRoute("/careers/")({
  head: () => ({
    meta: [
      { title: "Careers at MACROW — Digital, Marcomm & Technology Roles" },
      { name: "description", content: "Join MACROW. Open roles across growth strategy, performance marketing, communication and engineering." },
    ],
  }),
  component: CareersIndex,
});

function CareersIndex() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#111111] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={careerBannerImg} alt="Careers" className="w-full h-full object-cover object-center" />
        </div>

        <div className="container-macrow relative z-10 pt-32 pb-24 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              CAREERS
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif text-white leading-[1.1] font-medium tracking-tight">
              Work where strategy meets <span className="text-accent italic">execution.</span>
            </h1>
            <p className="mt-8 text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              We hire people who ask better questions than they're asked. Small senior teams, real ownership, global clients
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="rounded-none bg-accent hover:bg-accent/90 text-white px-8 h-14 text-sm font-semibold group">
                <Link to="/contact">
                  Start a conversation <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black px-8 h-14 text-sm font-semibold transition-colors">
                <Link to="/solutions">Explore solutions</Link>
              </Button>
            </div>

            <div className="mt-24 pt-8 border-t border-white/20">
              <p className="text-white/60 text-sm md:text-base">
                Working globally with startups, SMEs and enterprises across fourteen sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="py-24 bg-[#E02D05] text-white">
        <div className="container-macrow">
          <div className="max-w-2xl mb-16">
            <p className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              OPEN ROLES
            </p>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">3 open positions</h2>
            <p className="text-white/90 text-sm md:text-base max-w-md leading-relaxed">
              Don't see your role? Write to us anyway — we keep a bench of people we want to work with.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Role 1 */}
            <div className="bg-white p-8 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
              <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                DIGITAL
              </p>
              <h3 className="text-2xl font-serif text-accent mb-6 flex items-start justify-between group-hover:text-accent/80 transition-colors">
                <span className="leading-tight">Business development manager</span>
                <ArrowRight className="h-5 w-5 mt-1 shrink-0" />
              </h3>
              <p className="text-[#333] text-[13px] leading-relaxed flex-grow">
                To drive sustainable revenue growth by acquiring new B2B clients, building strategic partnerships, and expanding existing acconts for our branding, marketing , and digital services bsiness.
              </p>
              <Button asChild className="w-full mt-8 rounded-none bg-accent hover:bg-accent/90 text-white font-bold text-xs tracking-wider uppercase h-12">
                <a href="mailto:careers@macrow.com?subject=Application:%20Business%20development%20manager">APPLY NOW</a>
              </Button>
            </div>

            {/* Role 2 */}
            <div className="bg-white p-8 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
              <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                DIGITAL
              </p>
              <h3 className="text-2xl font-serif text-accent mb-6 flex items-start justify-between group-hover:text-accent/80 transition-colors">
                <span className="leading-tight">Senior video editor</span>
                <ArrowRight className="h-5 w-5 mt-1 shrink-0" />
              </h3>
              <p className="text-[#333] text-[13px] leading-relaxed flex-grow">
                To lead end-to-end post-production for brand films, social/reels, performance ads, and long-form content—ensuring high-quality storytelling, fast turnaround, and platform-optimized outputs that drive engagement and conversions.
              </p>
              <Button asChild className="w-full mt-8 rounded-none bg-accent hover:bg-accent/90 text-white font-bold text-xs tracking-wider uppercase h-12">
                <a href="mailto:careers@macrow.com?subject=Application:%20Senior%20video%20editor">APPLY NOW</a>
              </Button>
            </div>

            {/* Role 3 */}
            <div className="bg-white p-8 group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full">
              <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
                DIGITAL
              </p>
              <h3 className="text-2xl font-serif text-accent mb-6 flex items-start justify-between group-hover:text-accent/80 transition-colors">
                <span className="leading-tight">Senior motion graphic designer</span>
                <ArrowRight className="h-5 w-5 mt-1 shrink-0" />
              </h3>
              <p className="text-[#333] text-[13px] leading-relaxed flex-grow">
                To lead motion design across brand campaigns, social/reels, performance ads, explainers, and product launches—transforming brand narratives into high-impact animated visuals that elevate craft, consistency, and conversion.
              </p>
              <Button asChild className="w-full mt-8 rounded-none bg-accent hover:bg-accent/90 text-white font-bold text-xs tracking-wider uppercase h-12">
                <a href="mailto:careers@macrow.com?subject=Application:%20Senior%20motion%20graphic%20designer">APPLY NOW</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaBand
        eyebrow="FREE 30-MINUTE SESSION"
        title="Let's build what's next."
        body="Tell us where you are and what you're trying to reach. We'll tell you what we'd do first."
        action="Start a conversation"
        to="/contact"
      />
      <TestimonialCarousel />
    </>
  );
}
