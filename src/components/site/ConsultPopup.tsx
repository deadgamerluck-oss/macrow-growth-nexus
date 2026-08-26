import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const SEEN_KEY = "macrow_consult_popup_seen";

export function ConsultPopup() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(SEEN_KEY)) return;

    const show = () => {
      window.localStorage.setItem(SEEN_KEY, "1");
      setOpen(true);
    };
    
    show();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      company: String(form.get("company") ?? "").trim() || null,
      goal: String(form.get("goal") ?? "").trim() || null,
      source: "popup",
    };
    if (!payload.name || !payload.email) {
      toast.error("Please add your name and email.");
      return;
    }
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
        name: payload.name,
        email: payload.email,
        mobile: "",
        company: payload.company || "",
        country: "",
        website: "",
        business_stage: "",
        service_focus: "",
        budget: "",
        help: "Popup Consultation Request",
        message: payload.goal || "",
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
        setDone(true);
        toast.success("Request received — we'll be in touch within one business day.");
      } else {
        toast.error("We couldn't send that. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink/70" onClick={() => setOpen(false)} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Free growth consultation"
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-elevate)]"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="surface-ink px-7 py-6">
              <p className="eyebrow">Free 30-minute session</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink-foreground">
                Get a growth consultation, not a sales call.
              </h2>
              <p className="mt-2 text-sm text-ink-foreground/70">
                Tell us where you are. We'll tell you what we'd do first — and what we'd skip.
              </p>
            </div>

            {done ? (
              <div className="px-7 py-10 text-center">
                <h3 className="text-lg font-semibold">Thank you.</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your request is with our strategy team. Expect a reply within one business day.
                </p>
                <Button className="mt-6 rounded-full" onClick={() => setOpen(false)}>
                  Continue exploring
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4 px-7 py-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="popup-name">Name</Label>
                    <Input id="popup-name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="popup-email">Work email</Label>
                    <Input
                      id="popup-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="popup-company">Company</Label>
                  <Input id="popup-company" name="company" placeholder="Company name" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="popup-goal">What are you trying to reach?</Label>
                  <Textarea
                    id="popup-goal"
                    name="goal"
                    rows={3}
                    placeholder="More qualified leads, a rebrand, a platform rebuild…"
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full rounded-full">
                  {submitting ? "Sending…" : "Request my consultation"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  No spam. No obligation. One reply from a strategist.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
