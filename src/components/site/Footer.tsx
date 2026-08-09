import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

import { Wordmark } from "./RavenMark";

const columns = [
  {
    title: "Capabilities",
    links: [
      { label: "Digital", to: "/digital" as const },
      { label: "Marcomm", to: "/marcomm" as const },
      { label: "Technology", to: "/technology" as const },
      { label: "Strategy", to: "/about" as const },
      { label: "AI", to: "/technology" as const },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Brand Building", to: "/solutions/$objective" as const, params: { objective: "build-a-brand" } },
      { label: "Lead Generation", to: "/solutions/$objective" as const, params: { objective: "generate-leads" } },
      { label: "Business Growth", to: "/solutions/$objective" as const, params: { objective: "increase-sales" } },
      {
        label: "Digital Transformation",
        to: "/solutions/$objective" as const,
        params: { objective: "transform-digitally" },
      },
      {
        label: "Automation",
        to: "/solutions/$objective" as const,
        params: { objective: "automate-my-business" },
      },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Insights", to: "/insights" as const },
      { label: "Case Studies", to: "/case-studies" as const },
      { label: "Industries", to: "/industries" as const },
      { label: "About MACROW", to: "/about" as const },
    ],
  },
];

const socials = [
  { label: "LinkedIn", Icon: Linkedin },
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
  { label: "YouTube", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="surface-ink mt-24">
      <div className="container-macrow grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:py-20">
        <div className="max-w-xs">
          <Wordmark inverted />
          <p className="mt-4 text-sm text-ink-foreground/70">
            Digital. Marcomm. Technology. Growth.
          </p>
          <p className="mt-4 text-sm text-ink-foreground/60">
            A global Digital, Marcomm and Technology growth partner for businesses at every
            stage.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-foreground/20 text-ink-foreground/70 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href="#"
              aria-label="X"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-foreground/20 text-sm text-ink-foreground/70 transition-colors hover:border-accent hover:text-accent"
            >
              X
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-foreground/50">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    params={"params" in l ? l.params : {}}
                    className="text-sm text-ink-foreground/75 transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-foreground/50">
            Contact
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic text-ink-foreground/75">
            <p>Ahmedabad, Gujarat, India</p>
            <p>Working with businesses across markets.</p>
          </address>
          <Link
            to="/contact"
            className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
          >
            Start a Conversation
          </Link>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-macrow flex flex-col gap-2 py-6 text-xs text-ink-foreground/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MACROW. All rights reserved.</p>
          <p>Built in India. Designed for the world.</p>
        </div>
      </div>
    </footer>
  );
}