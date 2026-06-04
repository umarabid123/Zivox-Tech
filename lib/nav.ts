// Central navigation + route metadata so links stay consistent across the app.
export type NavItem = { label: string; href: string; navKey: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", navKey: "home" },
  { label: "About", href: "/about", navKey: "about" },
  { label: "Services", href: "/services", navKey: "services" },
  { label: "Solutions", href: "/solutions", navKey: "solutions" },
  { label: "Portfolio", href: "/portfolio", navKey: "portfolio" },
  { label: "Blog", href: "/blog", navKey: "blog" },
  { label: "Contact", href: "/contact", navKey: "contact" },
];

// Maps a pathname to the nav item that should appear "active".
export const PATH_TO_NAV: Record<string, string | null> = {
  "/": "home",
  "/about": "about",
  "/services": "services",
  "/solutions": "solutions",
  "/portfolio": "portfolio",
  "/portfolio/helix": "portfolio",
  "/case-studies": "portfolio",
  "/blog": "blog",
  "/blog/rag-support": "blog",
  "/contact": "contact",
  "/book": "contact",
  "/privacy": null,
  "/terms": null,
};
