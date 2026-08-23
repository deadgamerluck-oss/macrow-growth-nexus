import { createFileRoute } from "@tanstack/react-router";

import { PillarPage } from "@/components/pages/PillarPage";
import { pillarBySlug } from "@/content/site";

export const Route = createFileRoute("/digital")({
  head: () => ({
    meta: [
      { title: "Digital Marketing Services — 360° Digital Growth | MACROW" },
      {
        name: "description",
        content:
          "Digital strategy, performance marketing, SEO, content and automation planned as one growth system by MACROW.",
      },
      { property: "og:title", content: "360° Digital Growth | MACROW" },
      {
        property: "og:description",
        content: "Strategy, paid, search, social and lifecycle marketing as one connected system.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/digital" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/digital" }],
  }),
  component: DigitalRoute,
});

function DigitalRoute() {
  return <PillarPage pillar={pillarBySlug("digital")!} />;
}
