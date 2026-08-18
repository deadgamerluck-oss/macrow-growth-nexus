CREATE TYPE public.app_role AS ENUM ('admin','editor','user');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile" ON public.profiles FOR ALL TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  pillar text,
  bio text,
  photo_url text,
  linkedin_url text,
  sort_order int NOT NULL DEFAULT 100,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read active team" ON public.team_members FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage team" ON public.team_members FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER team_members_updated BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL DEFAULT 'Insight',
  excerpt text,
  body text NOT NULL DEFAULT '',
  cover_image_url text,
  reading_time text,
  author_name text,
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage posts" ON public.blog_posts FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER blog_posts_updated BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.career_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  department text NOT NULL DEFAULT 'General',
  location text NOT NULL DEFAULT 'Remote',
  work_type text NOT NULL DEFAULT 'Remote',
  employment_type text NOT NULL DEFAULT 'Full-time',
  summary text,
  responsibilities text,
  requirements text,
  apply_email text NOT NULL DEFAULT 'careers@macrow.com',
  is_published boolean NOT NULL DEFAULT false,
  posted_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.career_openings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.career_openings TO authenticated;
GRANT ALL ON public.career_openings TO service_role;
ALTER TABLE public.career_openings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published openings" ON public.career_openings FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage openings" ON public.career_openings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER career_openings_updated BEFORE UPDATE ON public.career_openings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.consultation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  stage text,
  goal text,
  message text,
  source text NOT NULL DEFAULT 'popup',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.consultation_requests TO anon, authenticated;
GRANT SELECT, DELETE ON public.consultation_requests TO authenticated;
GRANT ALL ON public.consultation_requests TO service_role;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit" ON public.consultation_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "admins read requests" ON public.consultation_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins delete requests" ON public.consultation_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

INSERT INTO public.team_members (name, role, pillar, bio, photo_url, sort_order) VALUES
('Arun Malhotra','Founder & Managing Partner','Strategy','Twenty years shaping growth systems for startups and global enterprises. Believes observation always precedes investment.','/__l5e/assets-v1/65cc608b-0f08-42b2-9ea9-3bf6be193c2b/team-1.jpg',10),
('Nadia Rahman','Partner, Marcomm','Marcomm','Brand and communication strategist. Builds narratives that survive contact with the market.','/__l5e/assets-v1/726921ca-5b97-4852-ab41-ac06dbb3ad97/team-2.jpg',20),
('Daniel Okoye','Partner, Digital Growth','Digital','Performance and lifecycle marketing lead. Obsessed with unit economics and compounding channels.','/__l5e/assets-v1/7b85b68f-8e25-4f84-888d-0d67c4e6386b/team-3.jpg',30),
('Mei Chen','Partner, Technology','Technology','Platform and data architect. Turns strategy into systems that scale without rework.','/__l5e/assets-v1/35acee8f-5977-4f02-83e9-28f48c9d0eba/team-4.jpg',40);

INSERT INTO public.blog_posts (title, slug, category, excerpt, body, cover_image_url, reading_time, author_name, is_published, published_at) VALUES
('Why growth leaks between vendors','why-growth-leaks-between-vendors','Strategy','Most companies do not have a marketing problem. They have a coordination problem.','Most companies buy marketing, communication and technology from three different places, at three different times, with three different definitions of success.

The result is predictable: the campaign drives traffic to a product experience nobody stress-tested, the brand promise is not reflected in onboarding, and the data needed to judge any of it lives in a tool nobody owns.

## What to do instead

Start with one strategic view. Define the outcome, then decide which of the three pillars moves it first. Sequence, do not stack.

## The test

If you cannot draw the path from a campaign impression to a retained customer on one page, the gaps are where your growth is leaking.','/__l5e/assets-v1/5cbe3d7c-a8fc-49e3-9826-aa087f8f9d82/insight-cover.jpg','5 min read','Arun Malhotra',true, now()),
('Observation before investment','observation-before-investment','Growth','A short field guide to spending nothing until you understand the system you are in.','Every growth budget contains a hidden line item: the cost of acting before understanding.

## Three questions before any spend

1. What evidence do we have that this channel reaches the buyer, not the market?
2. What happens after the click, and who owns it?
3. How will we know within 30 days whether we were wrong?

## Why it compounds

Evidence accumulates. Opinions do not. A team that measures early gets sharper every cycle; a team that spends early only gets more confident.','/__l5e/assets-v1/5cbe3d7c-a8fc-49e3-9826-aa087f8f9d82/insight-cover.jpg','4 min read','Nadia Rahman',true, now());

INSERT INTO public.career_openings (title, slug, department, location, work_type, employment_type, summary, responsibilities, requirements, is_published) VALUES
('Senior Performance Marketing Manager','senior-performance-marketing-manager','Digital','Dubai, UAE','Hybrid','Full-time','Own paid acquisition across search, social and marketplaces for global clients.','Plan and run multi-market paid campaigns
Own CAC, ROAS and payback targets
Partner with analytics on attribution and incrementality
Mentor two junior specialists','5+ years in performance marketing
Hands-on with Google, Meta and LinkedIn Ads
Strong analytical and reporting skills
Agency or multi-client experience preferred',true),
('Brand & Communication Strategist','brand-communication-strategist','Marcomm','London, UK','Remote','Full-time','Shape positioning, messaging and communication systems for startups and enterprises.','Lead brand and messaging workshops
Write positioning and narrative frameworks
Guide creative and PR execution
Translate strategy into launch plans','4+ years in brand strategy or comms consulting
Exceptional written English
Experience across B2B and consumer categories',true),
('Full-Stack Engineer (Platform)','full-stack-engineer-platform','Technology','Remote — Global','Remote','Full-time','Build client platforms, data pipelines and internal growth tooling.','Ship production features end to end
Design pragmatic data models and APIs
Improve performance, accessibility and observability','3+ years with TypeScript and React
Comfortable with Postgres and serverless backends
Product-minded, low ego, high ownership',true);