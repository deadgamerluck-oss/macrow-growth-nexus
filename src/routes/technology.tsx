import { createFileRoute } from "@tanstack/react-router";

import { PillarPage } from "@/components/pages/PillarPage";
import { pillarBySlug } from "@/content/site";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology Services — 360° Technology Solutions | MACROW" },
      {
        name: "description",
        content:
          "Product design, web and app development, business systems, AI and digital transformation from MACROW.",
      },
      { property: "og:title", content: "360° Technology Solutions | MACROW" },
      {
        property: "og:description",
        content: "Products, platforms and automation that hold up as the business grows.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/technology" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/technology" }],
  }),
  component: TechnologyRoute,
});

function TechnologyRoute() {
  return <PillarPage pillar={pillarBySlug("technology")!} />;
}
