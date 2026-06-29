"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

export default function ProfilePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    if (newPassword !== confirmPassword) {
      setErr("New password and confirmation do not match.");
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setErr(data.error || "Could not update password");
        setBusy(false);
        return;
      }
      setOk("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setErr("Network error");
    } finally {
      setBusy(false);
    }
  }

  function PasswordField({
    id,
    label,
    value,
    onChange,
    visible,
    toggle,
  }: {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    visible: boolean;
    toggle: () => void;
  }) {
    return (
      <div className="a-field">
        <label htmlFor={id}>{label}</label>
        <div className="a-password-wrap">
          <input id={id} type={visible ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} required />
          <motion.button type="button" className="a-icon-btn" onClick={toggle} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            {visible ? <EyeOff size={16} /> : <Eye size={16} />}
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <form className="a-form a-profile-form" onSubmit={onSubmit}>
      {err && <div className="a-msg err">{err}</div>}
      {ok && <div className="a-msg ok">{ok}</div>}

      <PasswordField
        id="current-password"
        label="Current Password"
        value={currentPassword}
        onChange={setCurrentPassword}
        visible={show.current}
        toggle={() => setShow((s) => ({ ...s, current: !s.current }))}
      />
      <PasswordField
        id="new-password"
        label="New Password"
        value={newPassword}
        onChange={setNewPassword}
        visible={show.next}
        toggle={() => setShow((s) => ({ ...s, next: !s.next }))}
      />
      <PasswordField
        id="confirm-password"
        label="Confirm New Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        visible={show.confirm}
        toggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
      />

      <motion.button className="a-btn" type="submit" disabled={busy} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
        {busy ? "Saving…" : "Save Changes"}
      </motion.button>
    </form>
  );
}