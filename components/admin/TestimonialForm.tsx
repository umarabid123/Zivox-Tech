"use client";

import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { saveTestimonial } from "@/app/admin/actions";

type Row = {
  id?: string; name?: string; role?: string; company?: string;
  avatar?: string; quote?: string; rating?: number;
  sort_order?: number; published?: boolean;
};

export default function TestimonialForm({ row }: { row?: Row }) {
  const [avatar, setAvatar] = useState(row?.avatar || "");
  return (
    <form action={saveTestimonial} className="a-form">
      {row?.id && <input type="hidden" name="id" value={row.id} />}
      <div className="a-field-row">
        <div className="a-field"><label>Name</label><input name="name" required defaultValue={row?.name || ""} /></div>
        <div className="a-field"><label>Role</label><input name="role" defaultValue={row?.role || ""} /></div>
      </div>
      <div className="a-field-row">
        <div className="a-field"><label>Company</label><input name="company" defaultValue={row?.company || ""} /></div>
        <div className="a-field"><label>Rating (1-5)</label><input name="rating" type="number" min={1} max={5} defaultValue={row?.rating ?? 5} /></div>
      </div>
      <ImageUploader value={avatar} onChange={setAvatar} label="Avatar" />
      <input type="hidden" name="avatar" value={avatar} />
      <div className="a-field"><label>Quote</label><textarea name="quote" required defaultValue={row?.quote || ""} /></div>
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
