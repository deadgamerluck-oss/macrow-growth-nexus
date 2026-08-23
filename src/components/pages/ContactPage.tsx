import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { ContactForm } from "@/components/site/ContactForm";
import { NeedFinder } from "@/components/site/NeedFinder";
import { PageHero, Section, SectionHeading } from "@/components/site/Primitives";

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build what's next."
        intro="Tell us where your business is and what you're trying to achieve. We'll come back with a considered view — not a template proposal."
      />

      <Section>
        <ContactForm />
      </Section>

      <Section tone="muted" id="discovery">
        <SectionHeading
          eyebrow="Discovery tool"
          title="Not sure what you need?"
          intro="A short guided consultation. No email required to see the recommendation."
        />
        <NeedFinder />
      </Section>
    </>
  );
}
