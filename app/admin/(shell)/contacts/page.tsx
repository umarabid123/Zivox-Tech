import { supabaseService } from "@/lib/supabase/server";
import { markContactStatus, deleteContact } from "../../actions";

export const dynamic = "force-dynamic";

export default async function ContactsInbox() {
  const { data: rows } = await supabaseService()
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="a-card">
      <h2 style={{ marginTop: 0, fontSize: 18 }}>Contact inbox</h2>
      <table className="a-table">
        <thead>
          <tr><th>Date</th><th>Name</th><th>Email</th><th>Service</th><th>Budget</th><th>Status</th><th>Message</th><th></th></tr>
        </thead>
        <tbody>
          {(rows ?? []).map((r) => (
            <tr key={r.id}>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>{r.name}</td>
              <td><a href={`mailto:${r.email}`} style={{ color: "var(--a-accent)" }}>{r.email}</a></td>
              <td>{r.service || "—"}</td>
              <td>{r.budget || "—"}</td>
              <td><span className={"a-pill " + (r.status === "new" ? "new" : "read")}>{r.status}</span></td>
              <td style={{ maxWidth: 360 }}>
                <details>
                  <summary style={{ cursor: "pointer", color: "var(--a-muted)" }}>view</summary>
                  <div style={{ whiteSpace: "pre-wrap", padding: "8px 0", fontSize: 13 }}>
                    {r.details}
                    {r.phone && <div style={{ marginTop: 6, color: "var(--a-muted)" }}>Phone: {r.phone}</div>}
                    {r.company && <div style={{ color: "var(--a-muted)" }}>Company: {r.company}</div>}
                  </div>
                </details>
              </td>
              <td>
                <div className="a-row">
                  {r.status === "new" && (
                    <form action={markContactStatus}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="read" />
                      <button className="a-btn secondary" type="submit">Mark read</button>
                    </form>
                  )}
                  <form action={deleteContact}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className="a-btn danger" type="submit">Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
          {(!rows || rows.length === 0) && (
            <tr><td colSpan={8} style={{ textAlign: "center", color: "var(--a-muted)", padding: 24 }}>No submissions yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
