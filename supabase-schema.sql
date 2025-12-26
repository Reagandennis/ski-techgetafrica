-- Supabase Database Schema for Techgetafrica
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to get a claim from the JWT
CREATE OR REPLACE FUNCTION get_my_claim(claim TEXT) RETURNS JSONB AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb->claim, null)
$$ LANGUAGE SQL STABLE;

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN get_my_claim('role')::text = '"admin"';
END;
$$ LANGUAGE plpgsql;

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  author_image TEXT,
  published_date TIMESTAMPTZ DEFAULT NOW(),
  updated_date TIMESTAMPTZ,
  read_time INTEGER DEFAULT 5,
  cover_image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog posts policies
DROP POLICY IF EXISTS "Published blog posts are viewable by everyone" ON public.blog_posts;
CREATE POLICY "Published blog posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Admins can manage all blog posts" ON public.blog_posts;
CREATE POLICY "Admins can manage all blog posts"
  ON public.blog_posts FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "Authors can insert their own blog posts" ON public.blog_posts;
CREATE POLICY "Authors can insert their own blog posts"
    ON public.blog_posts FOR INSERT
    WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can update their own blog posts" ON public.blog_posts;
CREATE POLICY "Authors can update their own blog posts"
  ON public.blog_posts FOR UPDATE
  USING (auth.uid() = author_id);

DROP POLICY IF EXISTS "Authors can delete their own blog posts" ON public.blog_posts;
CREATE POLICY "Authors can delete their own blog posts"
  ON public.blog_posts FOR DELETE
  USING (auth.uid() = author_id);

-- Courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  organization_name TEXT NOT NULL,
  organization_logo TEXT,
  certification_type TEXT NOT NULL CHECK (certification_type IN ('Professional Certificate', 'Specialization', 'Course')),
  rating DECIMAL(2,1) DEFAULT 0.0,
  rating_count INTEGER DEFAULT 0,
  enrollment_count INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  price DECIMAL(10,2) DEFAULT 0.00,
  original_price DECIMAL(10,2),
  currency TEXT DEFAULT 'KES',
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  duration TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Courses policies
DROP POLICY IF EXISTS "Published courses are viewable by everyone" ON public.courses;
CREATE POLICY "Published courses are viewable by everyone"
  ON public.courses FOR SELECT
  USING (published = true);

DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;
CREATE POLICY "Admins can manage courses"
  ON public.courses FOR ALL
  USING (is_admin());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON public.blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON public.courses(published);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at ON public.courses;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ================================
-- Minimal Content Tables & Policies
-- ================================

-- Blogs table (simple)
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  content TEXT NOT NULL
);

-- Enable RLS for blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Policies for blogs
DROP POLICY IF EXISTS "Public read blogs" ON public.blogs;
CREATE POLICY "Public read blogs"
  ON public.blogs FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Only admin can insert blogs" ON public.blogs;
CREATE POLICY "Only admin can insert blogs"
  ON public.blogs FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'reaganenochowiti@techgetafrica.com');

DROP POLICY IF EXISTS "Only admin can update blogs" ON public.blogs;
CREATE POLICY "Only admin can update blogs"
  ON public.blogs FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'reaganenochowiti@techgetafrica.com');

DROP POLICY IF EXISTS "Only admin can delete blogs" ON public.blogs;
CREATE POLICY "Only admin can delete blogs"
  ON public.blogs FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'reaganenochowiti@techgetafrica.com');

-- Extend existing courses schema to support simple content
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS content TEXT;

-- Replace courses policies to enforce email-based write and public read
DROP POLICY IF EXISTS "Published courses are viewable by everyone" ON public.courses;
DROP POLICY IF EXISTS "Admins can manage courses" ON public.courses;

DROP POLICY IF EXISTS "Public read courses" ON public.courses;
CREATE POLICY "Public read courses"
  ON public.courses FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Only admin can insert courses" ON public.courses;
CREATE POLICY "Only admin can insert courses"
  ON public.courses FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'reaganenochowiti@techgetafrica.com');

DROP POLICY IF EXISTS "Only admin can update courses" ON public.courses;
CREATE POLICY "Only admin can update courses"
  ON public.courses FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'reaganenochowiti@techgetafrica.com');

DROP POLICY IF EXISTS "Only admin can delete courses" ON public.courses;
CREATE POLICY "Only admin can delete courses"
  ON public.courses FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'reaganenochowiti@techgetafrica.com');
