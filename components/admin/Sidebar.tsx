"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/app/assets/images/zivoxtech.png";

type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blog", label: "Blog posts" },
  {
    href: "/admin/team",
    label: "Team Members",
    children: [
      { href: "/admin/team", label: "All Members" },
      { href: "/admin/team/new", label: "Add Member" },
    ],
  },
  {
    href: "/admin/portfolio",
    label: "Portfolio",
    children: [
      { href: "/admin/portfolio", label: "All Projects" },
      { href: "/admin/portfolio/new", label: "Add Project" },
    ],
  },
  { href: "/admin/case-studies", label: "Case studies" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/trusted-companies", label: "Trusted Companies" },
  { href: "/admin/contacts", label: "Contact inbox" },
  { href: "/admin/bookings", label: "Bookings" },
];


export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="a-side">
      <Link href="/admin" className="a-brand" aria-label="Admin home">
        <Image src={logo} alt="ZIVOXTech" priority />
      </Link>
      <nav className="a-nav">
        {ITEMS.map((it) => {
          const isParentActive =
            it.href === "/admin"
              ? path === "/admin"
              : path.startsWith(it.href);

          if (it.children) {
            return (
              <div key={it.href} className="a-nav-group">
                {/* Parent label (not a link, just a heading) */}
                <div
                  className={"a-nav-parent " + (isParentActive ? "active" : "")}
                >
                  <span className="a-nav-arrow">{isParentActive ? "▾" : "▸"}</span>
                  {it.label}
                </div>
                {/* Always show children for clarity */}
                <div className="a-nav-children">
                  {it.children.map((child) => {
                    const childActive =
                      child.href === "/admin/portfolio"
                        ? path === "/admin/portfolio"
                        : path.startsWith(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={"a-nav-child " + (childActive ? "active" : "")}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          const active =
            it.href === "/admin" ? path === "/admin" : path.startsWith(it.href);
          return (
            <Link key={it.href} href={it.href} className={active ? "active" : ""}>
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
