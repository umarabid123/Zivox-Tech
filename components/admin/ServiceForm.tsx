"use client";

import { saveService } from "@/app/admin/actions";

type Row = {
  id?: string; title?: string; slug?: string; icon?: string;
  description?: string; features?: string[]; pricing?: string;
  sort_order?: number; published?: boolean;
};

export default function ServiceForm({ row }: { row?: Row }) {
  return (
    <form action={saveService} className="a-form">
      {row?.id && <input type="hidden" name="id" value={row.id} />}
      <div className="a-field-row">
        <div className="a-field"><label>Title</label><input name="title" required defaultValue={row?.title || ""} /></div>
        <div className="a-field"><label>Slug</label><input name="slug" defaultValue={row?.slug || ""} /></div>
      </div>
      <div className="a-field"><label>Icon (inline SVG or name)</label>
        <textarea name="icon" defaultValue={row?.icon || ""} style={{ minHeight: 80, fontFamily: "ui-monospace, monospace", fontSize: 12 }} />
      </div>
      <div className="a-field"><label>Description</label><textarea name="description" defaultValue={row?.description || ""} /></div>
      <div className="a-field"><label>Features (comma-separated)</label>
        <input name="features" defaultValue={(row?.features || []).join(", ")} />
      </div>
      <div className="a-field"><label>Pricing</label><input name="pricing" defaultValue={row?.pricing || ""} /></div>
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
