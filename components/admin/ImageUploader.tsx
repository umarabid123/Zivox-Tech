"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET ||
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ||
  "zivox-media";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

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
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState<string | null>(null);

  async function upload(file: File) {
    // Validate type
    if (!file.type.startsWith("image/")) {
      setErr("Only image files are allowed.");
      return;
    }
    // Validate size
    if (file.size > MAX_SIZE_BYTES) {
      setErr(`File too large. Maximum size is 5 MB (got ${(file.size / 1024 / 1024).toFixed(1)} MB).`);
      return;
    }

    setBusy(true);
    setProgress(10);
    setErr(null);

    try {
      const ext = file.name.split(".").pop() || "bin";
      const path = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const sb = supabaseBrowser();

      setProgress(30);

      const { error } = await sb.storage.from(BUCKET).upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
      });

      if (error) throw error;

      setProgress(90);

      const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
      onChange(data.publicUrl);
      setProgress(100);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setErr(msg);
    } finally {
      setBusy(false);
      setTimeout(() => setProgress(0), 800);
    }
  }

  async function handleRemove() {
    onChange("");
    setErr(null);
  }

  return (
    <div className="a-field">
      <label>{label}</label>

      {value && (
        <div style={{ marginBottom: 10, position: "relative", display: "inline-block" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt=""
            style={{
              maxWidth: 280,
              maxHeight: 160,
              borderRadius: 8,
              border: "1px solid var(--a-border)",
              display: "block",
              objectFit: "cover",
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            title="Remove image"
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "rgba(0,0,0,0.6)",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              width: 22,
              height: 22,
              cursor: "pointer",
              fontSize: 13,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <input
        type="url"
        placeholder="Paste an image URL…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginBottom: 6 }}
      />

      <input
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = ""; // reset so same file can be re-selected
        }}
        style={{ marginTop: 4 }}
      />

      {/* Progress bar */}
      {busy && progress > 0 && (
        <div
          style={{
            marginTop: 8,
            height: 4,
            borderRadius: 2,
            background: "var(--a-border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--a-accent)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      )}

      {busy && (
        <span style={{ color: "var(--a-muted)", fontSize: 12, marginTop: 4, display: "block" }}>
          Uploading… {progress}%
        </span>
      )}
      {err && (
        <span style={{ color: "var(--a-danger)", fontSize: 12, marginTop: 4, display: "block" }}>
          {err}
        </span>
      )}
    </div>
  );
}
