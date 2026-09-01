import { createFileRoute, redirect } from "@tanstack/react-router";

import { ContactPage } from "@/components/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  beforeLoad: () => {
    throw redirect({
      to: "/",
    });
  },
});
