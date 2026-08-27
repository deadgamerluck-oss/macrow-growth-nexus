import { useQuery } from "@tanstack/react-query";
import { Linkedin } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { teamQuery } from "@/lib/content";
import lakshman from "@/assets/lakshman.jpg";
import atul from "@/assets/atul.jpg";
import honey from "@/assets/honey.jpg";

const mockMembers = [
  {
    id: "1",
    name: "Lakshman Sharma",
    role: "CO-FOUNDER, CMO",
    pillar: "TECHNOLOGY",
    bio: "He oversees our automation and AI solutions, ensuring they fit seamlessly into existing ops.",
    is_active: true,
    photo_url: lakshman,
  },
  {
    id: "2",
    name: "Atul Sinha",
    role: "CO-FOUNDER, HEAD OF DIGITAL",
    pillar: "MARCOMM",
    bio: "He leads our digital growth strategy, focusing on measurable performance and scalable acquisition.",
    is_active: true,
    photo_url: atul,
  },
  {
    id: "3",
    name: "Honey Sinha",
    role: "MACROW DIRECTOR, LEAD STRATEGIST",
    pillar: "DIGITAL",
    bio: "She brings 9+ years of experience aligning brand narrative with business objectives.",
    is_active: true,
    photo_url: honey
  },
];

export function TeamSection() {
  const members = mockMembers;

  if (members.length === 0) {
    return (
      <p className="mt-10 text-sm text-white/60">
        Team profiles are being updated. Check back shortly.
      </p>
    );
  }

  return (
    <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m) => (
        <StaggerItem key={m.id}>
          <article className="flex flex-col h-full overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-white/10">
              {m.photo_url ? (
                <img
                  src={m.photo_url}
                  alt={`${m.name}, ${m.role} at MACROW`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-2xl font-semibold text-white/40">
                  {m.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="bg-[#990a00] p-8 flex-1 flex flex-col">
              {m.pillar && (
                <p className="text-[10px] font-bold tracking-[0.15em] text-white/80 uppercase mb-4">
                  {m.pillar}
                </p>
              )}
              <h3 className="text-2xl font-serif font-medium text-white">{m.name}</h3>
              <p className="text-[11px] uppercase tracking-wider text-white/80 mt-2 mb-5">
                {m.role}
              </p>
              {m.bio && (
                <p className="text-sm leading-relaxed text-white/90">{m.bio}</p>
              )}
              {m.linkedin_url && (
                <a
                  href={m.linkedin_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${m.name} on LinkedIn`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm text-white hover:underline"
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
