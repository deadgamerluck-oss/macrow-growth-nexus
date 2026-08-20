import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { claimFirstAdmin } from "@/lib/admin.functions";
import {
  allOpeningsQuery,
  allPostsQuery,
  leadsQuery,
  slugify,
  teamQuery,
  type BlogPost,
  type CareerOpening,
  type TeamMember,
} from "@/lib/content";
import { useAuth, useIsAdmin } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Content Studio — MACROW Admin" },
      {
        name: "description",
        content: "Publish insights, manage career openings and update the MACROW team.",
      },
      { property: "og:title", content: "MACROW Content Studio" },
      { property: "og:description", content: "Internal content management for MACROW." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const isAdmin = useIsAdmin(user);
  const claim = useServerFn(claimFirstAdmin);
  const [claiming, setClaiming] = useState(false);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (loading || isAdmin === null) {
    return <div className="container-macrow py-24 text-sm text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="container-macrow py-24">
        <div className="card-elevate mx-auto max-w-lg p-8 text-center">
          <ShieldCheck className="mx-auto h-6 w-6 text-accent" />
          <h1 className="mt-4 text-xl font-semibold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're signed in as {user?.email}, but this account isn't an administrator yet. If
            you're setting the site up for the first time, you can claim the first admin seat.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              className="rounded-full"
              disabled={claiming}
              onClick={async () => {
                setClaiming(true);
                try {
                  const res = await claim();
                  if (res.granted) {
                    toast.success("You're now an administrator.");
                    window.location.reload();
                  } else {
                    toast.error(res.reason ?? "Could not grant access.");
                  }
                } catch {
                  toast.error("Could not grant access.");
                } finally {
                  setClaiming(false);
                }
              }}
            >
              {claiming ? "Checking…" : "Claim first admin seat"}
            </Button>
            <Button variant="outline" className="rounded-full" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-macrow py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Content studio</p>
          <h1 className="mt-2 text-3xl font-semibold">Manage the site</h1>
          <p className="mt-2 text-sm text-muted-foreground">Signed in as {user?.email}</p>
        </div>
        <Button variant="outline" className="rounded-full" onClick={signOut}>
          Sign out
        </Button>
      </div>

      <Tabs defaultValue="posts" className="mt-10">
        <TabsList>
          <TabsTrigger value="posts">Blog</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="leads">Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-8">
          <PostsPanel />
        </TabsContent>
        <TabsContent value="careers" className="mt-8">
          <CareersPanel />
        </TabsContent>
        <TabsContent value="team" className="mt-8">
          <TeamPanel />
        </TabsContent>
        <TabsContent value="leads" className="mt-8">
          <LeadsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function useCrud(table: "blog_posts" | "career_openings" | "team_members", keys: string[]) {
  const qc = useQueryClient();
  const invalidate = () => keys.forEach((k) => qc.invalidateQueries({ queryKey: [k] }));

  const save = useMutation({
    mutationFn: async ({ id, values }: { id?: string | undefined; values: Record<string, unknown> }) => {
      const query = id
        ? supabase.from(table).update(values as never).eq("id", id)
        : supabase.from(table).insert(values as never);
      const { error } = await query;
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Saved.");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Deleted.");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return { save, remove };
}

function PanelShell({
  title,
  form,
  children,
}: {
  title: string;
  form: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="card-elevate h-fit p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-5">{form}</div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function PostsPanel() {
  const { data } = useQuery(allPostsQuery);
  const { save, remove } = useCrud("blog_posts", ["blog_posts"]);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    const isPublished = f.get("is_published") === "on";
    const values = {
      title,
      slug: String(f.get("slug") ?? "").trim() || slugify(title),
      category: String(f.get("category") ?? "Insight").trim() || "Insight",
      excerpt: String(f.get("excerpt") ?? "").trim() || null,
      body: String(f.get("body") ?? ""),
      cover_image_url: String(f.get("cover_image_url") ?? "").trim() || null,
      reading_time: String(f.get("reading_time") ?? "").trim() || null,
      author_name: String(f.get("author_name") ?? "").trim() || null,
      is_published: isPublished,
      published_at: isPublished ? (editing?.published_at ?? new Date().toISOString()) : null,
    };
    save.mutate(
      { id: editing?.id, values },
      {
        onSuccess: () => {
          setEditing(null);
          e.currentTarget?.reset?.();
        },
      },
    );
  }

  return (
    <PanelShell
      title={editing ? `Edit: ${editing.title}` : "New blog post"}
      form={
        <form onSubmit={submit} className="space-y-4" key={editing?.id ?? "new"}>
          <Field label="Title" name="title" defaultValue={editing?.title} required />
          <Field label="Slug (optional)" name="slug" defaultValue={editing?.slug} />
          <Field
            label="Category"
            name="category"
            defaultValue={editing?.category ?? "Insight"}
          />
          <Field label="Author" name="author_name" defaultValue={editing?.author_name ?? ""} />
          <Field
            label="Reading time"
            name="reading_time"
            defaultValue={editing?.reading_time ?? ""}
            placeholder="5 min read"
          />
          <Field
            label="Cover image URL"
            name="cover_image_url"
            defaultValue={editing?.cover_image_url ?? ""}
            placeholder="https://…"
          />
          <AreaField label="Excerpt" name="excerpt" rows={2} defaultValue={editing?.excerpt ?? ""} />
          <AreaField
            label="Body (Markdown-ish: ## for headings)"
            name="body"
            rows={10}
            defaultValue={editing?.body ?? ""}
          />
          <div className="flex items-center gap-3">
            <Switch id="post-pub" name="is_published" defaultChecked={editing?.is_published ?? false} />
            <Label htmlFor="post-pub">Published</Label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="rounded-full" disabled={save.isPending}>
              {editing ? "Update post" : "Create post"}
            </Button>
            {editing && (
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      }
    >
      {(data ?? []).map((p) => (
        <Row
          key={p.id}
          title={p.title}
          meta={`${p.category} · ${p.is_published ? "Published" : "Draft"}`}
          onEdit={() => setEditing(p)}
          onDelete={() => remove.mutate(p.id)}
        />
      ))}
    </PanelShell>
  );
}

function CareersPanel() {
  const { data } = useQuery(allOpeningsQuery);
  const { save, remove } = useCrud("career_openings", ["career_openings"]);
  const [editing, setEditing] = useState<CareerOpening | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    save.mutate(
      {
        id: editing?.id,
        values: {
          title,
          slug: String(f.get("slug") ?? "").trim() || slugify(title),
          department: String(f.get("department") ?? "General").trim() || "General",
          location: String(f.get("location") ?? "Remote").trim() || "Remote",
          work_type: String(f.get("work_type") ?? "Remote").trim() || "Remote",
          employment_type: String(f.get("employment_type") ?? "Full-time").trim() || "Full-time",
          summary: String(f.get("summary") ?? "").trim() || null,
          responsibilities: String(f.get("responsibilities") ?? "").trim() || null,
          requirements: String(f.get("requirements") ?? "").trim() || null,
          apply_email: String(f.get("apply_email") ?? "careers@macrow.com").trim(),
          is_published: f.get("is_published") === "on",
        },
      },
      { onSuccess: () => setEditing(null) },
    );
  }

  return (
    <PanelShell
      title={editing ? `Edit: ${editing.title}` : "New career opening"}
      form={
        <form onSubmit={submit} className="space-y-4" key={editing?.id ?? "new"}>
          <Field label="Job title" name="title" defaultValue={editing?.title} required />
          <Field label="Slug (optional)" name="slug" defaultValue={editing?.slug} />
          <Field label="Department" name="department" defaultValue={editing?.department} />
          <Field label="Location" name="location" defaultValue={editing?.location} />
          <Field label="Work type" name="work_type" defaultValue={editing?.work_type} />
          <Field
            label="Employment type"
            name="employment_type"
            defaultValue={editing?.employment_type}
          />
          <Field
            label="Apply email"
            name="apply_email"
            defaultValue={editing?.apply_email ?? "careers@macrow.com"}
          />
          <AreaField label="Summary" name="summary" rows={2} defaultValue={editing?.summary ?? ""} />
          <AreaField
            label="Responsibilities (one per line)"
            name="responsibilities"
            rows={5}
            defaultValue={editing?.responsibilities ?? ""}
          />
          <AreaField
            label="Requirements (one per line)"
            name="requirements"
            rows={5}
            defaultValue={editing?.requirements ?? ""}
          />
          <div className="flex items-center gap-3">
            <Switch id="job-pub" name="is_published" defaultChecked={editing?.is_published ?? false} />
            <Label htmlFor="job-pub">Published</Label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="rounded-full" disabled={save.isPending}>
              {editing ? "Update opening" : "Create opening"}
            </Button>
            {editing && (
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      }
    >
      {(data ?? []).map((j) => (
        <Row
          key={j.id}
          title={j.title}
          meta={`${j.department} · ${j.location} · ${j.is_published ? "Published" : "Draft"}`}
          onEdit={() => setEditing(j)}
          onDelete={() => remove.mutate(j.id)}
        />
      ))}
    </PanelShell>
  );
}

function TeamPanel() {
  const { data } = useQuery(teamQuery);
  const { save, remove } = useCrud("team_members", ["team_members"]);
  const [editing, setEditing] = useState<TeamMember | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    save.mutate(
      {
        id: editing?.id,
        values: {
          name: String(f.get("name") ?? "").trim(),
          role: String(f.get("role") ?? "").trim(),
          pillar: String(f.get("pillar") ?? "").trim() || null,
          bio: String(f.get("bio") ?? "").trim() || null,
          photo_url: String(f.get("photo_url") ?? "").trim() || null,
          linkedin_url: String(f.get("linkedin_url") ?? "").trim() || null,
          sort_order: Number(f.get("sort_order") ?? 100) || 100,
          is_active: f.get("is_active") === "on",
        },
      },
      { onSuccess: () => setEditing(null) },
    );
  }

  return (
    <PanelShell
      title={editing ? `Edit: ${editing.name}` : "New team member"}
      form={
        <form onSubmit={submit} className="space-y-4" key={editing?.id ?? "new"}>
          <Field label="Name" name="name" defaultValue={editing?.name} required />
          <Field label="Role" name="role" defaultValue={editing?.role} required />
          <Field label="Pillar" name="pillar" defaultValue={editing?.pillar ?? ""} />
          <Field
            label="Photo URL"
            name="photo_url"
            defaultValue={editing?.photo_url ?? ""}
            placeholder="https://…"
          />
          <Field label="LinkedIn URL" name="linkedin_url" defaultValue={editing?.linkedin_url ?? ""} />
          <Field
            label="Sort order"
            name="sort_order"
            type="number"
            defaultValue={String(editing?.sort_order ?? 100)}
          />
          <AreaField label="Bio" name="bio" rows={4} defaultValue={editing?.bio ?? ""} />
          <div className="flex items-center gap-3">
            <Switch
              id="team-active"
              name="is_active"
              defaultChecked={editing ? editing.is_active : true}
            />
            <Label htmlFor="team-active">Visible on site</Label>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="rounded-full" disabled={save.isPending}>
              {editing ? "Update member" : "Add member"}
            </Button>
            {editing && (
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      }
    >
      {(data ?? []).map((m) => (
        <Row
          key={m.id}
          title={m.name}
          meta={`${m.role} · ${m.is_active ? "Visible" : "Hidden"}`}
          onEdit={() => setEditing(m)}
          onDelete={() => remove.mutate(m.id)}
        />
      ))}
    </PanelShell>
  );
}

function LeadsPanel() {
  const { data } = useQuery(leadsQuery);
  const qc = useQueryClient();

  async function del(id: string) {
    const { error } = await supabase.from("consultation_requests").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({ queryKey: ["consultation_requests"] });
  }

  if (!data || data.length === 0) {
    return <p className="text-sm text-muted-foreground">No consultation requests yet.</p>;
  }

  return (
    <div className="space-y-3">
      {data.map((l) => (
        <div key={l.id} className="card-elevate p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold">
                {l.name} · <span className="font-normal text-muted-foreground">{l.email}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {[l.company, l.stage, l.source].filter(Boolean).join(" · ")} ·{" "}
                {new Date(l.created_at).toLocaleString()}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => del(l.id)} aria-label="Delete request">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {(l.goal || l.message) && (
            <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">
              {l.goal ?? l.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  type?: string | undefined;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={`f-${name}`}>{label}</Label>
      <Input
        id={`f-${name}`}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function AreaField({
  label,
  name,
  rows,
  defaultValue,
}: {
  label: string;
  name: string;
  rows: number;
  defaultValue?: string | undefined;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={`f-${name}`}>{label}</Label>
      <Textarea id={`f-${name}`} name={name} rows={rows} defaultValue={defaultValue} />
    </div>
  );
}

function Row({
  title,
  meta,
  onEdit,
  onDelete,
}: {
  title: string;
  meta: string;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="card-elevate flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{meta}</p>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button variant="outline" size="sm" className="rounded-full" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete} aria-label={`Delete ${title}`}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}