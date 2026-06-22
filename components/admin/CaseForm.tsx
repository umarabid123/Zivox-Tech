"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { saveCase } from "@/app/admin/actions";

type Row = {
  id?: string;
  title?: string;
  slug?: string;
  client?: string;
  industry?: string;
  summary?: string;
  content?: string;
  cover_image?: string;
  metrics?: unknown;
  sort_order?: number;
  published?: boolean;
};

export default function CaseForm({ row }: { row?: Row }) {
  const [cover, setCover] = useState(row?.cover_image || "");
  const metricsStr = row?.metrics ? JSON.stringify(row.metrics, null, 2) : "";
  return (
    <form action={saveCase} className="a-form">
      {row?.id && <input type="hidden" name="id" value={row.id} />}
      <div className="a-field-row">
        <div className="a-field"><label>Title</label><input name="title" required defaultValue={row?.title || ""} /></div>
        <div className="a-field"><label>Slug</label><input name="slug" defaultValue={row?.slug || ""} /></div>
      </div>
      <div className="a-field-row">
        <div className="a-field"><label>Client</label><input name="client" defaultValue={row?.client || ""} /></div>
        <div className="a-field"><label>Industry</label><input name="industry" defaultValue={row?.industry || ""} /></div>
      </div>
      <div className="a-field"><label>Summary</label><textarea name="summary" defaultValue={row?.summary || ""} /></div>
      <ImageUploader value={cover} onChange={setCover} label="Cover image" />
      <input type="hidden" name="cover_image" value={cover} />
      <div className="a-field"><label>Body content (Markdown/HTML)</label><textarea name="content" defaultValue={row?.content || ""} style={{ minHeight: 240 }} /></div>
      <div className="a-field"><label>Metrics (JSON array)</label>
        <textarea name="metrics" defaultValue={metricsStr} placeholder='[{"label":"Revenue","value":"+220%"}]' />
      </div>
      <div className="a-field-row">
        <div className="a-field"><label>Sort order</label><input name="sort_order" type="number" defaultValue={row?.sort_order ?? 0} /></div>
        <label className="a-row" style={{ alignItems: "center", paddingTop: 22 }}>
          <input type="checkbox" name="published" defaultChecked={row?.published ?? true} /><span>Published</span>
        </label>
      </div>
      <div className="a-row"><button className="a-btn" type="submit">Save</button></div>
    </form>
  );
}
