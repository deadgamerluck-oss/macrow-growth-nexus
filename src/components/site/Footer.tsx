import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { toast } from "sonner";

import logoUrl from "@/assets/logo-black.png";

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
      {
        label: "Brand Building",
        to: "/solutions/$objective" as const,
        params: { objective: "build-a-brand" },
      },
      {
        label: "Lead Generation",
        to: "/solutions/$objective" as const,
        params: { objective: "generate-leads" },
      },
      {
        label: "Business Growth",
        to: "/solutions/$objective" as const,
        params: { objective: "increase-sales" },
      },
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
      { label: "Blog", to: "/blog" as const },
      { label: "Case Studies", to: "/case-studies" as const },
      { label: "Industries", to: "/industries" as const },
      { label: "About MACROW", to: "/about" as const },
      { label: "Careers", to: "/careers" as const },
    ],
  },
];

const socials = [
  { label: "LinkedIn", Icon: Linkedin, links: "https://www.linkedin.com/company/macrow-digital/" },
  { label: "Instagram", Icon: Instagram, links: "https://www.instagram.com/macrowdigital/" },
  { label: "Facebook", Icon: Facebook, links: "https://www.facebook.com/macrowdigital/" },
  // { label: "YouTube", Icon: Youtube, links: "https://www.linkedin.com/company/macrow-digital/" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container-macrow grid gap-10 py-16 lg:grid-cols-[1.5fr_1fr_1.2fr_1fr_1.5fr] lg:py-20">
        <div className="max-w-xs pr-4">
          <img
            src={logoUrl}
            alt="MACROW DIGITAL"
            className="h-20 w-auto object-contain"
          />
          <p className="mt-6 text-[13px] text-slate-500">
            Digital . Marcomm . Technology . Growth
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
            A global Digital, Marcomm and Technology growth partner for businesses at every stage.
          </p>
          <div className="mt-6 flex gap-1">
            {socials.map(({ label, Icon, links }) => (
              <a
                key={label}
                href={links}
                aria-label={label}
                target="_blank"
                className="inline-flex h-[30px] w-[30px] items-center justify-center bg-accent text-white transition-opacity hover:opacity-90 rounded-none"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[12px] font-medium uppercase tracking-wider text-accent">
              {col.title}
            </p>
            <ul className="mt-6 space-y-3.5">
              {col.links.map((l) => {
                const isComingSoon = ["/marcomm", "/technology", "/solutions", "/industries", "/insights", "/blog", "/careers"].some(route => l.to.startsWith(route));
                if (isComingSoon) {
                  return (
                    <li key={l.label} className="relative group w-fit">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toast("Coming soon");
                        }}
                        className="text-[13px] text-slate-700 transition-colors hover:text-accent"
                      >
                        {l.label}
                      </button>
                      <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-500 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        Coming soon
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      params={"params" in l ? l.params : {}}
                      className="text-[13px] text-slate-700 transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <div className="space-y-4">
          <p className="text-[13px] text-slate-700">
            Working with business<br />across markets.
          </p>
          <p className="text-[13px] text-slate-700 mt-6">
            Ahmedabad, Gujarat, India
          </p>
          <p className="text-[13px] text-slate-700">
            Patna, Bihar, India
          </p>
          <p className="text-[13px] text-slate-700">
            <a href="mailto:growth@macrowdigital.com" className="hover:text-accent transition-colors">
              growth@macrowdigital.com
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-macrow flex flex-col gap-2 py-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} MACROW DIGITAL. All rights reserved</p>
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          </div>
          <p>Built in India. Designed for the world.</p>
        </div>
      </div>
    </footer>
  );
}
