import { createFileRoute } from "@tanstack/react-router";

import { PillarPage } from "@/components/pages/PillarPage";
import { pillarBySlug } from "@/content/site";

export const Route = createFileRoute("/marcomm")({
  head: () => ({
    meta: [
      { title: "Marcomm Services — 360° Marketing Communication | MACROW" },
      {
        name: "description",
        content:
          "Brand strategy, identity, creative, content and production built as one marketing communication system.",
      },
      { property: "og:title", content: "360° Marketing Communication | MACROW" },
      {
        property: "og:description",
        content: "One clear story, expressed consistently across every audience and market.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/marcomm" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/marcomm" }],
  }),
  component: MarcommRoute,
});

function MarcommRoute() {
  return <PillarPage pillar={pillarBySlug("marcomm")!} />;
}
