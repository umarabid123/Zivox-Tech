"use client";

import { useRouter } from "next/navigation";

export default function TopBar({ title, email }: { title: string; email: string }) {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <div className="a-top">
      <h1 className="a-h1">{title}</h1>
      <div className="a-row">
        <span style={{ color: "var(--a-muted)", fontSize: 13 }}>{email}</span>
        <button className="a-btn secondary" onClick={logout} type="button">
          Sign out
        </button>
      </div>
    </div>
  );
}
