import Link from "next/link";

export default function BlogSection() {
  return (
    <section className="page active" data-page="blog">
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Blog</span>
        </div>
        <span className="eyebrow"><span className="dot"></span> Updated weekly</span>
        <h1>Notes on building <span className="serif-italic">software well.</span></h1>
        <p className="lead">Short, opinionated posts from our team — on AI, design, engineering, and what it takes to ship a great product.</p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div className="blog-filter reveal">
          <button className="filter-btn active" data-cat="all">All</button>
          <button className="filter-btn" data-cat="technology">Technology</button>
          <button className="filter-btn" data-cat="ai">AI</button>
          <button className="filter-btn" data-cat="growth">Business Growth</button>
          <button className="filter-btn" data-cat="web">Web Solutions</button>
          <button className="filter-btn" data-cat="mobile">Mobile Apps</button>
          <button className="filter-btn" data-cat="automation">Automation</button>
          <button className="filter-btn" data-cat="startup">Startup Journey</button>
        </div>

        <div className="blog-grid reveal-stagger">
          <Link className="blog-card" href="/blog/rag-support" data-cats="ai">
            <div className="blog-thumb"><div className="glyph blue">A</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">AI</span><span>May 18, 2026</span><span className="sep">·</span><span>8 min read</span></div>
              <h3>Why most RAG chatbots fail in production (and how we make them not)</h3>
              <p>Retrieval is the easy part. The hard parts: chunking, evaluation, and humility about what your bot doesn't know.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)' }}>LF</div><span>Léa Fournier</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="technology,web">
            <div className="blog-thumb"><div className="glyph">N</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Web</span><span>May 12, 2026</span><span className="sep">·</span><span>6 min read</span></div>
              <h3>Next.js 14, two years in — what we changed our mind about</h3>
              <p>App Router, server actions, edge runtimes. What we use in every project, and what we quietly avoid.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4fb3)' }}>EM</div><span>Elias Marchetti</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="growth,startup">
            <div className="blog-thumb"><div className="glyph alt">$</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Growth</span><span>May 5, 2026</span><span className="sep">·</span><span>5 min read</span></div>
              <h3>The case for charging $25k for a marketing site</h3>
              <p>An honest look at the economics of premium agency work — for clients and for builders.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)' }}>PN</div><span>Priya Narang</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="mobile">
            <div className="blog-thumb"><div className="glyph blue">M</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Mobile</span><span>Apr 28, 2026</span><span className="sep">·</span><span>9 min read</span></div>
              <h3>React Native vs. Flutter in 2026 — a working decision matrix</h3>
              <p>We've shipped 14 mobile apps in the last 3 years. Here's how we actually pick between them.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>SO</div><span>Samuel Okonkwo</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="automation,technology">
            <div className="blog-thumb"><div className="glyph">⌬</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Automation</span><span>Apr 21, 2026</span><span className="sep">·</span><span>7 min read</span></div>
              <h3>A field guide to internal automation projects</h3>
              <p>From "this spreadsheet is killing me" to a real system in production — without over-engineering the journey.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4fb3)' }}>EM</div><span>Elias Marchetti</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="startup,growth">
            <div className="blog-thumb"><div className="glyph alt">▲</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Startup</span><span>Apr 14, 2026</span><span className="sep">·</span><span>4 min read</span></div>
              <h3>What we learned shipping 120 products in 4 years</h3>
              <p>The patterns that recur, the mistakes that compound, and the few decisions that always matter.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)' }}>PN</div><span>Priya Narang</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="technology,web">
            <div className="blog-thumb"><div className="glyph blue">T</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Technology</span><span>Apr 7, 2026</span><span className="sep">·</span><span>10 min read</span></div>
              <h3>Type safety end-to-end — Prisma, tRPC, and what they buy you</h3>
              <p>A practical walkthrough of getting types to flow from your DB schema all the way to your React components.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4fb3)' }}>EM</div><span>Elias Marchetti</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="ai">
            <div className="blog-thumb"><div className="glyph">★</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">AI</span><span>Mar 30, 2026</span><span className="sep">·</span><span>6 min read</span></div>
              <h3>Evals are the new tests — a primer for product teams</h3>
              <p>How we set up evaluation suites for AI features, and why "vibes-based" QA breaks at the worst possible time.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)' }}>LF</div><span>Léa Fournier</span></div>
            </div>
          </Link>

          <Link className="blog-card" href="/blog/rag-support" data-cats="mobile,technology">
            <div className="blog-thumb"><div className="glyph alt">○</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Mobile</span><span>Mar 24, 2026</span><span className="sep">·</span><span>8 min read</span></div>
              <h3>Offline-first done right — patterns from the trenches</h3>
              <p>Local DBs, conflict resolution, and the UX of "you'll see this later". Real patterns, real code.</p>
              <div className="blog-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>SO</div><span>Samuel Okonkwo</span></div>
            </div>
          </Link>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Get monthly notes from our team. <span className="serif-italic">No fluff.</span></h2>
          <p>One email a month, with our most-read posts and an occasional behind-the-scenes look. Unsubscribe anytime.</p>
          <form className="newsletter" style={{ maxWidth: '360px', margin: '0 auto', borderRadius: '12px' }}>
            <input type="email" placeholder="you@company.com" aria-label="Email" required />
            <button type="submit" aria-label="Subscribe">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg>
            </button>
          </form>
        </div>
      </div>
    </section>
    </section>
  );
}
