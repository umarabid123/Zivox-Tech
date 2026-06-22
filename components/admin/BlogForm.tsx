"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { saveBlog } from "@/app/admin/actions";

type Row = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  cover_image?: string;
  category?: string;
  read_time?: string;
  author?: string;
  published?: boolean;
};

export default function BlogForm({ row }: { row?: Row }) {
  const [cover, setCover] = useState(row?.cover_image || "");
  return (
    <form action={saveBlog} className="a-form">
      {row?.id && <input type="hidden" name="id" value={row.id} />}
      <div className="a-field-row">
        <div className="a-field">
          <label>Title</label>
          <input name="title" required defaultValue={row?.title || ""} />
        </div>
        <div className="a-field">
          <label>Slug (auto if empty)</label>
          <input name="slug" defaultValue={row?.slug || ""} />
        </div>
      </div>
      <div className="a-field-row">
        <div className="a-field">
          <label>Category</label>
          <input name="category" defaultValue={row?.category || ""} placeholder="AI, Web, Process…" />
        </div>
        <div className="a-field">
          <label>Read time</label>
          <input name="read_time" defaultValue={row?.read_time || ""} placeholder="5 min read" />
        </div>
      </div>
      <div className="a-field">
        <label>Author</label>
        <input name="author" defaultValue={row?.author || "Nexvora Team"} />
      </div>
      <div className="a-field">
        <label>Excerpt</label>
        <textarea name="excerpt" defaultValue={row?.excerpt || ""} />
      </div>
      <ImageUploader value={cover} onChange={setCover} label="Cover image" />
      <input type="hidden" name="cover_image" value={cover} />
      <div className="a-field">
        <label>Content (Markdown or HTML)</label>
        <textarea name="content" defaultValue={row?.content || ""} style={{ minHeight: 280 }} />
      </div>
      <label className="a-row">
        <input type="checkbox" name="published" defaultChecked={row?.published ?? true} />
        <span>Published</span>
      </label>
      <div className="a-row">
        <button className="a-btn" type="submit">Save</button>
      </div>
    </form>
  );
}
