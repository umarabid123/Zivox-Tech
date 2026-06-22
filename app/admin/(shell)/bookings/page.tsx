import { supabaseService } from "@/lib/supabase/server";
import { markBookingStatus, deleteBooking } from "../../actions";

export const dynamic = "force-dynamic";

export default async function BookingsInbox() {
  const { data: rows } = await supabaseService()
    .from("booking_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div className="a-card">
      <h2 style={{ marginTop: 0, fontSize: 18 }}>Bookings</h2>
      <table className="a-table">
        <thead>
          <tr><th>Submitted</th><th>Name</th><th>Email</th><th>Date</th><th>Time</th><th>Status</th><th>Notes</th><th></th></tr>
        </thead>
        <tbody>
          {(rows ?? []).map((r) => (
            <tr key={r.id}>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>{r.name}</td>
              <td><a href={`mailto:${r.email}`} style={{ color: "var(--a-accent)" }}>{r.email}</a></td>
              <td>{r.meeting_date}</td>
              <td>{r.meeting_time}</td>
              <td><span className={"a-pill " + (r.status === "new" ? "new" : "read")}>{r.status}</span></td>
              <td style={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>{r.notes || "—"}</td>
              <td>
                <div className="a-row">
                  {r.status === "new" && (
                    <form action={markBookingStatus}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="status" value="confirmed" />
                      <button className="a-btn secondary" type="submit">Confirm</button>
                    </form>
                  )}
                  <form action={deleteBooking}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className="a-btn danger" type="submit">Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
          {(!rows || rows.length === 0) && (
            <tr><td colSpan={8} style={{ textAlign: "center", color: "var(--a-muted)", padding: 24 }}>No bookings yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
