import Link from "next/link";
import { supabaseService } from "@/lib/supabase/server";
import { deleteBlog } from "../../actions";

export const dynamic = "force-dynamic";

export default async function BlogList() {
  const { data: rows } = await supabaseService()
    .from("blog_posts")
    .select("id,title,slug,category,published,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 16, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18 }}>Blog posts</h2>
        <Link className="a-btn" href="/admin/blog/new">+ New post</Link>
      </div>
      <table className="a-table">
        <thead>
          <tr>
            <th>Title</th><th>Slug</th><th>Category</th><th>Status</th><th>Created</th><th></th>
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td><code>{r.slug}</code></td>
              <td>{r.category || "—"}</td>
              <td>
                <span className={"a-pill " + (r.published ? "live" : "draft")}>
                  {r.published ? "Live" : "Draft"}
                </span>
              </td>
              <td>{new Date(r.created_at).toLocaleDateString()}</td>
              <td>
                <div className="a-row">
                  <Link className="a-btn secondary" href={`/admin/blog/${r.id}`}>Edit</Link>
                  <form action={deleteBlog}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className="a-btn danger" type="submit">Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
          {(!rows || rows.length === 0) && (
            <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--a-muted)", padding: "24px" }}>
              No posts yet. <Link href="/admin/blog/new">Create the first one</Link>.
            </td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
