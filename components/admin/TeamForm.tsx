"use client";

import { useState, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { upsertTeamMember } from "@/app/admin/actions";

type Row = {
  id?: string;
  name?: string;
  title?: string;
  company?: string;
  photo_url?: string;
  bio?: string;
  linkedin_url?: string;
  display_order?: number;
  is_active?: boolean;
};

export default function TeamForm({ row }: { row?: Row }) {
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState(row?.photo_url || "");
  const [isActive, setIsActive] = useState(row?.is_active ?? true);

  const [state, formAction, isPending] = useActionState(upsertTeamMember, {
    ok: false,
    error: null,
  });

  useEffect(() => {
    if (state.ok) {
      router.push("/admin/team");
      router.refresh();
    }
  }, [state.ok, router]);

  return (
    <form action={formAction} className="a-form">
      {row?.id && <input type="hidden" name="id" value={row.id} />}
      <input type="hidden" name="photo_url" value={photoUrl} />
      <input type="hidden" name="is_active" value={String(isActive)} />

      {state.error && <div className="a-msg err">{state.error}</div>}

      {/* ── Name & Title (Post) ── */}
      <div className="a-field-row">
        <div className="a-field">
          <label>Full Name *</label>
          <input
            name="name"
            required
            defaultValue={row?.name || ""}
            placeholder="John Doe"
          />
        </div>
        <div className="a-field">
          <label>Title (Post) *</label>
          <input
            name="title"
            required
            defaultValue={row?.title || ""}
            placeholder="Lead AI Engineer"
          />
        </div>
      </div>

      {/* ── Company (Department) & LinkedIn URL ── */}
      <div className="a-field-row">
        <div className="a-field">
          <label>Department / Company</label>
          <input
            name="company"
            defaultValue={row?.company || "Zivoxtech"}
            placeholder="Zivoxtech"
          />
        </div>
        <div className="a-field">
          <label>LinkedIn URL</label>
          <input
            name="linkedin_url"
            type="url"
            defaultValue={row?.linkedin_url || ""}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      {/* ── Photo Image ── */}
      <ImageUploader
        value={photoUrl}
        onChange={setPhotoUrl}
        label="Avatar / Picture (Circle Profile)"
      />

      {/* ── Short Bio ── */}
      <div className="a-field">
        <label>Short Bio</label>
        <textarea
          name="bio"
          defaultValue={row?.bio || ""}
          placeholder="Brief description of experience, past companies, or role focus..."
          rows={3}
        />
      </div>

      {/* ── Order & Active ── */}
      <div className="a-field-row" style={{ alignItems: "flex-end", gap: 24 }}>
        <div className="a-field">
          <label>Display Order</label>
          <input
            name="display_order"
            type="number"
            min={0}
            defaultValue={row?.display_order ?? 0}
          />
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingBottom: 6,
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <div
            onClick={() => setIsActive(!isActive)}
            style={{
              width: 40,
              height: 22,
              borderRadius: 11,
              background: isActive ? "var(--a-accent)" : "var(--a-border)",
              position: "relative",
              transition: "background 0.2s",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 3,
                left: isActive ? 20 : 3,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          <span style={{ fontWeight: 500 }}>Active Member</span>
        </label>
      </div>

      {/* ── Submit ── */}
      <div className="a-row" style={{ marginTop: 8 }}>
        <button className="a-btn" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Member"}
        </button>
        <a className="a-btn secondary" href="/admin/team">
          Cancel
        </a>
      </div>
    </form>
  );
}
