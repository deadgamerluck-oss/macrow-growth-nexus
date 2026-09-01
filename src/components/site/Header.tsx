import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { pillars, objectives, industries } from "@/content/site";
import { Wordmark } from "./RavenMark";

type MegaKey = "digital" | "marcomm" | "technology" | "solutions" | "industries" | null;

export function Header() {
  const [open, setOpen] = useState<MegaKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const pillar = pillars.find((p) => p.slug === open);
  
  const isComingSoonRoute = ["/marcomm", "/technology", "/solutions", "/industries", "/insights", "/careers", "/blog"].some(route => currentPath.startsWith(route));

  return (
    <>
      {isComingSoonRoute && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-500 text-white text-xs font-medium px-4 py-1.5 rounded shadow-lg shadow-red-500/20 pointer-events-none">
          Coming soon
        </div>
      )}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111] text-white">
      <div className="container-macrow flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link 
          to="/" 
          aria-label="MACROW home" 
          onClick={() => {
            setOpen(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {pillars.map((p) => (
            <div key={p.slug} className="relative group">
              <button
                className="px-2.5 py-2 text-[13px] font-medium text-white transition-colors hover:text-accent data-[active=true]:text-accent"
                data-active={open === p.slug || currentPath.startsWith(`/${p.slug}`)}
                aria-expanded={open === p.slug}
                onClick={(e) => {
                  if (["marcomm", "technology"].includes(p.slug)) {
                    e.preventDefault();
                    toast("Coming soon");
                  } else {
                    setOpen(open === p.slug ? null : (p.slug as MegaKey));
                  }
                }}
              >
                {p.name}
              </button>
              {["marcomm", "technology"].includes(p.slug) && (
                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Coming soon
                </span>
              )}
            </div>
          ))}
          
          <div className="relative group">
            <button
              className="px-2.5 py-2 text-[13px] font-medium text-white transition-colors hover:text-accent data-[active=true]:text-accent"
              data-active={open === "solutions" || currentPath.startsWith("/solutions")}
              aria-expanded={open === "solutions"}
              onClick={(e) => {
                e.preventDefault();
                toast("Coming soon");
              }}
            >
              Solutions
            </button>
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Coming soon
            </span>
          </div>

          <div className="relative group">
            <button
              className="px-2.5 py-2 text-[13px] font-medium text-white transition-colors hover:text-accent data-[active=true]:text-accent"
              data-active={open === "industries" || currentPath.startsWith("/industries")}
              aria-expanded={open === "industries"}
              onClick={(e) => {
                e.preventDefault();
                toast("Coming soon");
              }}
            >
              Industries
            </button>
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Coming soon
            </span>
          </div>

          <div className="relative group">
            <button
              onClick={(e) => {
                e.preventDefault();
                toast("Coming soon");
              }}
              className="px-2.5 py-2 text-[13px] font-medium text-white transition-colors hover:text-accent block"
            >
              Insights
            </button>
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Coming soon
            </span>
          </div>

          <div className="relative group">
            <button
              onClick={(e) => {
                e.preventDefault();
                toast("Coming soon");
              }}
              className="px-2.5 py-2 text-[13px] font-medium text-white transition-colors hover:text-accent block"
            >
              Careers
            </button>
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              Coming soon
            </span>
          </div>

          <Link
            to="/about"
            onClick={() => setOpen(null)}
            className="px-2.5 py-2 text-[13px] font-medium text-white transition-colors hover:text-accent"
            activeProps={{ className: "text-accent" }}
          >
            About
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <a href="https://www.linkedin.com/company/macrow-digital/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="bg-white hover:bg-white/90 p-1 transition-colors">
            <Linkedin className="h-4 w-4 text-black" fill="currentColor" strokeWidth={0} />
          </a>
          <Button asChild size="sm" className="rounded-none bg-accent hover:bg-accent/90 text-white px-5 py-2 h-auto text-xs font-bold tracking-wider uppercase">
            <Link to="/contact">Contact Us</Link>
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
          className="hidden border-t border-white/10 bg-[#111] lg:block"
          onMouseLeave={() => setOpen(null)}
        >
          <div className="container-macrow py-8">
            {pillar && (
              <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
                <div>
                  <p className="eyebrow">{pillar.tagline}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{pillar.name}</h2>
                  <p className="mt-2 text-sm text-white/70">{pillar.positioning}</p>
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
                      <p className="text-sm font-semibold text-white">{c.name}</p>
                      <ul className="mt-2 space-y-1.5">
                        {c.services.slice(0, 4).map((s) => (
                          <li key={s}>
                            <Link
                              to={`/services/${slugify(s)}` as any}
                              onClick={() => setOpen(null)}
                              className="text-sm text-white/70 transition-colors hover:text-accent"
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
                      className="rounded-md px-2 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
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
                      className="rounded-md px-2 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
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
        <div className="border-t border-border bg-white text-black lg:hidden">
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
            ].map((item) => {
              const isComingSoon = ["/marcomm", "/technology", "/solutions", "/industries", "/insights", "/careers", "/blog"].includes(item.to);
              
              if (isComingSoon) {
                return (
                  <button
                    key={item.to}
                    onClick={() => {
                      setMobileOpen(false);
                      toast("Coming soon");
                    }}
                    className="border-b border-black/10 py-3.5 text-base font-medium hover:text-accent transition-colors text-left"
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-black/10 py-3.5 text-base font-medium hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
            <Button asChild className="mt-5 rounded-full bg-accent text-white hover:bg-accent/90">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                Start a Conversation
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
