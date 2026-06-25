import "../../styles/admin.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin — Zivoxtech", template: "%s — Admin" },
  robots: { index: false, follow: false },
};

/**
 * Admin root scope. Loads admin CSS and wraps all admin routes in the
 * `.nx-admin-root` class so styles don't leak. Login page renders inside
 * this directly; other admin routes get the sidebar shell via the
 * `(shell)` route group's layout.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="nx-admin-root">{children}</div>;
}
