import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Team Sign In — MACROW Content Studio" },
      {
        name: "description",
        content:
          "Sign in to the MACROW content studio to publish insights, manage career openings and update the team.",
      },
      { property: "og:title", content: "MACROW Content Studio Sign In" },
      {
        property: "og:description",
        content: "Private sign-in for the MACROW editorial and recruitment team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);

    const email = String(form.get("email"));
    const password = String(form.get("password"));

    // Hardcoded check as requested by the user
    if (email === "admin@macrow.com" && password === "123456") {
      localStorage.setItem("dev_admin_bypass", "true");
      toast.success("Logged in successfully!");
      setBusy(false);
      navigate({ to: "/admin" });
      return;
    } else {
      toast.error("Invalid login credentials.");
      setBusy(false);
    }
  }

  // Sign-up removed as per request


  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-background">
      <div className="grid-mesh pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container-macrow relative py-16">
        <div className="mx-auto w-full max-w-md">
          <p className="eyebrow">Content studio</p>
          <h1 className="mt-3 text-3xl font-semibold">Sign in to publish</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Private access for the MACROW editorial and recruitment team.
          </p>

          <div className="card-elevate mt-8 p-6">
            <form onSubmit={signIn} className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="in-email">Email</Label>
                <Input id="in-email" name="email" type="email" defaultValue="admin@macrow.com" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="in-password">Password</Label>
                <Input id="in-password" name="password" type="password" defaultValue="123456" required />
              </div>
              <Button type="submit" disabled={busy} className="w-full rounded-full">
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>

          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Looking for our work instead?{" "}
            <Link to="/" className="text-accent hover:underline">
              Return to the site
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
