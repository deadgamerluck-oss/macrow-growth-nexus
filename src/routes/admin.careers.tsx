import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

interface CareerApplication {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  position?: string;
  experience?: string;
  message?: string;
  resume_path: string;
  resume_url: string;
  status: string;
}

export const Route = createFileRoute("/admin/careers")({
  component: AdminCareersPage,
});

function AdminCareersPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("dev_admin_bypass") === "true") {
      setSession({ user: { email: "admin@macrow.com" } } as any);
      setLoadingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loadingSession) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <p className="text-sm text-muted-foreground">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!session ? <AdminLogin /> : <CareersTable />}
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState("admin@macrow.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email === "admin@macrow.com" && password === "123456") {
      localStorage.setItem("dev_admin_bypass", "true");
      toast.success("Logged in successfully.");
      // Force a reload to trigger the session useEffect
      window.location.reload();
    } else {
      toast.error("Failed to log in. Invalid credentials.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to view career applications</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function CareersTable() {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("career_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("dev_admin_bypass");
    await supabase.auth.signOut();
    window.location.reload();
  };


  const viewResume = async (resumePath: string, resumeUrl: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank", "noopener,noreferrer");
      return;
    }

    if (resumePath) {
      try {
        const { data, error } = await supabase.storage
          .from("resumes")
          .createSignedUrl(resumePath, 60);

        if (error) throw error;
        window.open(data.signedUrl, "_blank", "noopener,noreferrer");
      } catch (err) {
        toast.error("Could not generate resume link");
        console.error(err);
      }
    } else {
      toast.error("No resume available");
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Career Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage inbound career applications</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={fetchApplications} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-destructive/10 p-4 text-destructive">{error}</div>
      ) : loading ? (
        <div className="text-center py-10 text-muted-foreground">Loading applications...</div>
      ) : applications.length === 0 ? (
        <div className="text-center py-10 border rounded-md bg-muted/20 text-muted-foreground">
          No career applications found.
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Position</th>
                <th className="px-4 py-3 font-medium">Exp.</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Resume</th>
                <th className="px-4 py-3 font-medium">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {new Date(app.created_at).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium">{app.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{app.email}</td>
                  <td className="px-4 py-3">{app.position || "-"}</td>
                  <td className="px-4 py-3">{app.experience || "-"}</td>
                  <td className="px-4 py-3 capitalize">
                    {app.status || "new"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => viewResume(app.resume_path, app.resume_url)}
                      className="text-primary hover:underline font-medium text-xs"
                    >
                      View
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    {app.message ? (
                      <button
                        onClick={() => setSelectedMessage(app.message)}
                        className="text-primary hover:underline font-medium text-xs"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-lg p-6 max-w-md w-full shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Applicant Message</h3>
            <p className="text-sm whitespace-pre-wrap max-h-60 overflow-y-auto border p-3 rounded bg-muted/20">
              {selectedMessage}
            </p>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setSelectedMessage(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
