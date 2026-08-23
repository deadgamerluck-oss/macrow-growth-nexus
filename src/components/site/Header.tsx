import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { pillars, objectives, industries } from "@/content/site";
import { Wordmark } from "./RavenMark";

type MegaKey = "digital" | "marcomm" | "technology" | "solutions" | "industries" | null;

export function Header() {
  const [open, setOpen] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const pillar = pillars.find((p) => p.slug === open);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-macrow flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" aria-label="MACROW home" onClick={() => setOpen(null)}>
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {pillars.map((p) => (
            <button
              key={p.slug}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[active=true]:text-foreground"
              data-active={open === p.slug}
              aria-expanded={open === p.slug}
              onClick={() => setOpen(open === p.slug ? null : (p.slug as MegaKey))}
            >
              {p.name}
            </button>
          ))}
          <button
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-expanded={open === "solutions"}
            onClick={() => setOpen(open === "solutions" ? null : "solutions")}
          >
            Solutions
          </button>
          <button
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-expanded={open === "industries"}
            onClick={() => setOpen(open === "industries" ? null : "industries")}
          >
            Industries
          </button>
          <Link
            to="/insights"
            onClick={() => setOpen(null)}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Insights
          </Link>
          <Link
            to="/careers"
            onClick={() => setOpen(null)}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Careers
          </Link>
          <Link
            to="/about"
            onClick={() => setOpen(null)}
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            About
          </Link>
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="rounded-full px-5">
            <Link to="/contact">Start a Conversation</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className="hidden border-t border-border bg-card lg:block"
          onMouseLeave={() => setOpen(null)}
        >
          <div className="container-macrow py-8">
            {pillar && (
              <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
                <div>
                  <p className="eyebrow">{pillar.tagline}</p>
                  <h2 className="mt-3 text-2xl font-semibold">{pillar.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{pillar.positioning}</p>
                  <Link
                    to={`/${pillar.slug}` as "/digital"}
                    onClick={() => setOpen(null)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent"
                  >
                    Explore {pillar.name} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {pillar.capabilities.map((c) => (
                    <div key={c.name}>
                      <p className="text-sm font-semibold">{c.name}</p>
                      <ul className="mt-2 space-y-1.5">
                        {c.services.slice(0, 4).map((s) => (
                          <li key={s}>
                            <Link
                              to={`/services/${slugify(s)}` as any}
                              onClick={() => setOpen(null)}
                              className="text-sm text-muted-foreground transition-colors hover:text-accent"
                            >
                              {s}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {open === "solutions" && (
              <div>
                <p className="eyebrow">Solutions by objective</p>
                <div className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
                  {objectives.map((o) => (
                    <Link
                      key={o.slug}
                      to="/solutions/$objective"
                      params={{ objective: o.slug }}
                      onClick={() => setOpen(null)}
                      className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      I want to {o.label.toLowerCase()}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {open === "industries" && (
              <div>
                <p className="eyebrow">Industries</p>
                <div className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
                  {industries.map((i) => (
                    <Link
                      key={i.slug}
                      to="/industries/$industry"
                      params={{ industry: i.slug }}
                      onClick={() => setOpen(null)}
                      className="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {i.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="container-macrow flex flex-col py-4" aria-label="Mobile">
            {[
              { label: "Digital", to: "/digital" },
              { label: "Marcomm", to: "/marcomm" },
              { label: "Technology", to: "/technology" },
              { label: "Solutions", to: "/solutions" },
              { label: "Industries", to: "/industries" },
              { label: "Case Studies", to: "/case-studies" },
              { label: "Insights", to: "/insights" },
              { label: "Blog", to: "/blog" },
              { label: "Careers", to: "/careers" },
              { label: "About", to: "/about" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border/60 py-3.5 text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-5 rounded-full">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Start a Conversation
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
