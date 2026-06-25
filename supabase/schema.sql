-- =========================================================
-- Zivox Tech — Supabase schema
-- Run this in Supabase SQL Editor (one-time setup).
-- =========================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ---------- BLOG POSTS ----------
create table if not exists public.blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  content      text not null default '',
  cover_image  text,
  category     text,
  read_time    text,
  author       text default 'Zivox Team',
  published    boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists blog_posts_published_idx on public.blog_posts (published, created_at desc);

-- ---------- PORTFOLIO ITEMS ----------
create table if not exists public.portfolio_items (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique,
  category     text,                -- web / mobile / ai / custom
  description  text,
  cover_image  text,
  link         text,
  tags         text[] default '{}',
  published    boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists portfolio_items_sort_idx on public.portfolio_items (sort_order asc, created_at desc);

-- ---------- CASE STUDIES ----------
create table if not exists public.case_studies (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  client       text,
  industry     text,
  summary      text,
  content      text default '',
  cover_image  text,
  metrics      jsonb default '[]'::jsonb,    -- e.g. [{"label":"Revenue","value":"+220%"}]
  published    boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------- SERVICES ----------
create table if not exists public.services (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text unique,
  icon         text,                 -- inline svg or icon name
  description  text,
  features     text[] default '{}',
  pricing      text,
  published    boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---------- TESTIMONIALS ----------
create table if not exists public.testimonials (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  role         text,
  company      text,
  avatar       text,
  quote        text not null,
  rating       int default 5,
  published    boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- ---------- CONTACT SUBMISSIONS ----------
create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  email        text not null,
  phone        text,
  company      text,
  service      text,
  budget       text,
  details      text,
  status       text not null default 'new',  -- new / read / replied / archived
  created_at   timestamptz not null default now()
);
create index if not exists contact_submissions_created_idx on public.contact_submissions (created_at desc);

-- ---------- BOOKING SUBMISSIONS ----------
create table if not exists public.booking_submissions (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  phone         text,
  company       text,
  meeting_date  text,            -- e.g. "June 25, 2026"
  meeting_time  text,            -- e.g. "10:00"
  notes         text,
  status        text not null default 'new',
  created_at    timestamptz not null default now()
);
create index if not exists booking_submissions_created_idx on public.booking_submissions (created_at desc);

-- ---------- ADMIN USERS ----------
create table if not exists public.admin_users (
  email         text primary key,
  full_name     text not null,
  role          text not null default 'Admin',
  avatar_url    text,
  status        text default 'Active',
  password_hash text not null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- =========================================================
-- updated_at trigger
-- =========================================================
create or replace function public.set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

do $$ declare t text;
begin
  for t in select unnest(array['blog_posts','portfolio_items','case_studies','services']) loop
    execute format('drop trigger if exists trg_%I_updated on public.%I;', t, t);
    execute format('create trigger trg_%I_updated before update on public.%I
                    for each row execute function public.set_updated_at();', t, t);
  end loop;
end $$;

-- =========================================================
-- Row Level Security
-- Public site uses ANON key (read-only on published rows).
-- Admin server actions use SERVICE_ROLE key (bypasses RLS).
-- =========================================================
alter table public.blog_posts          enable row level security;
alter table public.portfolio_items     enable row level security;
alter table public.case_studies        enable row level security;
alter table public.services            enable row level security;
alter table public.testimonials        enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.booking_submissions enable row level security;

-- Public read of published rows
drop policy if exists "public read blog"        on public.blog_posts;
create policy "public read blog"        on public.blog_posts        for select using (published = true);
drop policy if exists "public read portfolio"   on public.portfolio_items;
create policy "public read portfolio"   on public.portfolio_items   for select using (published = true);
drop policy if exists "public read cases"       on public.case_studies;
create policy "public read cases"       on public.case_studies      for select using (published = true);
drop policy if exists "public read services"    on public.services;
create policy "public read services"    on public.services          for select using (published = true);
drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials     for select using (published = true);

-- Submissions: ANYONE can insert (used directly only as fallback; primary path
-- goes through the server route which uses the service role key).
drop policy if exists "anyone insert contact" on public.contact_submissions;
create policy "anyone insert contact" on public.contact_submissions for insert with check (true);
drop policy if exists "anyone insert booking" on public.booking_submissions;
create policy "anyone insert booking" on public.booking_submissions for insert with check (true);

-- =========================================================
-- Storage bucket
-- =========================================================
-- Manual step (one-time): in Supabase Dashboard -> Storage -> New bucket
--   name:   nexvora-media
--   public: YES
-- Or run:
insert into storage.buckets (id, name, public)
values ('nexvora-media', 'nexvora-media', true)
on conflict (id) do nothing;

-- Allow public to read bucket files
drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select
  using (bucket_id = 'nexvora-media');
