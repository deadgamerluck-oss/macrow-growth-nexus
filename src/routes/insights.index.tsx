import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { CtaBand, PageHero, Section, SectionHeading } from "@/components/site/Primitives";
import { ContactForm } from "@/components/site/ContactForm";
import { articles, insightCategories } from "@/content/insights";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights & Learning Hub — Marketing and Technology | MACROW" },
      {
        name: "description",
        content:
          "Plain-language guides on SEO, performance marketing, branding, technology, AI and business growth from MACROW.",
      },
      { property: "og:title", content: "Insights & Learning Hub | MACROW" },
      {
        property: "og:description",
        content: "Learn what you need before you buy it. Guides, explainers and a glossary.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/insights" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
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
      <PageHero
        eyebrow="Insights"
        title="Learn what you need before you buy it."
        intro="Explainers for people new to marketing and technology, and sharper reading for teams who already run both."
      />

      <Section>
        <div className="flex flex-col gap-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search insights"
              aria-label="Search insights"
              maxLength={80}
              className="h-11 pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {usedCategories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                  category === c
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-14 text-muted-foreground">
            Nothing matches that search yet. Try a broader term.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <Link
                key={a.slug}
                to="/insights/$slug"
                params={{ slug: a.slug }}
                className="card-elevate flex flex-col p-6"
              >
                <p className="eyebrow">{a.category}</p>
                <h2 className="mt-3 text-lg font-semibold leading-snug">{a.title}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{a.description}</p>
                <p className="mt-5 text-xs text-muted-foreground">
                  {a.author} ·{" "}
                  {new Date(a.date).toLocaleDateString("en-GB", { dateStyle: "medium" })} ·{" "}
                  {a.readingTime}
                </p>
              </Link>
            ))}
          </div>
        )}
      </Section>
      <CtaBand
        title="Need help applying this?"
        body="Reading is the first step. We can help you sequence the work."
        action="Start a Conversation"
      />
      <Section className="py-12 w-full" id="contact-form" tone="muted">
        <ContactForm />
      </Section>
    </>
  );
}
