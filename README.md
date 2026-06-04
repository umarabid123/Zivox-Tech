# Nexvora Tech — Next.js

Pixel-perfect rebuild of the Nexvora Tech marketing site in **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## How it stays pixel-perfect

- The original hand-written CSS is preserved **byte-for-byte** in `styles/site.css` (only font URLs were rewritten to self-hosted paths).
- Tailwind's CSS reset (preflight) is **disabled** in `tailwind.config.ts` so utilities never override the original design. Tailwind is fully configured for new work.
- All markup keeps the original class names and structure, so every rule still applies.
- Fonts (Inter, Instrument Serif, JetBrains Mono — 17 woff2 files) are self-hosted in `public/fonts`.

## Structure

```
app/
  layout.tsx              Root layout: <head> theme-init, Navbar, Footer, Chatbot, interactions
  globals.css             Tailwind layers
  page.tsx                Home (/)
  about/ services/ ...    One folder per route (14 pages)
  book/page.tsx           Booking page (mounts BookingScript)
components/
  layout/                 Shared chrome used on every page
    Navbar.tsx  MobileDrawer.tsx  Footer.tsx  Chatbot.tsx
  sections/               One faithful section component per page
  ui/                     Reusable atoms (optional props): Button, Eyebrow, Pill,
                          SectionTitle, SectionSub, Counter, Container  (see ui/index.ts)
  SiteInteractions.tsx    Client: theme, scroll, reveal, counters, magnetic, FAQ,
                          portfolio filter, chatbot, forms, nav-active — re-runs per route
  BookingScript.tsx       Client: booking calendar + multi-step flow
lib/
  nav.ts                  Nav items + path→nav mapping
styles/
  site.css                Original design CSS (preserved)
public/fonts/             Self-hosted woff2 fonts
```

## Routing

The original hash-based SPA (`#home`, `#about`, …) became real Next.js routes
(`/`, `/about`, …). Internal links use `next/link`. Active nav state and the
`body[data-page]` attribute are handled in `SiteInteractions` via the current path.

## Reusable components

- **Shared chrome** (`components/layout`) renders once and appears on every page.
- **UI atoms** (`components/ui`) match the original classes exactly and take optional
  props, so they can be dropped into any page/section without changing the look.
