import { useQuery } from "@tanstack/react-query";
import { Linkedin } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Stagger, StaggerItem } from "@/components/site/Reveal";
import { teamQuery } from "@/lib/content";
import lakshman from "@/assets/lakshman.jpg";
import atul from "@/assets/atul.jpg";
import honey from "@/assets/honey.jpg";
import gajendra from "@/assets/Gajendra.png"
import shilpa from "@/assets/shilpa.png"
import chitranshi from "@/assets/Chitranshi.png"
import { Mail } from "lucide-react"
const mockMembers = [

  {
    id: "1",
    name: "Atul Sinha",
    role: "CO-FOUNDER",
    pillar: "MARCOMM",
    bio: "He leads our digital growth strategy, focusing on measurable performance and scalable acquisition.",
    is_active: true,
    photo_url: atul,
    email: "atul@macrowdigital.com",
    linkedin_url: "https://www.linkedin.com/in/atulsinhaa/"
  },
  {
    id: "2",
    name: "Lakshman Sharma",
    role: "Mentor & Strategic Advisor",
    pillar: "TECHNOLOGY",
    bio: "He oversees our automation and AI solutions, ensuring they fit seamlessly into existing ops.",
    is_active: true,
    photo_url: lakshman,
    email: "lakshman@macrowdigital.com",
    linkedin_url: "https://www.linkedin.com/in/lakshman-sharma/"
  },
  {
    id: "3",
    name: "Honey Sinha",
    role: "DIRECTOR, LEAD STRATEGIST",
    pillar: "DIGITAL",
    bio: "She brings 9+ years of experience aligning brand narrative with business objectives.",
    is_active: true,
    photo_url: honey,
    email: "honey@macrowdigital.com",
    linkedin_url: "https://www.linkedin.com/in/the-honey-sinha/"
  },
  {
    id: "4",
    name: "Gajendra Singh",
    role: "Sales & Client Relations Lead",
    pillar: "Sales",
    bio: "He brings 9+ years of experience aligning brand narrative with business objectives.",
    is_active: true,
    photo_url: gajendra,
    // email: "gajendra@macrowdigital.com"
  },
  {
    id: "5",
    name: "Chitranshi Chouhan",
    role: "Content & Creative Associate",
    pillar: "Content & Creative",
    bio: "She brings 9+ years of experience aligning brand narrative with business objectives.",
    is_active: true,
    photo_url: chitranshi,
    // email: "chitranshi@macrowdigital.com"
  }, {
    id: "6",
    name: "Shilpa Shingavi",
    role: "Lead Content Writer",
    pillar: "Content & Creative",
    bio: "She brings 9+ years of experience aligning brand narrative with business objectives.",
    is_active: true,
    photo_url: shilpa,
    // email: "shilpa@macrowdigital.com"
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
              {/* {m.pillar && (
                <p className="text-[10px] font-bold tracking-[0.15em] text-white/80 uppercase mb-4">
                  {m.pillar}
                </p>
              )} */}
              <h3 className="text-2xl font-serif font-medium text-white">{m.name}</h3>
              <p className="text-[11px] uppercase tracking-wider text-white/80 mt-2 mb-2">
                {m.role}
              </p>
              {/* {m.bio && (
                <p className="text-sm leading-relaxed text-white/90">{m.bio}</p>
              )} */}
              <div className="mt-auto pt-4 flex items-center gap-4">
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${m.name} on Email`}
                    className="inline-flex items-center text-white hover:text-white/80 transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                )}
                {m.linkedin_url && (
                  <a
                    href={m.linkedin_url}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${m.name} on LinkedIn`}
                    className="inline-flex items-center text-white hover:opacity-80 transition-opacity"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
