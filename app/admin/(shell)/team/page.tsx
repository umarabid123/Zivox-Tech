import Link from "next/link";
import { supabaseService } from "@/lib/supabase/server";
import { deleteTeamMember, toggleTeamMemberActive } from "../../actions";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  name: string;
  title: string;
  company: string | null;
  photo_url: string | null;
  display_order: number | null;
  is_active: boolean;
  created_at: string | null;
};

export default async function TeamList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "all" } = await searchParams;

  let query = supabaseService()
    .from("team_members")
    .select("id, name, title, company, photo_url, display_order, is_active, created_at")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (status === "active") query = query.eq("is_active", true);
  if (status === "inactive") query = query.eq("is_active", false);

  const { data: rows } = await query;

  const filtered = (rows ?? []).filter((r: Row) =>
    q ? r.name?.toLowerCase().includes(q.toLowerCase()) || r.title?.toLowerCase().includes(q.toLowerCase()) : true
  );

  return (
    <div className="a-card">
      {/* Top bar */}
      <div className="a-top" style={{ marginBottom: 16, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>
          Team Members
        </h2>
        <Link className="a-btn" href="/admin/team/new">
          + Add Member
        </Link>
      </div>

      {/* Search + Filter */}
      <form method="GET" style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search members…"
          style={{
            flex: "1 1 220px",
            padding: "7px 12px",
            border: "1px solid var(--a-border)",
            borderRadius: 6,
            background: "var(--a-panel-strong)",
            color: "var(--a-text)",
            fontSize: 13,
          }}
        />
        <select
          name="status"
          defaultValue={status}
          style={{
            padding: "7px 12px",
            border: "1px solid var(--a-border)",
            borderRadius: 6,
            background: "var(--a-panel-strong)",
            color: "var(--a-text)",
            fontSize: 13,
            minWidth: 140,
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button className="a-btn secondary" type="submit">
          Filter
        </button>
        {(q || status !== "all") && (
          <Link className="a-btn secondary" href="/admin/team">
            Clear
          </Link>
        )}
      </form>

      {/* Count */}
      <p style={{ color: "var(--a-muted)", fontSize: 12, marginBottom: 12 }}>
        {filtered.length} member{filtered.length !== 1 ? "s" : ""}
        {q ? ` matching "${q}"` : ""}
        {status !== "all" ? ` · ${status}` : ""}
      </p>

      {/* Table */}
      <table className="a-table">
        <thead>
          <tr>
            <th style={{ width: 52 }}>Photo</th>
            <th>Name</th>
            <th>Title (Post)</th>
            <th>Department</th>
            <th>Order</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r: Row) => {
            return (
              <tr key={r.id}>
                <td>
                  {r.photo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.photo_url}
                      alt={r.name}
                      style={{
                        width: 36,
                        height: 36,
                        objectFit: "cover",
                        borderRadius: "50%",
                        border: "1px solid var(--a-border)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "var(--a-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--a-muted)"
                      }}
                    >
                      {r.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: 500 }}>{r.name}</td>
                <td style={{ color: "var(--a-muted)" }}>{r.title}</td>
                <td style={{ color: "var(--a-muted)" }}>{r.company || "Zivoxtech"}</td>
                <td style={{ color: "var(--a-muted)" }}>{r.display_order ?? 0}</td>
                <td>
                  <span
                    className={"a-pill " + (r.is_active ? "live" : "draft")}
                  >
                    {r.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="a-row" style={{ gap: 6, flexWrap: "nowrap" }}>
                    <Link className="a-btn secondary" href={`/admin/team/${r.id}`}>
                      Edit
                    </Link>
                    {/* Toggle Active status */}
                    <form action={toggleTeamMemberActive} style={{ display: "inline" }}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="is_active" value={String(r.is_active)} />
                      <button
                        className="a-btn secondary"
                        type="submit"
                        title={r.is_active ? "Deactivate" : "Activate"}
                      >
                        {r.is_active ? "Deactivate" : "Activate"}
                      </button>
                    </form>
                    <form action={deleteTeamMember} style={{ display: "inline" }}>
                      <input type="hidden" name="id" value={r.id} />
                      <button
                        className="a-btn danger"
                        type="submit"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 24, color: "var(--a-muted)" }}>
                No team members found. Click &quot;+ Add Member&quot; to add one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
