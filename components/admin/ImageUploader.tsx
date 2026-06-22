"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "nexvora-media";

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setErr(null);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const sb = supabaseBrowser();
      const { error } = await sb.storage.from(BUCKET).upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;
      const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e: any) {
      setErr(e.message || "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="a-field">
      <label>{label}</label>
      {value && (
        <div style={{ marginBottom: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            style={{
              maxWidth: 200,
              maxHeight: 120,
              borderRadius: 6,
              border: "1px solid var(--a-border)",
            }}
          />
        </div>
      )}
      <input
        type="url"
        placeholder="Paste an image URL or upload below"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
        }}
        style={{ marginTop: 6 }}
      />
      {busy && <span style={{ color: "var(--a-muted)", fontSize: 12 }}>Uploading…</span>}
      {err && <span style={{ color: "var(--a-danger)", fontSize: 12 }}>{err}</span>}
    </div>
  );
}
