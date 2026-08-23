import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid work email").max(255),
  mobile: z.string().trim().min(1, "Mobile number is required").max(20),
  company: z.string().trim().max(120).optional(),
  country: z.string().trim().max(80).optional(),
  website: z.string().trim().max(200).optional(),
  stage: z.string().max(80).optional(),
  need: z.string().max(80).optional(),
  budget: z.string().max(80).optional(),
  service: z.string().max(80).optional(),
  description: z.string().trim().min(1, "Project description is required").max(2000),
});

const selectClass =
  "h-11 w-full rounded-md border border-input bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const serviceId = import.meta.env["VITE_EMAILJS_SERVICE_ID"];
    const templateId = import.meta.env["VITE_EMAILJS_TEMPLATE_ID"];
    const publicKey = import.meta.env["VITE_EMAILJS_PUBLIC_KEY"];

    if (!serviceId || !templateId || !publicKey) {
      toast.error("EmailJS credentials are not configured.");
      setSubmitting(false);
      return;
    }

    try {
      const templateParams = {
        name: data.name || "",
        email: data.email || "",
        mobile: data.mobile || "",
        company: data.company || "",
        country: data.country || "",
        website: data.website || "",
        business_stage: data.stage || "",
        service_focus: data.service || "",
        budget: data.budget || "",
        help: data.need || "",
        message: data.description || "",
        time: new Date().toLocaleString(),
      };

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-12 items-start w-full">
      <div className="space-y-8 w-full max-w-3xl">
        <div className="space-y-6">
          <div>
            <p className="eyebrow">Where we are</p>
            <p className="mt-3 font-medium text-foreground">Ahmedabad, Gujarat, India</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Working with businesses across markets.
            </p>
          </div>
          <div>
            <p className="eyebrow">Direct contact</p>
            <p className="mt-3 text-sm text-muted-foreground">
              <a
                href="mailto:hello@macrow.com"
                className="font-medium text-foreground hover:text-accent transition-colors"
              >
                hello@macrow.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {success ? (
        <div className="card-elevate p-12 lg:p-16 w-full flex flex-col items-center justify-center text-center space-y-4">
          <h3 className="text-3xl font-semibold text-foreground">
            Thank you for choosing MACROW Digital, we will contact you soon.
          </h3>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="card-elevate p-6 lg:p-9 w-full">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" error={errors["name"]} required />
            <Field label="Work Email" name="email" type="email" error={errors["email"]} required />
            <Field
              label="Mobile Number"
              name="mobile"
              type="tel"
              error={errors["mobile"]}
              required
            />
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
            <Field
              label="Budget Range"
              name="budget"
              placeholder="e.g. $5,000 - $10,000"
              error={errors["budget"]}
            />
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
            Submissions are routed directly to our inbox via EmailJS.
          </p>
        </form>
      )}
    </div>
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
