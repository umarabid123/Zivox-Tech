import Link from "next/link";
import { supabaseAnon } from "@/lib/supabase/server";

type Item = {
  id: string;
  title: string;
  slug: string | null;
  category: string | null;
  description: string | null;
  cover_image: string | null;
  link: string | null;
  tags: string[] | null;
};

async function getItems(): Promise<Item[]> {
  try {
    const { data } = await supabaseAnon()
      .from("portfolio_items")
      .select("id,title,slug,category,description,cover_image,link,tags")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(40);
    return (data ?? []) as Item[];
  } catch {
    return [];
  }
}

export default async function PortfolioSection() {
  const items = await getItems();

  return (
    <section className="page active" data-page="portfolio">
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Portfolio</span>
        </div>
        <span className="eyebrow"><span className="dot"></span> 120+ shipped · last 4 years</span>
        <h1>Recent <span className="serif-italic">work.</span></h1>
        <p className="lead">A small selection of products we've designed and built end-to-end. Filter by category, click for details.</p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div className="portfolio-filter reveal">
          <button className="filter-btn active" data-cat="all">All Work · {items.length || 9}</button>
          <button className="filter-btn" data-cat="web">Web</button>
          <button className="filter-btn" data-cat="mobile">Mobile</button>
          <button className="filter-btn" data-cat="ai">AI</button>
          <button className="filter-btn" data-cat="saas">SaaS</button>
        </div>

        <div className="portfolio-grid reveal-stagger" style={{ gridTemplateColumns: '2fr 1fr 1fr', gridAutoRows: 'auto' }}>
          {items.length > 0 ? (
            items.map((it, idx) => {
              const cats = [it.category, ...(it.tags || [])]
                .filter(Boolean)
                .map((s) => String(s).toLowerCase())
                .join(",");
              const href = it.link || (it.slug ? `/portfolio/${it.slug}` : "/portfolio");
              const featured = idx === 0 || idx === 5;
              return (
                <Link
                  key={it.id}
                  href={href}
                  className={"portfolio-card" + (featured ? " featured" : "")}
                  data-cats={cats}
                >
                  <div className="portfolio-thumb">
                    {it.cover_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={it.cover_image} alt={it.title} />
                    ) : (
                      <div className="mock">
                        <div className="mock-bar blue"></div>
                        <div className="mock-bar"></div>
                        <div className="mock-bar short"></div>
                      </div>
                    )}
                  </div>
                  <div className="portfolio-body">
                    <div className="portfolio-tags">
                      {(it.tags || []).slice(0, 3).map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <h3>{it.title}</h3>
                    {it.description && <p>{it.description}</p>}
                  </div>
                </Link>
              );
            })
          ) : (
            <>
              <Link href="/portfolio/helix" className="portfolio-card featured" data-cats="web,saas">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar blue"></div><div className="mock-bar"></div><div className="mock-bar short"></div><div className="mock-grid"><div className="mock-tile blue"></div><div className="mock-tile"></div><div className="mock-tile"></div><div className="mock-tile"></div><div className="mock-tile blue"></div><div className="mock-tile"></div></div><div className="mock-bar" style={{ marginTop: '14px' }}></div><div className="mock-bar short"></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Web</span><span className="tag">SaaS</span><span className="tag">Dashboard</span></div><h3>Helix — analytics platform for ops teams</h3><p>End-to-end dashboard product: data ingestion, query builder, custom reports and team workspaces. Built from scratch in 11 weeks.</p></div>
              </Link>
              <Link href="/portfolio/helix" className="portfolio-card" data-cats="mobile">
                <div className="portfolio-thumb"><div className="mock" style={{ inset: '30px 60px' }}><div className="mock-bar blue"></div><div className="mock-bar short"></div><div className="mock-tile blue" style={{ aspectRatio: '2.5', marginTop: '10px' }}></div><div className="mock-bar" style={{ marginTop: '10px' }}></div><div className="mock-bar short"></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Mobile</span><span className="tag">iOS / Android</span></div><h3>Orbital — habit tracking app</h3><p>React Native, offline-first, gentle streaks.</p></div>
              </Link>
              <Link href="/portfolio/helix" className="portfolio-card" data-cats="ai,saas">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar short blue"></div><div className="mock-bar"></div><div className="mock-bar"></div><div className="mock-bar short"></div><div className="mock-tile" style={{ aspectRatio: '4', marginTop: '12px', background: 'rgba(59,130,246,0.18)' }}></div><div className="mock-bar short" style={{ marginTop: '8px' }}></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">AI</span><span className="tag">RAG</span></div><h3>Quill — AI knowledge assistant</h3><p>RAG-powered support bot, 64% deflection.</p></div>
              </Link>
              <Link href="/portfolio/helix" className="portfolio-card" data-cats="web">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar blue"></div><div className="mock-bar"></div><div className="mock-tile" style={{ aspectRatio: '3', marginTop: '10px', background: 'rgba(59,130,246,0.18)' }}></div><div className="mock-grid" style={{ marginTop: '10px' }}><div className="mock-tile"></div><div className="mock-tile"></div><div className="mock-tile"></div></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Web</span><span className="tag">E-commerce</span></div><h3>Lumen — headless storefront</h3><p>Custom Shopify alternative for an apparel brand. 3x conversion lift.</p></div>
              </Link>
              <Link href="/portfolio/helix" className="portfolio-card" data-cats="ai">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar"></div><div className="mock-bar short blue"></div><div className="mock-bar"></div><div className="mock-bar short"></div><div className="mock-bar"></div><div className="mock-bar short blue"></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">AI</span><span className="tag">Automation</span></div><h3>Northpeak — sales agent</h3><p>AI agent that qualifies inbound leads and books demos.</p></div>
              </Link>
              <Link href="/portfolio/helix" className="portfolio-card featured" data-cats="saas,web">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar blue"></div><div className="mock-bar"></div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginTop: '10px' }}><div className="mock-tile blue" style={{ aspectRatio: '1.6' }}></div><div className="mock-tile" style={{ aspectRatio: '1.6' }}></div><div className="mock-tile" style={{ aspectRatio: '1.6' }}></div></div><div className="mock-bar" style={{ marginTop: '12px' }}></div><div className="mock-bar short"></div><div className="mock-tile" style={{ aspectRatio: '5', marginTop: '10px', background: 'rgba(255,255,255,0.04)' }}></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">SaaS</span><span className="tag">Web</span><span className="tag">B2B</span></div><h3>Vantage — go-to-market analytics</h3><p>Multi-tenant B2B SaaS with custom reporting, role-based dashboards, and Slack/Salesforce integrations.</p></div>
              </Link>
              <Link href="/portfolio/helix" className="portfolio-card" data-cats="mobile,ai">
                <div className="portfolio-thumb"><div className="mock" style={{ inset: '30px 60px' }}><div className="mock-bar short blue"></div><div className="mock-tile blue" style={{ aspectRatio: '1', margin: '10px auto', width: '60%' }}></div><div className="mock-bar short" style={{ margin: '0 auto', width: '70%' }}></div><div className="mock-bar" style={{ width: '80%', margin: '6px auto' }}></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Mobile</span><span className="tag">AI</span></div><h3>Forge — fitness AI coach</h3><p>Personalized workout planning via conversational AI.</p></div>
              </Link>
              <Link href="/portfolio/helix" className="portfolio-card" data-cats="web,saas">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar"></div><div className="mock-bar short blue"></div><div className="mock-grid"><div className="mock-tile"></div><div className="mock-tile blue"></div></div><div className="mock-bar" style={{ marginTop: '10px' }}></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Web</span><span className="tag">SaaS</span></div><h3>Helix Labs — clinical trial portal</h3><p>Patient-facing portal for a phase-II clinical trial.</p></div>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="big-stats reveal-stagger">
          <div className="big-stat">
            <div className="big-stat-num"><span className="counter" data-counter="120">0</span><span className="serif-italic" style={{ color: 'var(--accent-2)' }}>+</span></div>
            <div className="big-stat-label">Projects shipped end-to-end</div>
          </div>
          <div className="big-stat">
            <div className="big-stat-num"><span className="counter" data-counter="11">0</span></div>
            <div className="big-stat-label">Average build duration (weeks)</div>
          </div>
          <div className="big-stat">
            <div className="big-stat-num">98<span className="serif-italic" style={{ color: 'var(--accent-2)' }}>%</span></div>
            <div className="big-stat-label">On-time delivery rate</div>
          </div>
          <div className="big-stat">
            <div className="big-stat-num">$8M<span className="serif-italic" style={{ color: 'var(--accent-2)' }}>+</span></div>
            <div className="big-stat-label">Client revenue influenced</div>
          </div>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '0' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Want to see <span className="serif-italic">more?</span></h2>
          <p>NDAs cover a lot of our work. Book a 30-min consult and we'll walk through case studies that match your industry.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary btn-lg" href="/book">Book a walkthrough <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost btn-lg" href="/case-studies">Read case studies</Link>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
