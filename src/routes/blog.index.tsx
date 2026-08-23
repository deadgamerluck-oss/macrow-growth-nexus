import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { CtaBand, PageHero, Section } from "@/components/site/Primitives";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { publishedPostsQuery } from "@/lib/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Growth Notes from the MACROW Studio" },
      {
        name: "description",
        content:
          "Fresh thinking on digital growth, communication and technology, published by the MACROW team.",
      },
      { property: "og:title", content: "MACROW Blog" },
      {
        property: "og:description",
        content: "Notes on growth strategy, marcomm and technology from the MACROW team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { data, isLoading } = useQuery(publishedPostsQuery);
  const posts = data ?? [];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the studio."
        intro="Shorter, sharper pieces published by our strategists as the work happens — written for operators, not for search engines."
      />

      <Section>
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[16/10] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">
            No posts published yet. Our library of long-form guides lives in the{" "}
            <Link to="/insights" className="text-accent underline-offset-4 hover:underline">
              insights hub
            </Link>
            .
          </p>
        ) : (
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <StaggerItem key={p.id}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="card-elevate flex h-full flex-col overflow-hidden"
                >
                  {p.cover_image_url && (
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow">{p.category}</p>
                    <h2 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h2>
                    {p.excerpt && (
                      <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                    )}
                    <p className="mt-5 text-xs text-muted-foreground">
                      {[
                        p.author_name,
                        p.published_at
                          ? new Date(p.published_at).toLocaleDateString("en-GB", {
                              dateStyle: "medium",
                            })
                          : null,
                        p.reading_time,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Section>

      <CtaBand
        title="Want this thinking applied to your business?"
        body="Tell us the goal. We'll tell you the first three moves."
        action="Start a Conversation"
      />
    </>
  );
}
