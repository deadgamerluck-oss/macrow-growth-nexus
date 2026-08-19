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
    const { error } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/admin" });
  }

  async function signUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: String(form.get("email")),
      password: String(form.get("password")),
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
        data: { full_name: String(form.get("full_name") ?? "") },
      },
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. You can sign in now.");
  }

  async function google() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try email instead.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

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
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={signIn} className="mt-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="in-email">Email</Label>
                    <Input id="in-email" name="email" type="email" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="in-password">Password</Label>
                    <Input id="in-password" name="password" type="password" required />
                  </div>
                  <Button type="submit" disabled={busy} className="w-full rounded-full">
                    {busy ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={signUp} className="mt-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="up-name">Full name</Label>
                    <Input id="up-name" name="full_name" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="up-email">Email</Label>
                    <Input id="up-email" name="email" type="email" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="up-password">Password</Label>
                    <Input
                      id="up-password"
                      name="password"
                      type="password"
                      required
                      minLength={8}
                    />
                  </div>
                  <Button type="submit" disabled={busy} className="w-full rounded-full">
                    {busy ? "Creating…" : "Create account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
            </div>
            <Button variant="outline" className="w-full rounded-full" onClick={google}>
              Continue with Google
            </Button>
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