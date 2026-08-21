import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs, CtaBand } from "@/components/site/Primitives";
import { publishedPostsQuery } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} | MACROW Blog` },
      {
        name: "description",
        content: "A growth, communication and technology perspective from the MACROW team.",
      },
      { property: "og:title", content: "MACROW Blog" },
      {
        property: "og:description",
        content: "A growth, communication and technology perspective from the MACROW team.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `/blog/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
  }),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery(publishedPostsQuery);
  const post = (data ?? []).find((p) => p.slug === slug);

  if (isLoading) {
    return (
      <div className="container-macrow space-y-4 py-20">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container-macrow py-24 text-center">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="mt-3 text-muted-foreground">
          It may have been unpublished.{" "}
          <Link to="/blog" className="text-accent underline-offset-4 hover:underline">
            Back to the blog
          </Link>
        </p>
      </div>
    );
  }

  const blocks = post.body.split(/\n{2,}/).filter((b) => b.trim().length > 0);

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.category }]}
      />
      <article className="container-macrow py-12 lg:py-16">
        <p className="eyebrow">{post.category}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{post.excerpt}</p>
        )}
        <p className="mt-6 text-xs text-muted-foreground">
          {[
            post.author_name,
            post.published_at
              ? new Date(post.published_at).toLocaleDateString("en-GB", { dateStyle: "long" })
              : null,
            post.reading_time,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-10 aspect-[16/8] w-full rounded-lg object-cover"
          />
        )}

        <div className="mt-12 max-w-2xl space-y-6">
          {blocks.map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="pt-4 text-xl font-semibold sm:text-2xl">
                {block.replace(/^##\s*/, "")}
              </h2>
            ) : (
              <p key={i} className="whitespace-pre-line text-base leading-[1.8] text-muted-foreground">
                {block}
              </p>
            ),
          )}
        </div>
      </article>

      <CtaBand
        title="Turn this thinking into a plan."
        body="Bring the ambition and the constraints. We'll bring the plan."
        action="Start a Conversation"
      />
    </>
  );
}