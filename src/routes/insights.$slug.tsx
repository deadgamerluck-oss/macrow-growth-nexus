import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Breadcrumbs, CtaBand, Section, SectionHeading } from "@/components/site/Primitives";
import { articleBySlug, articles, type Article } from "@/content/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const article = articleBySlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found | MACROW" }, { name: "robots", content: "noindex" }],
      };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title} | MACROW Insights` },
        { name: "description", content: a.description },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/insights/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/insights/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: a.title,
            description: a.description,
            datePublished: a.date,
            author: { "@type": "Organization", name: a.author },
            publisher: { "@type": "Organization", name: "MACROW" },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  notFoundComponent: ArticleNotFound,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Insights", to: "/insights" },
          { label: article.category },
        ]}
      />
      <article className="container-macrow py-12 lg:py-16">
        <p className="eyebrow">{article.category}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{article.description}</p>
        <p className="mt-6 text-xs text-muted-foreground">
          {article.author} ·{" "}
          {new Date(article.date).toLocaleDateString("en-GB", { dateStyle: "long" })} ·{" "}
          {article.readingTime}
        </p>

        <div className="mt-12 max-w-2xl space-y-10">
          {(article.body as Article["body"]).map((block, i) => (
            <section key={i}>
              {block.heading && (
                <h2 className="text-xl font-semibold sm:text-2xl">{block.heading}</h2>
              )}
              <div className="mt-3 space-y-4">
                {block.paragraphs.map((p: string, j: number) => (
                  <p key={j} className="text-base leading-[1.75] text-muted-foreground">
                    {p}
                  </p>
                ))}
              </div>
              {block.list && (
                <ul className="mt-5 space-y-2.5">
                  {block.list.map((item: string) => (
                    <li
                      key={item}
                      className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      <Section tone="muted">
        <SectionHeading eyebrow="Keep reading" title="Related insights" />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              to="/insights/$slug"
              params={{ slug: a.slug }}
              className="card-elevate p-6"
            >
              <p className="eyebrow">{a.category}</p>
              <h3 className="mt-3 text-base font-semibold leading-snug">{a.title}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Need help applying this?"
        body="We can turn this into a plan for your business, at your stage."
        action="Start a Conversation"
      />
    </>
  );
}

function ArticleNotFound() {
  return (
    <Section>
      <SectionHeading
        title="This article doesn't exist"
        intro="It may have moved or been renamed."
      />
      <Button asChild className="mt-8 rounded-full">
        <Link to="/insights">All insights</Link>
      </Button>
    </Section>
  );
}
