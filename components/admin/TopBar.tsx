"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Globe, LogOut, Menu, User, UserCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/app/assets/images/zivoxtech.png";

export default function TopBar({ title, email }: { title: string; email: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const initials = useMemo(() => {
    const source = email.split("@")[0] || "Admin";
    return source
      .split(/[._-]+/)
      .map((part) => part[0] || "")
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }, [email]);

  return (
    <div className="a-top">
      <div>
        <h1 className="a-h1">{title}</h1>
        <span className="a-top-sub">{email}</span>
      </div>

      <div className="a-top-actions">
        <motion.a
          className="a-btn secondary a-live-btn"
          href="/"
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -1, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Globe size={16} />
          Live Site
          <ExternalLink size={14} />
        </motion.a>

        <div className="a-profile" ref={menuRef}>
          <motion.button
            type="button"
            className="a-profile-trigger"
            onClick={() => setOpen((value) => !value)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            aria-expanded={open}
            aria-haspopup="menu"
          >
            <span className="a-avatar" aria-hidden="true">{initials}</span>
            <span className="a-profile-meta">
              <strong>My Account</strong>
              <span>{email}</span>
            </span>
            <Menu size={16} />
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                className="a-profile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                role="menu"
              >
                <button type="button" onClick={logout} role="menuitem">
                  <LogOut size={16} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
