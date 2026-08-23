import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  body: string;
  cover_image_url: string | null;
  reading_time: string | null;
  author_name: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
};

export type CareerOpening = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  work_type: string;
  employment_type: string;
  summary: string | null;
  responsibilities: string | null;
  requirements: string | null;
  apply_email: string;
  is_published: boolean;
  posted_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  pillar: string | null;
  bio: string | null;
  photo_url: string | null;
  linkedin_url: string | null;
  sort_order: number;
  is_active: boolean;
};

export type ConsultationRequest = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  stage: string | null;
  goal: string | null;
  message: string | null;
  source: string;
  created_at: string;
};

function unwrap<T>({ data, error }: { data: T | null; error: { message: string } | null }): T {
  if (error) throw new Error(error.message);
  return (data ?? []) as T;
}

export const publishedPostsQuery = {
  queryKey: ["blog_posts", "published"],
  queryFn: async () =>
    unwrap<BlogPost[]>(
      (await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false })) as never,
    ),
};

export const allPostsQuery = {
  queryKey: ["blog_posts", "all"],
  queryFn: async () =>
    unwrap<BlogPost[]>(
      (await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false })) as never,
    ),
};

export const publishedOpeningsQuery = {
  queryKey: ["career_openings", "published"],
  queryFn: async () =>
    unwrap<CareerOpening[]>(
      (await supabase
        .from("career_openings")
        .select("*")
        .eq("is_published", true)
        .order("posted_at", { ascending: false })) as never,
    ),
};

export const allOpeningsQuery = {
  queryKey: ["career_openings", "all"],
  queryFn: async () =>
    unwrap<CareerOpening[]>(
      (await supabase
        .from("career_openings")
        .select("*")
        .order("created_at", { ascending: false })) as never,
    ),
};

export const teamQuery = {
  queryKey: ["team_members"],
  queryFn: async () =>
    unwrap<TeamMember[]>(
      (await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true })) as never,
    ),
};

export const leadsQuery = {
  queryKey: ["consultation_requests"],
  queryFn: async () =>
    unwrap<ConsultationRequest[]>(
      (await supabase
        .from("consultation_requests")
        .select("*")
        .order("created_at", { ascending: false })) as never,
    ),
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
