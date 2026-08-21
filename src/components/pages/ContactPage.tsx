import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NeedFinder } from "@/components/site/NeedFinder";
import { PageHero, Section, SectionHeading } from "@/components/site/Primitives";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().max(120).optional(),
  country: z.string().trim().max(80).optional(),
  website: z.string().trim().max(200).optional(),
  stage: z.string().max(80).optional(),
  need: z.string().max(80).optional(),
  budget: z.string().max(80).optional(),
  service: z.string().max(80).optional(),
  description: z.string().trim().min(10, "Tell us a little more").max(2000),
});

const selectClass =
  "h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30";

export function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      event.currentTarget?.reset?.();
      toast.success("Thank you — your enquiry has been recorded.", {
        description: "Connect a backend to route submissions to your inbox or CRM.",
      });
    }, 600);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build what's next."
        intro="Tell us where your business is and what you're trying to achieve. We'll come back with a considered view — not a template proposal."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <form onSubmit={onSubmit} noValidate className="card-elevate p-6 lg:p-9">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" name="name" error={errors["name"]} required />
              <Field label="Work Email" name="email" type="email" error={errors["email"]} required />
              <Field label="Company" name="company" />
              <Field label="Country" name="country" />
              <Field label="Website" name="website" placeholder="https://" />
              <div>
                <Label htmlFor="stage">Business Stage</Label>
                <select id="stage" name="stage" className={`mt-2 ${selectClass}`}>
                  <option>Starting from zero</option>
                  <option>Startup</option>
                  <option>Growing business</option>
                  <option>Scaling internationally</option>
                  <option>Established enterprise</option>
                </select>
              </div>
              <div>
                <Label htmlFor="service">Service focus</Label>
                <select id="service" name="service" className={`mt-2 ${selectClass}`}>
                  <option>Digital</option>
                  <option>Marcomm</option>
                  <option>Technology</option>
                  <option>Branding</option>
                  <option>AI</option>
                  <option>Strategy</option>
                  <option>Multiple Services</option>
                  <option>Not Sure</option>
                </select>
              </div>
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <select id="budget" name="budget" className={`mt-2 ${selectClass}`}>
                  <option>Not defined yet</option>
                  <option>Under $5,000</option>
                  <option>$5,000 – $25,000</option>
                  <option>$25,000 – $100,000</option>
                  <option>$100,000+</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="need">What do you need help with?</Label>
                <Input id="need" name="need" className="mt-2 h-11" placeholder="In one line" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="description">
                  Project Description <span className="text-accent">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={5}
                  className="mt-2"
                  placeholder="What's happening now, and what would a good outcome look like?"
                  aria-invalid={Boolean(errors["description"])}
                />
                {errors["description"] && (
                  <p className="mt-1.5 text-xs text-destructive">{errors["description"]}</p>
                )}
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-8 rounded-full px-7" disabled={submitting}>
              {submitting ? "Sending…" : "Start a Conversation"}
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Demo form. Submissions are validated in the browser and not yet stored — connect a
              backend to capture leads.
            </p>
          </form>

          <aside className="space-y-8">
            <div className="card-elevate p-6">
              <p className="eyebrow">Where we are</p>
              <p className="mt-3 font-medium">Ahmedabad, Gujarat, India</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Working with businesses across markets.
              </p>
            </div>
            <div className="card-elevate p-6">
              <p className="eyebrow">Still scoping</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Use the discovery tool first — five questions, one recommended starting combination
                of capabilities.
              </p>
              <Link
                to="/solutions"
                hash="discovery"
                className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
              >
                Open the discovery tool →
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}


function Field({
  label,
  name,
  type = "text",
  error,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="mt-2 h-11"
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}