import Link from "next/link";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { supabaseAnon } from "@/lib/supabase/server";
import { formatDate, initials, avatarStyle } from "@/lib/formatters";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  read_time: string | null;
  author: string | null;
  cover_image: string | null;
  created_at: string;
};

async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await supabaseAnon()
      .from("blog_posts")
      .select("id,slug,title,excerpt,category,read_time,author,cover_image,created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(60);
    return (data ?? []) as Post[];
  } catch {
    return [];
  }
}

export default async function BlogSection() {
  const posts = await getPosts();

  return (
    <section className="page active" data-page="blog">
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Blog</span>
        </div>
        <h1>Notes on building <span className="serif-italic">software well.</span></h1>
        <p className="lead">Short, opinionated posts from our team — on AI, design, engineering, and what it takes to ship a great product.</p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <AnimatedSection className="blog-filter reveal" variant="fadeIn">
          <button className="filter-btn active" data-cat="all">All</button>
          <button className="filter-btn" data-cat="technology">Technology</button>
          <button className="filter-btn" data-cat="ai">AI</button>
          <button className="filter-btn" data-cat="growth">Business Growth</button>
          <button className="filter-btn" data-cat="web">Web Solutions</button>
          <button className="filter-btn" data-cat="mobile">Mobile Apps</button>
          <button className="filter-btn" data-cat="automation">Automation</button>
          <button className="filter-btn" data-cat="startup">Startup Journey</button>
        </AnimatedSection>

        <StaggerContainer className="blog-grid reveal-stagger">
          {posts.length > 0 ? (
            posts.map((p) => {
              const cat = (p.category || "").toLowerCase();
              const author = p.author || "Zivoxtech Team";
              return (
                <StaggerItem key={p.id}>
                <Link className="blog-card" href={`/blog/${p.slug}`} data-cats={cat}>
                  <div className="blog-thumb">
                    {p.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.cover_image} alt={p.title} />
                    ) : (
                      <div className="glyph">{(p.title || "·")[0]?.toUpperCase()}</div>
                    )}
                  </div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span className="cat">{p.category || "Post"}</span>
                      <span>{formatDate(p.created_at)}</span>
                      {p.read_time && <><span className="sep">·</span><span>{p.read_time}</span></>}
                    </div>
                    <h3>{p.title}</h3>
                    {p.excerpt && <p>{p.excerpt}</p>}
                    <div className="blog-author">
                      <div className="avatar" style={avatarStyle(author)}>{initials(author)}</div>
                      <span>{author}</span>
                    </div>
                  </div>
                </Link>
                </StaggerItem>
              );
            })
          ) : (
            <StaggerItem>
            <Link className="blog-card" href="/blog/rag-support" data-cats="ai">
              <div className="blog-thumb"><div className="glyph blue">A</div></div>
              <div className="blog-body">
                <div className="blog-meta"><span className="cat">AI</span><span>May 18, 2026</span><span className="sep">·</span><span>8 min read</span></div>
                <h3>Why most RAG chatbots fail in production (and how we make them not)</h3>
                <p>Retrieval is the easy part. The hard parts: chunking, evaluation, and humility about what your bot doesn't know.</p>
                <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)' }}>LF</div><span>Léa Fournier</span></div>
              </div>
            </Link>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <AnimatedSection className="cta-box reveal" variant="scaleUp">
          <h2>Get monthly notes from our team. <span className="serif-italic">No fluff.</span></h2>
          <p>One email a month, with our most-read posts and an occasional behind-the-scenes look. Unsubscribe anytime.</p>
          <form className="newsletter" style={{ maxWidth: '360px', margin: '0 auto', borderRadius: '12px' }}>
            <input type="email" placeholder="you@company.com" aria-label="Email" required />
            <button type="submit" aria-label="Subscribe">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg>
            </button>
          </form>
        </AnimatedSection>
      </div>
    </section>
    </section>
  );
}
