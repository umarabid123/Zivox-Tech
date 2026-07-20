"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";

const BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_BUCKET ||
  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET ||
  "zivox-media";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

interface MultiImageUploaderProps {
  values: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  maxImages?: number;
}

export default function MultiImageUploader({
  values,
  onChange,
  label = "Gallery Images",
  maxImages = 10,
}: MultiImageUploaderProps) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [err, setErr] = useState<string | null>(null);

  async function uploadFile(file: File): Promise<string> {
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed.");
    }
    if (file.size > MAX_SIZE_BYTES) {
      throw new Error(
        `File "${file.name}" is too large. Max is 5 MB (got ${(file.size / 1024 / 1024).toFixed(1)} MB).`
      );
    }

    const ext = file.name.split(".").pop() || "bin";
    const path = `portfolio/gallery/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const sb = supabaseBrowser();

    const { error } = await sb.storage.from(BUCKET).upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
    });
    if (error) throw error;

    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleFiles(files: FileList) {
    if (values.length + files.length > maxImages) {
      setErr(`Maximum ${maxImages} gallery images allowed.`);
      return;
    }

    setBusy(true);
    setErr(null);

    const uploaded: string[] = [];
    for (let i = 0; i < files.length; i++) {
      setProgress(Math.round(((i) / files.length) * 90) + 5);
      try {
        const url = await uploadFile(files[i]);
        uploaded.push(url);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Upload failed";
        setErr(msg);
        break;
      }
    }

    setProgress(100);
    onChange([...values, ...uploaded]);
    setBusy(false);
    setTimeout(() => setProgress(0), 800);
  }

  function removeImage(idx: number) {
    const next = values.filter((_, i) => i !== idx);
    onChange(next);
  }

  return (
    <div className="a-field">
      <label>{label}</label>

      {/* Gallery grid preview */}
      {values.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: 8,
            marginBottom: 10,
          }}
        >
          {values.map((url, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Gallery ${idx + 1}`}
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  objectFit: "cover",
                  borderRadius: 6,
                  border: "1px solid var(--a-border)",
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                title="Remove"
                style={{
                  position: "absolute",
                  top: 3,
                  right: 3,
                  background: "rgba(0,0,0,0.65)",
                  border: "none",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                  fontSize: 11,
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {values.length < maxImages && (
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={busy}
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      )}

      {values.length >= maxImages && (
        <p style={{ color: "var(--a-muted)", fontSize: 12, marginTop: 4 }}>
          Maximum {maxImages} images reached.
        </p>
      )}

      {/* Progress */}
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
