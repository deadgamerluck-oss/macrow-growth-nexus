import { createFileRoute } from "@tanstack/react-router";

import { ContactPage } from "@/components/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact MACROW — Let's build what's next" },
      {
        name: "description",
        content:
          "Start a conversation with MACROW about digital, marcomm and technology growth. Based in Ahmedabad, working with businesses across markets.",
      },
      { property: "og:title", content: "Contact MACROW — Let's build what's next" },
      {
        property: "og:description",
        content: "Tell us your stage and objective. We'll recommend the right combination.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});
