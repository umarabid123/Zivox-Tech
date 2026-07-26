import Link from "next/link";
import { supabaseService } from "@/lib/supabase/server";
import { deletePortfolio, toggleProjectStatus } from "../../actions";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  title: string;
  slug: string | null;
  category: string | null;
  featured: boolean | null;
  display_order: number | null;
  sort_order: number | null;
  status: string | null;
  published: boolean | null;
  poster_url: string | null;
  cover_image: string | null;
  created_at: string | null;
};

export default async function PortfolioList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q = "", status = "all" } = await searchParams;

  let query = supabaseService()
    .from("portfolio_items")
    .select(
      "id,title,slug,category,featured,display_order,sort_order,status,published,poster_url,cover_image,created_at"
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (status === "published") query = query.eq("status", "published");
  if (status === "draft") query = query.eq("status", "draft");

  const { data: rows } = await query;

  const filtered = (rows ?? []).filter((r: Row) =>
    q ? r.title?.toLowerCase().includes(q.toLowerCase()) : true
  );

  return (
    <div className="a-card">
      {/* Top bar */}
      <div className="a-top" style={{ marginBottom: 16, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>
          Featured Projects
        </h2>
        <Link className="a-btn" href="/admin/portfolio/new">
          + New Project
        </Link>
      </div>

      {/* Search + Filter */}
      <form method="GET" style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          name="q"
          defaultValue={q}
          placeholder="Search projects…"
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
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <button className="a-btn secondary" type="submit">
          Filter
        </button>
        {(q || status !== "all") && (
          <Link className="a-btn secondary" href="/admin/portfolio">
            Clear
          </Link>
        )}
      </form>

      {/* Count */}
      <p style={{ color: "var(--a-muted)", fontSize: 12, marginBottom: 12 }}>
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        {q ? ` matching "${q}"` : ""}
        {status !== "all" ? ` · ${status}` : ""}
      </p>

      {/* Table */}
      <table className="a-table">
        <thead>
          <tr>
            <th style={{ width: 52 }}>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Order</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r: Row) => {
            const rowStatus = r.status || (r.published ? "published" : "draft");
            const thumb = r.poster_url || r.cover_image;
            return (
              <tr key={r.id}>
                <td>
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb}
                      alt={r.title}
                      style={{
                        width: 44,
                        height: 32,
                        objectFit: "cover",
                        borderRadius: 4,
                        border: "1px solid var(--a-border)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 44,
                        height: 32,
                        borderRadius: 4,
                        background: "var(--a-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                      }}
                    >
                      🖼
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: 500 }}>{r.title}</td>
                <td style={{ color: "var(--a-muted)", textTransform: "capitalize" }}>
                  {r.category || "—"}
                </td>
                <td>
                  {r.featured ? (
                    <span style={{ color: "#f59e0b", fontWeight: 600 }}>★ Featured</span>
                  ) : (
                    <span style={{ color: "var(--a-muted)" }}>—</span>
                  )}
                </td>
                <td style={{ color: "var(--a-muted)" }}>
                  {r.display_order ?? r.sort_order ?? 0}
                </td>
                <td>
                  <span
                    className={"a-pill " + (rowStatus === "published" ? "live" : "draft")}
                  >
                    {rowStatus === "published" ? "Live" : "Draft"}
                  </span>
                </td>
                <td>
                  <div className="a-row" style={{ gap: 6, flexWrap: "nowrap" }}>
                    <Link className="a-btn secondary" href={`/admin/portfolio/${r.id}`}>
                      Edit
                    </Link>
                    {/* Publish / Unpublish toggle */}
                    <form action={toggleProjectStatus} style={{ display: "inline" }}>
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="current_status" value={rowStatus} />
                      <button
                        className="a-btn secondary"
                        type="submit"
                        title={rowStatus === "published" ? "Unpublish" : "Publish"}
                      >
                        {rowStatus === "published" ? "Unpublish" : "Publish"}
                      </button>
                    </form>
                    <form action={deletePortfolio} style={{ display: "inline" }}>
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
              <td
                colSpan={7}
                style={{ textAlign: "center", color: "var(--a-muted)", padding: "32px 24px" }}
              >
                {q || status !== "all"
                  ? "No projects match your filters."
                  : "No projects yet. Click \"+ New Project\" to add one."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
