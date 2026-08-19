import { useQuery } from "@tanstack/react-query";
import { Linkedin } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { teamQuery } from "@/lib/content";

export function TeamSection() {
  const { data, isLoading } = useQuery(teamQuery);
  const members = (data ?? []).filter((m) => m.is_active);

  if (isLoading) {
    return (
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-[4/5] w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <p className="mt-10 text-sm text-muted-foreground">
        Team profiles are being updated. Check back shortly.
      </p>
    );
  }

  return (
    <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((m) => (
        <StaggerItem key={m.id}>
          <article className="card-elevate group h-full overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              {m.photo_url ? (
                <img
                  src={m.photo_url}
                  alt={`${m.name}, ${m.role} at MACROW`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-2xl font-semibold text-muted-foreground">
                  {m.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="p-5">
              {m.pillar && <p className="eyebrow">{m.pillar}</p>}
              <h3 className="mt-2 text-base font-semibold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
              {m.bio && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              )}
              {m.linkedin_url && (
                <a
                  href={m.linkedin_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${m.name} on LinkedIn`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              )}
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}