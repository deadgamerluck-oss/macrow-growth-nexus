import { useQuery } from "@tanstack/react-query";
import { Linkedin } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { teamQuery } from "@/lib/content";

const mockMembers = [
  {
    id: "1",
    name: "Alex Mercer",
    role: "Head of Digital",
    pillar: "Digital",
    bio: "Alex leads our digital growth strategy, focusing on measurable performance and scalable acquisition.",
    is_active: true,
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    role: "Lead Strategist",
    pillar: "Strategy",
    bio: "Sarah brings 10+ years of experience aligning brand narrative with business objectives.",
    is_active: true,
  },
  {
    id: "3",
    name: "David Chen",
    role: "Chief Technology Officer",
    pillar: "Technology",
    bio: "David oversees our automation and AI solutions, ensuring they fit seamlessly into existing ops.",
    is_active: true,
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    role: "Marcomm Director",
    pillar: "Marcomm",
    bio: "Elena drives our communication efforts, turning complex products into clear, compelling stories.",
    is_active: true,
  },
];

export function TeamSection() {
  const members = mockMembers;

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
