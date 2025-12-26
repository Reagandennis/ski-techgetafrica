# Supabase Integration Setup Guide

This guide will help you complete the Supabase integration for authentication, blog posts, and courses.

## Prerequisites

- Supabase account (https://supabase.com)
- Project with credentials in `.env` file:
  - `PUBLIC_SUPABASE_URL`
  - `PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

## Setup Steps

### 1. Create Database Schema

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase-schema.sql`
4. Click **Run** to execute the SQL

This will create:
- `profiles` table (user profiles extending auth.users)
- `blog_posts` table (all blog content)
- `courses` table (course catalog)
- Row Level Security (RLS) policies
- Automatic triggers for profile creation and timestamps

### 2. Seed Sample Data (Optional)

1. In the **SQL Editor**, copy and paste `supabase-seed.sql`
2. Click **Run** to insert sample blog posts

This adds 5 sample blog posts for testing. You can skip this if you'll add content manually.

### 3. Configure Email Authentication (Optional but Recommended)

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider if not already enabled
3. Configure email templates under **Email Templates**
4. For production, set up a custom SMTP provider in **Settings** → **Auth**

### 4. Test the Integration

Start your development server:

```bash
npm run dev
```

Test the following:

#### Authentication
- Visit `/auth/signup` and create a test account
- Check your email for confirmation (if enabled)
- Sign in at `/auth/signin`
- Verify session persistence on page refresh

#### Blog Posts
- Visit `/blog` to see posts fetched from Supabase
- Test search and filter functionality
- Click on a post to view the detail page
- Verify related posts are displayed

### 5. Verify Database Inserts

After signing up, check your Supabase dashboard:

1. Go to **Table Editor** → **profiles**
2. You should see your new profile entry
3. The trigger should have auto-created it from auth.users

## What's Been Integrated

### ✅ Authentication
- **Supabase Auth SDK** integrated in `src/lib/stores/auth.ts`
- **Sign in page** (`/auth/signin`) using `authService.signIn()`
- **Sign up page** (`/auth/signup`) using `authService.signUp()`
- **Session management** with reactive stores
- **Automatic profile creation** via database trigger

### ✅ Blog System
- **Server-side data loading** in `src/routes/blog/+page.server.ts`
- **Individual post loading** in `src/routes/blog/[slug]/+page.server.ts`
- **Dynamic sitemap** fetching from Supabase in `src/routes/blog/sitemap.xml/+server.ts`
- **Search and filtering** with reactive client-side filtering
- **Related posts** based on category

### ⏳ Courses (To Be Implemented)

The courses table is created but not yet integrated. You can add courses manually via Supabase dashboard or create server load functions similar to the blog implementation.

## Database Schema Overview

### profiles
- `id` (UUID, references auth.users)
- `email`, `first_name`, `last_name`, `avatar_url`
- Auto-created when user signs up

### blog_posts
- `slug`, `title`, `excerpt`, `content`
- `author_id`, `author_name`, `author_image`
- `published_date`, `updated_date`, `read_time`
- `cover_image`, `tags[]`, `category`
- `seo_title`, `seo_description`, `published`

### courses
- `slug`, `title`, `description`
- `organization_name`, `organization_logo`
- `certification_type`, `difficulty`, `duration`
- `rating`, `rating_count`, `enrollment_count`
- `price`, `original_price`
- `image_url`, `published`

## Row Level Security (RLS) Policies

All tables have RLS enabled with the following policies:

- **Public read access** for published content
- **Authenticated write access** for creating content
- **Author-only updates** for blog posts
- **Profile self-management** for user profiles

## Next Steps

1. **Run the schema SQL** in Supabase SQL Editor
2. **Optionally seed sample data** for testing
3. **Test signup/signin** functionality
4. **Create your first blog post** in the Supabase dashboard
5. **Implement courses integration** (similar to blog)

## Troubleshooting

### "Invalid API key" errors
- Verify your `.env` file has the correct Supabase credentials
- Ensure environment variables are prefixed with `PUBLIC_`
- Restart your dev server after changing `.env`

### Email confirmation required
- Check Supabase **Authentication** → **Settings**
- Disable "Confirm email" if you want instant signups for development
- Re-enable for production

### Posts not appearing
- Verify `published` field is set to `true` in blog_posts table
- Check browser console for Supabase errors
- Ensure RLS policies allow public read access

### Session not persisting
- Check browser localStorage for Supabase auth tokens
- Verify `supabase.auth.onAuthStateChange()` is running
- Look for errors in browser console

## Production Checklist

Before deploying to production:

- [ ] Set up custom SMTP for emails
- [ ] Enable email confirmation
- [ ] Review and test RLS policies
- [ ] Add database backups
- [ ] Set up monitoring and alerts
- [ ] Configure rate limiting
- [ ] Add proper error handling
- [ ] Test all auth flows
- [ ] Verify CORS settings
- [ ] Update sitemap URL in robots.txt

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
