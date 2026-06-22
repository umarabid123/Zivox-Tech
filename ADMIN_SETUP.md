# Nexvora Tech — Admin Panel Setup

This project has been upgraded from a static marketing site to a **dynamic Next.js 16 app** with a self-hosted admin panel, Supabase backend, and SMTP email notifications.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required keys:

| Key | What it is | Where to find |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon (public) key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (secret) | Supabase Dashboard → Settings → API |
| `SUPABASE_STORAGE_BUCKET` | Bucket name for media | Default: `nexvora-media` |
| `ADMIN_EMAIL` | Admin login email | You set this (`ahmad@gmail.com`) |
| `ADMIN_PASSWORD` | Admin login password | You set this (`ahmad123`) |
| `ADMIN_JWT_SECRET` | JWT signing secret | Run `openssl rand -base64 48` |
| `SMTP_HOST` | SMTP server host | Already set: `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | Already set: `587` |
| `SMTP_USER` | SMTP username | Already set |
| `SMTP_PASS` | SMTP password (Gmail app password) | Already set |
| `CONTACT_TO_EMAIL` | Where to send form submissions | Already set |

> **Important:** `ADMIN_JWT_SECRET` MUST be a long random string (≥ 32 chars). The site won't accept logins without it.

## 3. Set up the Supabase database

Open your Supabase project → **SQL Editor** → New query → paste the contents of `supabase/schema.sql` → Run.

This creates:
- 7 tables: `blog_posts`, `portfolio_items`, `case_studies`, `services`, `testimonials`, `contact_submissions`, `booking_submissions`
- Row-Level Security policies (public can only read published rows; submissions can be inserted by anyone)
- Storage bucket `nexvora-media` (public read)
- `updated_at` triggers

## 4. Create the storage bucket (if not auto-created)

Supabase Dashboard → **Storage** → **New bucket**:
- Name: `nexvora-media`
- Public: **Yes**

Or rely on the SQL in `schema.sql` which inserts the bucket row.

## 5. Run

```bash
npm run dev
```

- **Public site:** http://localhost:3000
- **Admin panel:** http://localhost:3000/admin
- Login with `ADMIN_EMAIL` / `ADMIN_PASSWORD`

## 6. What the admin panel can manage

| Section | Status |
| --- | --- |
| **Blog posts** | Full CRUD. Public `/blog` page reads from DB; individual posts at `/blog/[slug]`. The legacy `/blog/rag-support` static page is preserved. |
| **Portfolio** | Full CRUD. Public `/portfolio` reads from DB; falls back to original hardcoded grid if DB is empty (so the design never breaks). |
| **Case studies** | Full CRUD (admin only — public page still uses hardcoded markup; can be wired later). |
| **Services** | Full CRUD (admin only — public page still uses hardcoded markup; can be wired later). |
| **Testimonials** | Full CRUD (admin only — homepage testimonials are still hardcoded; can be wired later). |
| **Contact inbox** | View, mark-read, delete submissions from `/contact` form. |
| **Bookings** | View, confirm, delete bookings from `/book` page. |

> **Note about fallbacks:** The hardcoded content in Portfolio is kept as a fallback so the site never looks empty. Once you add real items in `/admin/portfolio`, the DB content replaces the fallback automatically. Same pattern for Blog.

## 7. Form behaviour

- `/contact` form → POST `/api/contact` → saves to `contact_submissions` AND emails `CONTACT_TO_EMAIL` via SMTP.
- `/book` form → POST `/api/booking` → saves to `booking_submissions` AND emails `CONTACT_TO_EMAIL`.

If SMTP fails, the submission is still saved to the DB and the user sees a success message (with a warning logged server-side).

## 8. Image uploads

In any admin form with an image field:
- Either paste an image URL, **or**
- Upload directly — file goes to Supabase Storage bucket `nexvora-media` and the public URL is auto-filled.

## 9. Routing / structure changes

- The root `app/layout.tsx` is now minimal (just `<html><body>{children}</body></html>`).
- All public pages live under `app/(site)/...` and share the public chrome via `app/(site)/layout.tsx`.
- Admin lives under `app/admin/...` with its own layout/styles (does not inherit the public chrome).
- `proxy.ts` (formerly `middleware.ts`) protects `/admin/*` — Next.js 16 renamed middleware to proxy.

## 10. Production deploy notes

- Set all env vars in your hosting provider (Vercel, Railway, etc.).
- For Vercel: the Node runtime is required for `/api/contact`, `/api/booking`, `/api/admin/*` and `proxy.ts` (already configured).
- Supabase Storage works out-of-the-box on Vercel since URLs are CDN-served.
- `ADMIN_JWT_SECRET` must be set in production — without it, login will fail.

## 11. Changing the admin password later

Just update `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env.local` and restart. There's no user DB — auth is single-admin via env vars.
