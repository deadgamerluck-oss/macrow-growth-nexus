import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { CtaBand } from "@/components/site/Primitives";
import { articles, insightCategories } from "@/content/insights";
import insightBannerImg from "@/assets/Insight-banner-image.png";
import cardTopImg from "@/assets/Insight-banner-image-02.png";
import boxImg1 from "@/assets/Box-image-1.jpg";
import boxImg2 from "@/assets/Box-image-2.jpg";
import boxImg3 from "@/assets/Box-image-3.jpg";

const boxImages = [boxImg1, boxImg2, boxImg3];
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/site/ContactForm";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights & Learning Hub — Marketing and Technology | MACROW" },
      { name: "description", content: "Plain-language guides on SEO, performance marketing, branding, technology, AI and business growth from MACROW." },
    ],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(
    () =>
      articles.filter((a) => {
        const matchesCategory = category === "All" || a.category === category;
        const q = query.trim().toLowerCase();
        const matchesQuery =
          !q ||
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      }),
    [query, category],
  );

  const usedCategories = [
    "All",
    ...insightCategories.filter((c) => articles.some((a) => a.category === c)),
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center bg-[#111111] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={insightBannerImg} alt="Insights" className="w-full h-full object-cover object-center " />

        </div>

        <div className="container-macrow relative z-10 pt-32 pb-24 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <p className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              INSIGHTS
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-serif text-white leading-[1.1] font-medium tracking-tight">
              Research. Validate. <span className="text-accent italic">Commit.</span>
            </h1>
            <p className="mt-8 text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
              Clear guides for those new to marketing and technology, plus advanced analysis for teams already running both—built to help B2B organizations make smarter, faster decisions.
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

      {/* Main Content Section */}
      <section
        className="py-20 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${cardTopImg})` }}
      >
        {/* Overlay to ensure readability */}


        <div className="container-macrow relative z-10">

          {/* Search & Filter */}
          <div className="flex flex-col gap-8 mb-16">
            <div className="relative max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search insights"
                aria-label="Search insights"
                maxLength={80}
                className="h-14 pl-12 rounded-none border border-accent/40 focus-visible:border-accent focus-visible:ring-0 bg-transparent text-base"
              />
            </div>

            <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by category">
              {usedCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`border px-5 py-2.5 text-[13px] font-semibold transition-colors ${category === c
                    ? "border-accent bg-transparent text-accent"
                    : "border-accent/40 bg-transparent text-black hover:border-accent hover:text-accent"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="mt-14 text-muted-foreground">
              Nothing matches that search yet. Try a broader term.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a, index) => (
                <Link
                  key={a.slug}
                  to="/insights/$slug"
                  params={{ slug: a.slug }}
                  className="bg-white border border-accent/20 flex flex-col group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 w-full overflow-hidden border-b border-accent/20">
                    <img
                      src={boxImages[index % boxImages.length]}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-accent text-[10px] font-bold tracking-[0.15em] uppercase mb-4">
                      {a.category}
                    </p>
                    <h2 className="text-xl md:text-2xl font-serif text-black leading-snug mb-4 group-hover:text-accent transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-[#555] text-sm leading-relaxed flex-1">
                      {a.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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



    </>
  );
}
