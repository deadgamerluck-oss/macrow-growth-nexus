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

export function ContactPage() {
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
              <p className="eyebrow">Not sure what you need?</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Answer five questions and we'll outline a starting combination of capabilities.
              </p>
              <Link
                to="/contact"
                hash="discovery"
                className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
              >
                I'm not sure what I need →
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

