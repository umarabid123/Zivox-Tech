"use client";

import { useState, useRef } from "react";
import ImageUploader from "./ImageUploader";
import MultiImageUploader from "./MultiImageUploader";
import { savePortfolio } from "@/app/admin/actions";

type Row = {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  short_description?: string;
  full_description?: string;
  poster_url?: string;
  cover_image?: string; // legacy
  gallery_urls?: string[];
  technologies?: string[];
  tags?: string[]; // legacy
  project_url?: string;
  link?: string; // legacy
  github_url?: string;
  featured?: boolean;
  display_order?: number;
  sort_order?: number; // legacy
  background_color?: string;
  status?: string;
  published?: boolean; // legacy
};

function slugify(s: string): string {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export default function PortfolioForm({ row }: { row?: Row }) {
  const initialPoster = row?.poster_url || row?.cover_image || "";
  const initialTechs = (row?.technologies || row?.tags || []).join(", ");
  const initialGallery = row?.gallery_urls || [];
  const initialStatus = row?.status || (row?.published ? "published" : "draft");

  const [poster, setPoster] = useState(initialPoster);
  const [gallery, setGallery] = useState<string[]>(initialGallery);
  const [techInput, setTechInput] = useState(initialTechs);
  const [status, setStatus] = useState(initialStatus);
  const [featured, setFeatured] = useState(row?.featured ?? false);
  const [bgColor, setBgColor] = useState(row?.background_color || "#10B981");

  const titleRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);

  function handleTitleBlur() {
    if (slugRef.current && titleRef.current && !slugRef.current.value) {
      slugRef.current.value = slugify(titleRef.current.value);
    }
  }

  return (
    <form action={savePortfolio} className="a-form">
      {row?.id && <input type="hidden" name="id" value={row.id} />}
      {/* Pass gallery_urls as hidden JSON */}
      <input type="hidden" name="gallery_urls" value={JSON.stringify(gallery)} />
      <input type="hidden" name="poster_url" value={poster} />
      <input type="hidden" name="status" value={status} />
      <input type="hidden" name="featured" value={String(featured)} />
      <input type="hidden" name="background_color" value={bgColor} />

      {/* ── Title & Slug ── */}
      <div className="a-field-row">
        <div className="a-field">
          <label>Project Title *</label>
          <input
            ref={titleRef}
            name="title"
            required
            defaultValue={row?.title || ""}
            onBlur={handleTitleBlur}
            placeholder="My Awesome Project"
          />
        </div>
        <div className="a-field">
          <label>Slug (auto-generated)</label>
          <input
            ref={slugRef}
            name="slug"
            defaultValue={row?.slug || ""}
            placeholder="my-awesome-project"
          />
        </div>
      </div>

      {/* ── Short Description ── */}
      <div className="a-field">
        <label>Short Description *</label>
        <textarea
          name="short_description"
          required
          rows={2}
          defaultValue={row?.short_description || ""}
          placeholder="A brief summary shown on the project card (1–2 sentences)"
        />
      </div>

      {/* ── Full Description ── */}
      <div className="a-field">
        <label>Full Description (Optional)</label>
        <textarea
          name="full_description"
          rows={5}
          defaultValue={row?.full_description || ""}
          placeholder="Detailed project description, challenges, outcomes…"
        />
      </div>

      {/* ── Category ── */}
      <div className="a-field-row">
        <div className="a-field">
          <label>Category</label>
          <select name="category" defaultValue={row?.category || "web"}>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="ai">AI / ML</option>
            <option value="saas">SaaS</option>
            <option value="ecommerce">E-commerce</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="a-field">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* ── Card Style Customization ── */}
      <div className="a-field-row">
        <div className="a-field">
          <label>Card Background Color</label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{ width: 48, height: 38, padding: 2, cursor: "pointer", border: "1px solid var(--a-border)", borderRadius: 6, background: "transparent" }}
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              placeholder="#10B981"
              style={{ flex: 1, fontFamily: "monospace" }}
            />
          </div>
        </div>
      </div>

      {/* ── URLs ── */}
      <div className="a-field-row">
        <div className="a-field">
          <label>Project URL</label>
          <input
            name="project_url"
            type="url"
            defaultValue={row?.project_url || row?.link || ""}
            placeholder="https://example.com"
          />
        </div>
        <div className="a-field">
          <label>GitHub URL (Optional)</label>
          <input
            name="github_url"
            type="url"
            defaultValue={row?.github_url || ""}
            placeholder="https://github.com/org/repo"
          />
        </div>
      </div>

      {/* ── Technology Tags ── */}
      <div className="a-field">
        <label>Technology Tags (comma-separated)</label>
        <input
          name="technologies"
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="React, Next.js, Supabase, Tailwind CSS"
        />
        {techInput && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {techInput
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
              .map((t, i) => (
                <span
                  key={i}
                  style={{
                    background: "rgba(124,92,255,0.12)",
                    color: "var(--a-accent)",
                    padding: "2px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    border: "1px solid rgba(124,92,255,0.25)",
                  }}
                >
                  {t}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* ── Poster Image ── */}
      <ImageUploader value={poster} onChange={setPoster} label="Project Poster / Cover Image" />

      {/* ── Gallery Images ── */}
      <MultiImageUploader values={gallery} onChange={setGallery} label="Gallery Images (Optional)" />

      {/* ── Order & Featured ── */}
      <div className="a-field-row" style={{ alignItems: "flex-end", gap: 24 }}>
        <div className="a-field">
          <label>Display Order</label>
          <input
            name="display_order"
            type="number"
            min={0}
            defaultValue={row?.display_order ?? row?.sort_order ?? 0}
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
            onClick={() => setFeatured(!featured)}
            style={{
              width: 40,
              height: 22,
              borderRadius: 11,
              background: featured ? "var(--a-accent)" : "var(--a-border)",
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
                left: featured ? 20 : 3,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s",
                boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              }}
            />
          </div>
          <span style={{ fontWeight: 500 }}>Featured Project</span>
          {featured && (
            <span
              style={{
                fontSize: 11,
                background: "rgba(124,92,255,0.15)",
                color: "var(--a-accent)",
                padding: "2px 8px",
                borderRadius: 20,
                border: "1px solid rgba(124,92,255,0.25)",
              }}
            >
              ★ Featured
            </span>
          )}
        </label>
      </div>

      {/* ── Submit ── */}
      <div className="a-row" style={{ marginTop: 8 }}>
        <button className="a-btn" type="submit">
          Save Project
        </button>
        <a className="a-btn secondary" href="/admin/portfolio">
          Cancel
        </a>
      </div>
    </form>
  );
}
