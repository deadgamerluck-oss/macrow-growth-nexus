import { Link } from "@tanstack/react-router";
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
  budget: z.string().min(1, "Budget range is required").max(80),
  service: z.string().max(80).optional(),
  description: z.string().trim().min(1, "Project description is required").max(2000),
});

const inputClass =
  "h-10 w-full rounded-none border border-[#ff3803] bg-white px-3 text-sm text-slate-900 outline-none transition-colors focus:ring-1 focus:ring-[#ff3803] placeholder:text-slate-400";

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
      <Label htmlFor={name} className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
        {label} {required && <span className="text-[#ff3803]">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={inputClass}
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function ContactPage() {
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
        headers: { "Content-Type": "application/json" },
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
    <div className="min-h-screen bg-[#940808] text-white pt-24 lg:pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/80 mb-6">Start the conversation</p>
          <h1 className="text-5xl lg:text-7xl font-serif text-white leading-[1.1] mb-6">
            Let's build<br />what's <span className="italic font-medium">Next.</span>
          </h1>
          <p className="text-white/80 text-[15px] leading-relaxed max-w-lg">
            Tell us where your business is and what you're trying to achieve. We'll come back with a considered view — not a template proposal.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
          {success ? (
            <div className="bg-white p-12 lg:p-16 w-full flex flex-col items-center justify-center text-center space-y-4">
              <h3 className="text-3xl font-semibold text-slate-900">
                Thank you for choosing MACROW Digital, we will contact you soon.
              </h3>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="bg-white p-8 lg:p-10 w-full shadow-2xl">
              <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors["name"]} required />
                <Field label="Work Email" name="email" type="email" error={errors["email"]} required />
                
                <Field label="Mobile Number" name="mobile" type="tel" error={errors["mobile"]} required />
                <Field label="Company" name="company" />
                
                <Field label="Country" name="country" />
                <Field label="Website" name="website" placeholder="https://" />
                
                <div>
                  <Label htmlFor="stage" className="text-[11px] font-semibold text-slate-700 mb-1.5 block">Business Stage</Label>
                  <select id="stage" name="stage" className={inputClass}>
                    <option>Starting from zero</option>
                    <option>Startup</option>
                    <option>Growing business</option>
                    <option>Scaling internationally</option>
                    <option>Established enterprise</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="service" className="text-[11px] font-semibold text-slate-700 mb-1.5 block">Service Focus</Label>
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
                
                <div>
                  <Label htmlFor="budget" className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
                    Budget Range <span className="text-[#ff3803]">*</span>
                  </Label>
                  <select id="budget" name="budget" className={inputClass}>
                    <option value="">eg. $5,000 - $10,000</option>
                    <option>Not defined yet</option>
                    <option>Under $5,000</option>
                    <option>$5,000 – $25,000</option>
                    <option>$25,000 – $100,000</option>
                    <option>$100,000+</option>
                  </select>
                  {errors["budget"] && <p className="mt-1.5 text-xs text-red-500">{errors["budget"]}</p>}
                </div>
                <div>
                  <Field label="What do you need help with?" name="need" placeholder="In one line" />
                </div>
                
                <div className="sm:col-span-2">
                  <Label htmlFor="description" className="text-[11px] font-semibold text-slate-700 mb-1.5 block">
                    Project Description <span className="text-[#ff3803]">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    className={`${inputClass} py-3 min-h-[120px] resize-y`}
                    aria-invalid={Boolean(errors["description"])}
                  />
                  {errors["description"] && (
                    <p className="mt-1.5 text-xs text-red-500">{errors["description"]}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="mt-8 w-full rounded-none bg-[#ff3803] hover:bg-[#ff3803]/90 text-white h-12 text-[15px] font-medium transition-colors" disabled={submitting}>
                {submitting ? "Sending…" : "Send"}
              </Button>
            </form>
          )}

          <aside className="bg-[#590404] p-10 h-fit text-white">
            <h3 className="text-xl font-bold mb-8">Contact Details</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-1">EMAIL</h4>
                <p className="text-[14px] text-white/90">growth@macrowdigital.com</p>
                <div className="h-px bg-white/20 mt-4" />
              </div>
              
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-1">Assessment Format</h4>
                <p className="text-[14px] text-white/90">60-90 minute strategic discussion call</p>
                <div className="h-px bg-white/20 mt-4" />
              </div>
              
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-1">Response Window</h4>
                <p className="text-[14px] text-white/90">Within 1-2 business days</p>
                <div className="h-px bg-white/20 mt-4" />
              </div>
              
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-1">Typical Engagement Start</h4>
                <p className="text-[14px] text-white/90">1-3 weeks from initial call</p>
                <div className="h-px bg-white/20 mt-4" />
              </div>
              
              <div>
                <h4 className="text-[12px] font-bold uppercase tracking-wider mb-1">Regions</h4>
                <p className="text-[14px] text-white/90">India</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

