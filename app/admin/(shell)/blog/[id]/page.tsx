import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditBlog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabaseService()
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <div className="a-card">
      <h2 style={{ marginTop: 0 }}>Edit post</h2>
      <BlogForm row={data} />
    </div>
  );
}
