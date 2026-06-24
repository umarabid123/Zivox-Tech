import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAnon } from "@/lib/supabase/server";
import { formatDate, initials, avatarStyle } from "@/lib/formatters";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  const { data } = await supabaseAnon()
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return data as any | null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found — Zivox" };
  return {
    title: `${post.title} — Zivox`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // legacy hard-coded post handled by its own route file (rag-support)
  if (slug === "rag-support") return null;
  const post = await getPost(slug);
  if (!post) notFound();

  const author = post.author || "Zivox Team";

  return (
    <section className="page active" data-page="blog">
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/blog">Blog</Link><span className="sep">/</span>
            <span>{post.title}</span>
          </div>
          <span className="eyebrow"><span className="dot"></span> {post.category || "Article"}</span>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="lead">{post.excerpt}</p>}
          <div className="blog-author" style={{ marginTop: 18 }}>
            <div className="avatar" style={avatarStyle(author)}>{initials(author)}</div>
            <span>{author}</span>
            <span className="sep">·</span>
            <span>{formatDate(post.created_at)}</span>
            {post.read_time && <><span className="sep">·</span><span>{post.read_time}</span></>}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          {post.cover_image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_image}
              alt={post.title}
              style={{ width: "100%", borderRadius: 12, marginBottom: 32 }}
            />
          )}
          <article
            className="prose blog-article"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </section>
    </section>
  );
}
