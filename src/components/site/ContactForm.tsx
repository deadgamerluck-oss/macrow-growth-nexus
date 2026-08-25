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

const inputClass =
  "h-11 w-full rounded-none border border-accent bg-transparent px-3 text-[13px] text-slate-900 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-slate-400";

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
    <div className="w-full">
      {success ? (
        <div className="bg-[#f4f4f4] p-12 lg:p-16 w-full flex flex-col items-center justify-center text-center space-y-4 rounded-none shadow-xl min-h-[400px]">
          <h3 className="text-3xl font-serif text-slate-900 font-bold">
            Thank you for choosing MACROW.
          </h3>
          <p className="text-slate-500">We will contact you shortly.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="bg-[#f4f4f4] p-8 lg:p-12 w-full rounded-none shadow-xl">
          <div className="grid gap-6 sm:grid-cols-2">
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
              <Label htmlFor="stage" className="text-[12px] font-bold text-slate-500 mb-2 block">
                Business Stage
              </Label>
              <select id="stage" name="stage" className={inputClass}>
                <option>Starting from zero</option>
                <option>Startup</option>
                <option>Growing business</option>
                <option>Scaling internationally</option>
                <option>Established enterprise</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="service" className="text-[12px] font-bold text-slate-500 mb-2 block">
                Service focus
              </Label>
              <select id="service" name="service" className={inputClass}>
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
            
            <div className="sm:col-span-1">
              <Field
                label="Budget Range"
                name="budget"
                placeholder="e.g. $5,000 - $10,000"
                error={errors["budget"]}
                required
              />
            </div>
            <div className="hidden sm:block" />

            <div className="sm:col-span-1">
              <Field 
                label="What do you need help with?" 
                name="need" 
                placeholder="In one line" 
              />
            </div>
            <div className="hidden sm:block" />

            <div className="sm:col-span-2">
              <Label htmlFor="description" className="text-[12px] font-bold text-slate-500 mb-2 block">
                Project Description <span className="text-accent">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                className={`${inputClass} h-auto py-3 resize-y`}
                aria-invalid={Boolean(errors["description"])}
              />
              {errors["description"] && (
                <p className="mt-1.5 text-xs text-destructive">{errors["description"]}</p>
              )}
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center bg-accent text-white px-8 py-3 text-[14px] font-medium hover:bg-accent/90 transition-colors rounded-none disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Start a conversation"}
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
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
      <Label htmlFor={name} className="text-[12px] font-bold text-slate-500 mb-2 block">
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={inputClass}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
