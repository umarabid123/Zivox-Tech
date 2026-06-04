import Link from "next/link";

export default function BlogRagSupportSection() {
  return (
    <section className="page active" data-page="blog-rag-support">
    <section className="page-header" style={{ paddingBottom: '40px', borderBottom: '0' }}>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span>
          <Link href="/blog">Blog</Link><span className="sep">/</span>
          <span>AI</span>
        </div>
        <span className="eyebrow" style={{ background: 'var(--accent-soft)', borderColor: 'rgba(59,130,246,0.25)', color: 'var(--accent-2)' }}>AI · 8 min read</span>
        <h1>Why most RAG chatbots <span className="serif-italic">fail</span> in production.</h1>
        <p className="lead">Retrieval is the easy part. The hard parts: chunking, evaluation, and humility about what your bot doesn't know.</p>
      </div>
    </section>

    <div className="container">
      <article className="article">
        <div className="article-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)', width: '36px', height: '36px', fontSize: '13px' }}>LF</div>
            <div>
              <div style={{ color: 'var(--text)', fontWeight: '500', fontSize: '14px' }}>Léa Fournier</div>
              <div style={{ color: 'var(--text-3)', fontSize: '12.5px' }}>Lead Engineer · AI</div>
            </div>
          </div>
          <span className="sep">·</span>
          <span>May 18, 2026</span>
        </div>

        <div className="article-hero">
          <div className="glyph">A</div>
        </div>

        <div className="article-body">
          <p>If you've built a Retrieval-Augmented Generation system in the last twelve months, congratulations — you've also probably watched it confidently make something up in front of a customer at least once. We have. Several times. And after shipping seventeen of these systems for clients, we keep relearning the same lesson: the retrieval part is the easiest part.</p>

          <p>This post is the field guide we wish we'd had when we started. It's the difference between a demo that wows and a production bot that actually deflects support tickets without embarrassing your brand.</p>

          <h2>1. Chunking is a product decision, not a config flag</h2>

          <p>Most starter RAG tutorials show you something like <code>RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)</code> and call it a day. That works for a hackathon. It is not how you get good answers from a 400-page knowledge base.</p>

          <p>The right chunking strategy depends on three things: how your content is structured, how questions get asked, and how much context the model can actually use. For Quill Studio's support bot, we ended up chunking <em>by H2 section</em>, with a structured header prepended to every chunk:</p>

          <pre><code># [Aurora Hub / Device Pairing]{"\n"}{"\n"}To reset device pairing on your Aurora hub...</code></pre>

          <p>That header turned out to matter more than the embeddings. It gave the model an unambiguous citation for every retrieved chunk, and it gave us a clean way to debug bad retrievals after the fact.</p>

          <blockquote>"The model isn't smart. Your context is." — every senior AI engineer, eventually.</blockquote>

          <h2>2. Build the eval set on day one</h2>

          <p>The single highest-leverage thing you can do on a new RAG project is to sit down with the client's support lead for two hours and write 50 real questions with their ideal answers. Just <em>do it</em>. Before any embedding, before any prompt tuning.</p>

          <p>That eval set will:</p>
          <ul>
            <li>Catch regressions when you change the prompt at 2am.</li>
            <li>Give you a number to point at when a stakeholder says "the bot feels worse this week."</li>
            <li>Surface the questions your knowledge base doesn't actually answer — usually the most important finding of the entire project.</li>
          </ul>

          <h2>3. Teach the bot to say "I don't know"</h2>

          <p>This is the single biggest thing that separates a demo bot from a production one. Demos optimize for "always have an answer." Production needs to optimize for "never confidently lie."</p>

          <p>In practice, that means two things. First, prompt the model explicitly: <em>"If the retrieved context doesn't answer the question, say so and offer to hand off to a human."</em> Second — and this is the part everyone skips — actually <em>build the hand-off</em>. A bot that says "let me get someone for you" but doesn't route anywhere is worse than no bot at all.</p>

          <h2>4. Monitor in production, not in your head</h2>

          <p>Every system we've shipped logs, at minimum: the user question, the retrieved chunks, the model response, and the user's thumbs-up/down. We surface them in a dashboard the client checks weekly. It is the single most important post-launch deliverable.</p>

          <p>Without it, you are flying blind. With it, you can tell within a week whether your chunking strategy was wrong, whether your embeddings are missing a topic, or whether the model is making up confident answers about things it shouldn't.</p>

          <h2>What it looks like when it works</h2>

          <p>The Quill Studio bot we shipped in February now handles 64% of inbound tickets without escalation. It deflects an estimated 38 hours of support work a week. Its average user rating is 4.8 out of 5. None of that came from a fancy retriever — it came from doing the unglamorous work above, in order, every time.</p>

          <p>Building one yourself? <Link href="/contact">Tell us about it</Link> — happy to share more.</p>
        </div>

        <div className="share-row">
          <strong>Share this post</strong>
          <a href="#" aria-label="Twitter"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
          <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          <a href="#" aria-label="Copy link"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a>
        </div>

    
        <h2 style={{ marginTop: '64px' }}>Related reading</h2>
        <div className="blog-grid" style={{ marginTop: '24px', gridTemplateColumns: '1fr 1fr' }}>
          <Link className="blog-card" href="/blog/rag-support">
            <div className="blog-thumb"><div className="glyph">★</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">AI</span><span>Mar 30, 2026</span></div>
              <h3>Evals are the new tests — a primer for product teams</h3>
              <p>How we set up evaluation suites for AI features.</p>
            </div>
          </Link>
          <Link className="blog-card" href="/blog/rag-support">
            <div className="blog-thumb"><div className="glyph blue">⌬</div></div>
            <div className="blog-body">
              <div className="blog-meta"><span className="cat">Automation</span><span>Apr 21, 2026</span></div>
              <h3>A field guide to internal automation projects</h3>
              <p>From "this spreadsheet is killing me" to a real system.</p>
            </div>
          </Link>
        </div>
      </article>
    </div>

    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Building a RAG system? <span className="serif-italic">Let's talk.</span></h2>
          <p>30-min consultation, no obligation. We'll give an honest take on your setup.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary btn-lg" href="/book">Book a Call <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost btn-lg" href="/services">See our services</Link>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
