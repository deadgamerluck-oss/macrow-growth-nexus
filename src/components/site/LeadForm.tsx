import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/lib/leads.functions";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  company: z.string().trim().max(120).optional(),
  need: z.string().trim().max(120).optional(),
  description: z.string().trim().max(2000).optional(),
});

export function LeadForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the highlighted fields.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await submitLead({ ...parsed.data, source: "homepage" });
      form.reset();
      toast.success("Enquiry sent.", {
        description: "We'll be in touch within one business day.",
      });
    } catch (err) {
      toast.error("Something went wrong.", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="card-elevate p-6 lg:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors["name"]} required />
        <Field
          label="Work Email"
          name="email"
          type="email"
          error={errors["email"]}
          required
        />
        <Field label="Company" name="company" />
        <Field label="What do you need help with?" name="need" placeholder="In one line" />
        <div className="sm:col-span-2">
          <Label htmlFor="description">Project description</Label>
          <Textarea
            id="description"
            name="description"
            rows={4}
            className="mt-2"
            placeholder="What's happening now, and what would a good outcome look like?"
            aria-invalid={Boolean(errors["description"])}
          />
          {errors["description"] && (
            <p className="mt-1.5 text-xs text-destructive">{errors["description"]}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-7 rounded-full px-7"
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Send Enquiry"}
      </Button>
      <p className="mt-3 text-xs text-muted-foreground">
        We read every submission and reply personally — no automated sales sequence.
      </p>
    </form>
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
  error?: string;
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
