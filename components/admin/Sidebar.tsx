"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/app/assets/images/zivoxtech.png";

const ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blog", label: "Blog posts" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/case-studies", label: "Case studies" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
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
