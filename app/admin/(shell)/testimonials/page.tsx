import Link from "next/link";
import { supabaseService } from "@/lib/supabase/server";
import { deleteTestimonial } from "../../actions";

export const dynamic = "force-dynamic";

export default async function TestimonialsList() {
  const { data: rows } = await supabaseService()
    .from("testimonials").select("id,name,role,company,published,sort_order")
    .order("sort_order", { ascending: true });
  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 16, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>Testimonials</h2>
        <Link className="a-btn" href="/admin/testimonials/new">+ New testimonial</Link>
      </div>
      <table className="a-table">
        <thead><tr><th>Name</th><th>Role</th><th>Company</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {(rows ?? []).map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td><td>{r.role || "—"}</td><td>{r.company || "—"}</td>
              <td><span className={"a-pill " + (r.published ? "live" : "draft")}>{r.published ? "Live" : "Draft"}</span></td>
              <td>
                <div className="a-row">
                  <Link className="a-btn secondary" href={`/admin/testimonials/${r.id}`}>Edit</Link>
                  <form action={deleteTestimonial}><input type="hidden" name="id" value={r.id} /><button className="a-btn danger" type="submit">Delete</button></form>
                </div>
              </td>
            </tr>
          ))}
          {(!rows || rows.length === 0) && <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--a-muted)", padding: 24 }}>No testimonials yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
