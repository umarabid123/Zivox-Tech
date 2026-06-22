import Link from "next/link";
import { supabaseService } from "@/lib/supabase/server";
import { deleteService } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ServicesList() {
  const { data: rows } = await supabaseService()
    .from("services").select("id,title,pricing,published,sort_order")
    .order("sort_order", { ascending: true });
  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 16, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>Services</h2>
        <Link className="a-btn" href="/admin/services/new">+ New service</Link>
      </div>
      <table className="a-table">
        <thead><tr><th>Title</th><th>Pricing</th><th>Order</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {(rows ?? []).map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td><td>{r.pricing || "—"}</td><td>{r.sort_order}</td>
              <td><span className={"a-pill " + (r.published ? "live" : "draft")}>{r.published ? "Live" : "Draft"}</span></td>
              <td>
                <div className="a-row">
                  <Link className="a-btn secondary" href={`/admin/services/${r.id}`}>Edit</Link>
                  <form action={deleteService}><input type="hidden" name="id" value={r.id} /><button className="a-btn danger" type="submit">Delete</button></form>
                </div>
              </td>
            </tr>
          ))}
          {(!rows || rows.length === 0) && <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--a-muted)", padding: 24 }}>No services yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
