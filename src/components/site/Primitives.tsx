import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

export function Section({
  children,
  className = "",
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "muted" | "ink";
  id?: string;
}) {
  const toneClass =
    tone === "ink" ? "surface-ink" : tone === "muted" ? "bg-secondary/60" : "bg-background";
  return (
    <section id={id} className={`${toneClass} py-20 lg:py-28 ${className}`}>
      <div className="container-macrow">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  inverted = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2
        className={`mt-3 text-3xl font-semibold leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${
          inverted ? "text-ink-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            inverted ? "text-ink-foreground/70" : "text-muted-foreground"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="grid-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container-macrow relative py-16 lg:py-24">
        <div className="max-w-4xl animate-rise">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  body,
  action,
  href,
  to = "/contact",
}: {
  title: string;
  body: string;
  action: string;
  href?: string;
  to?: string;
}) {
  return (
    <section className="surface-ink">
      <div className="container-macrow flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ink-foreground sm:text-4xl">{title}</h2>
          <p className="mt-4 text-ink-foreground/70">{body}</p>
        </div>
        <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
          {href ? (
            <a href={href}>
              {action} <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <Link to={to as any}>
              {action} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          )}
        </Button>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-macrow pt-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.to ? (
              <Link to={item.to as "/"} className="transition-colors hover:text-accent">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
            {i < items.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
