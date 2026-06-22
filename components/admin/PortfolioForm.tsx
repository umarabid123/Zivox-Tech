"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { savePortfolio } from "@/app/admin/actions";

type Row = {
  id?: string;
  title?: string;
  slug?: string;
  category?: string;
  description?: string;
  cover_image?: string;
  link?: string;
  tags?: string[];
  sort_order?: number;
  published?: boolean;
};

export default function PortfolioForm({ row }: { row?: Row }) {
  const [cover, setCover] = useState(row?.cover_image || "");
  return (
    <form action={savePortfolio} className="a-form">
      {row?.id && <input type="hidden" name="id" value={row.id} />}
      <div className="a-field-row">
        <div className="a-field">
          <label>Title</label>
          <input name="title" required defaultValue={row?.title || ""} />
        </div>
        <div className="a-field">
          <label>Slug (auto)</label>
          <input name="slug" defaultValue={row?.slug || ""} />
        </div>
      </div>
      <div className="a-field-row">
        <div className="a-field">
          <label>Category</label>
          <select name="category" defaultValue={row?.category || "web"}>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="ai">AI</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className="a-field">
          <label>Link</label>
          <input name="link" type="url" defaultValue={row?.link || ""} />
        </div>
      </div>
      <div className="a-field">
        <label>Description</label>
        <textarea name="description" defaultValue={row?.description || ""} />
      </div>
      <ImageUploader value={cover} onChange={setCover} label="Cover image" />
      <input type="hidden" name="cover_image" value={cover} />
      <div className="a-field">
        <label>Tags (comma-separated)</label>
        <input name="tags" defaultValue={(row?.tags || []).join(", ")} />
      </div>
      <div className="a-field-row">
        <div className="a-field">
          <label>Sort order</label>
          <input name="sort_order" type="number" defaultValue={row?.sort_order ?? 0} />
        </div>
        <label className="a-row" style={{ alignItems: "center", paddingTop: 22 }}>
          <input type="checkbox" name="published" defaultChecked={row?.published ?? true} />
          <span>Published</span>
        </label>
      </div>
      <div className="a-row">
        <button className="a-btn" type="submit">Save</button>
      </div>
    </form>
  );
}
