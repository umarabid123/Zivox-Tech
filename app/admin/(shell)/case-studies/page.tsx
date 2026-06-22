import Link from "next/link";
import { supabaseService } from "@/lib/supabase/server";
import { deleteCase } from "../../actions";

export const dynamic = "force-dynamic";

export default async function CaseList() {
  const { data: rows } = await supabaseService()
    .from("case_studies")
    .select("id,title,client,industry,published,sort_order")
    .order("sort_order", { ascending: true });
  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 16, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>Case studies</h2>
        <Link className="a-btn" href="/admin/case-studies/new">+ New case study</Link>
      </div>
      <table className="a-table">
        <thead><tr><th>Title</th><th>Client</th><th>Industry</th><th>Status</th><th></th></tr></thead>
        <tbody>
          {(rows ?? []).map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td><td>{r.client || "—"}</td><td>{r.industry || "—"}</td>
              <td><span className={"a-pill " + (r.published ? "live" : "draft")}>{r.published ? "Live" : "Draft"}</span></td>
              <td>
                <div className="a-row">
                  <Link className="a-btn secondary" href={`/admin/case-studies/${r.id}`}>Edit</Link>
                  <form action={deleteCase}><input type="hidden" name="id" value={r.id} /><button className="a-btn danger" type="submit">Delete</button></form>
                </div>
              </td>
            </tr>
          ))}
          {(!rows || rows.length === 0) && <tr><td colSpan={5} style={{ textAlign: "center", color: "var(--a-muted)", padding: 24 }}>No case studies yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
