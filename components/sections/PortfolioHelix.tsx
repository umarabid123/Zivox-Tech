import Link from "next/link";

export default function PortfolioHelixSection() {
  return (
    <section className="page active" data-page="portfolio-helix">

    <section className="project-hero">
      <div className="container">
        <div className="breadcrumb" style={{ marginBottom: '22px', display: 'inline-flex', gap: '10px', fontSize: '13px', color: 'var(--text-3)' }}>
          <Link href="/">Home</Link><span style={{ opacity: '0.4' }}>/</span>
          <Link href="/portfolio">Portfolio</Link><span style={{ opacity: '0.4' }}>/</span>
          <span>Helix</span>
        </div>
        <div className="project-hero-grid">
          <div className="reveal">
            <span className="eyebrow"><span className="dot"></span> SaaS · Web · Dashboard</span>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.03em', marginTop: '22px', lineHeight: '1.06' }}>Helix — an analytics platform <span className="serif-italic">ops teams</span> open every morning.</h1>
            <p style={{ marginTop: '22px', color: 'var(--text-2)', fontSize: '17px', lineHeight: '1.6', maxWidth: '540px' }}>
              We designed and built Helix from scratch in 11 weeks — a multi-tenant analytics product with custom query building, real-time dashboards, and team-level workspaces.
            </p>
            <div className="project-meta-grid">
              <div className="project-meta"><div className="label">Client</div><div className="value">Northpeak Operations</div></div>
              <div className="project-meta"><div className="label">Timeline</div><div className="value">11 weeks · 2024</div></div>
              <div className="project-meta"><div className="label">Team</div><div className="value">Designer + 2 Engineers</div></div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" href="/contact">Build something similar <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost" href="/portfolio">More work</Link>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: '.1s' }}>
            <div className="dashboard" style={{ transform: 'rotateY(-3deg) rotateX(2deg)' }}>
              <div className="dashboard-top">
                <div className="traffic"><span></span><span></span><span></span></div>
                <div className="url">helix.northpeak.io</div>
                <div style={{ width: '32px' }}></div>
              </div>
              <div className="dashboard-body">
                <div className="kpi-row">
                  <div className="kpi"><div className="kpi-label">Avg DAU</div><div className="kpi-value">4,210</div><div className="kpi-delta">↑ 23%</div></div>
                  <div className="kpi"><div className="kpi-label">Queries / day</div><div className="kpi-value accent">182k</div><div className="kpi-delta">↑ 41%</div></div>
                  <div className="kpi"><div className="kpi-label">NPS</div><div className="kpi-value">62</div><div className="kpi-delta">↑ 12</div></div>
                </div>
                <div className="chart-card">
                  <div className="chart-head"><div><div className="label">Daily active teams</div><div className="value">142</div></div></div>
                  <svg className="chart-svg" viewBox="0 0 400 130" preserveAspectRatio="none">
                    <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35"></stop><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"></stop></linearGradient></defs>
                    <g stroke="#1F2128" strokeWidth="1"><line x1="0" y1="32" x2="400" y2="32"></line><line x1="0" y1="65" x2="400" y2="65"></line><line x1="0" y1="98" x2="400" y2="98"></line></g>
                    <path d="M0,100 L40,92 L80,85 L120,72 L160,76 L200,55 L240,60 L280,40 L320,45 L360,28 L400,22 L400,130 L0,130 Z" fill="url(#g2)"></path>
                    <path d="M0,100 L40,92 L80,85 L120,72 L160,76 L200,55 L240,60 L280,40 L320,45 L360,28 L400,22" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="why-grid">
          <div className="reveal">
            <div className="section-eyebrow">The challenge</div>
            <h2 className="section-title">A spreadsheet patchwork <span className="serif-italic">at the breaking point.</span></h2>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '24px 0 16px' }}>
              Northpeak's ops team was running a $40M business off seven separate Google Sheets, copy-pasted into Looker once a day. Decisions lagged a full day, and the team had stopped trusting its own dashboards.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '0' }}>
              They wanted a single source of truth — but every off-the-shelf analytics tool either over-fit them into a generic SQL editor or undershot on the custom workflows they needed.
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '.1s' }}>
            <div className="case-stat-row" style={{ gridTemplateColumns: '1fr', gap: '12px' }}>
              <div className="case-stat"><div className="num">23%</div><div className="lbl">Daily active users — first month</div></div>
              <div className="case-stat"><div className="num">41%</div><div className="lbl">Faster decision cycle vs. spreadsheets</div></div>
              <div className="case-stat"><div className="num">$280k</div><div className="lbl">Estimated annual ops savings</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header reveal">
          <div className="section-eyebrow">The product</div>
          <h2 className="section-title">Four core surfaces, <span className="serif-italic">one platform.</span></h2>
        </header>
        <div className="project-gallery reveal-stagger">
          <div className="gallery-frame full">
            <div style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '8px' }}>DASHBOARD · MAIN VIEW</div>
            <div className="kpi-row" style={{ marginBottom: '14px' }}>
              <div className="kpi"><div className="kpi-label">Revenue MTD</div><div className="kpi-value">$1.2M</div><div className="kpi-delta">↑ 18%</div></div>
              <div className="kpi"><div className="kpi-label">Pipeline</div><div className="kpi-value accent">$4.8M</div><div className="kpi-delta">↑ 22%</div></div>
              <div className="kpi"><div className="kpi-label">Win rate</div><div className="kpi-value">34%</div><div className="kpi-delta">↑ 2.4%</div></div>
              <div className="kpi"><div className="kpi-label">ACV</div><div className="kpi-value">$28k</div><div className="kpi-delta">↑ 6.1%</div></div>
            </div>
            <svg style={{ width: '100%', height: '130px' }} viewBox="0 0 400 130" preserveAspectRatio="none">
              <defs><linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"></stop><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"></stop></linearGradient></defs>
              <path d="M0,90 L40,80 L80,75 L120,65 L160,55 L200,50 L240,35 L280,40 L320,25 L360,22 L400,12 L400,130 L0,130 Z" fill="url(#g3)"></path>
              <path d="M0,90 L40,80 L80,75 L120,65 L160,55 L200,50 L240,35 L280,40 L320,25 L360,22 L400,12" stroke="#3B82F6" strokeWidth="2" fill="none"></path>
            </svg>
          </div>
          <div className="gallery-frame">
            <div style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '8px' }}>QUERY BUILDER</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-2)', lineHeight: '1.9', padding: '16px', background: '#0c0e12', border: '1px solid var(--border-2)', borderRadius: '8px' }}>
              <span style={{ color: '#c084fc' }}>SELECT</span> region, <span style={{ color: 'var(--accent-2)' }}>SUM</span>(revenue)<br />
              <span style={{ color: '#c084fc' }}>FROM</span> <span style={{ color: '#86efac' }}>"orders"</span><br />
              <span style={{ color: '#c084fc' }}>WHERE</span> created_at &gt; <span style={{ color: '#fbbf24' }}>'2026-01'</span><br />
              <span style={{ color: '#c084fc' }}>GROUP BY</span> region<br />
              <span style={{ color: '#c084fc' }}>ORDER BY</span> 2 <span style={{ color: '#c084fc' }}>DESC</span><br />
              <span style={{ color: '#c084fc' }}>LIMIT</span> <span style={{ color: '#fbbf24' }}>10</span>
            </div>
          </div>
          <div className="gallery-frame">
            <div style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '8px' }}>CUSTOM REPORT</div>
            <div style={{ display: 'grid', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '13px' }}><span>North America</span><span style={{ color: 'var(--accent-2)', fontWeight: '600' }}>$842k</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '13px' }}><span>EMEA</span><span style={{ color: 'var(--accent-2)', fontWeight: '600' }}>$612k</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '13px' }}><span>APAC</span><span style={{ color: 'var(--accent-2)', fontWeight: '600' }}>$398k</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '13px' }}><span>LATAM</span><span style={{ color: 'var(--accent-2)', fontWeight: '600' }}>$184k</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header reveal">
          <div className="section-eyebrow">Under the hood</div>
          <h2 className="section-title">The <span className="serif-italic">stack</span> we used.</h2>
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} className="reveal">
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>Next.js 14</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>TypeScript</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>PostgreSQL</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>Prisma</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>ClickHouse</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>Redis</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>Auth0</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>Vercel</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>Recharts</span>
          <span className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>Tailwind</span>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="testimonial reveal" style={{ maxWidth: '760px', margin: '0 auto', padding: '48px' }}>
          <div className="stars" aria-label="5 stars">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
          </div>
          <p className="quote" style={{ fontSize: '22px' }}>"Zivoxtech shipped Helix in eight working weeks. It's now the single tool our ops team opens every morning — and our retention metrics are visibly cleaner."</p>
          <div className="testimonial-author">
            <div className="avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4fb3)' }}>AT</div>
            <div><div className="author-name">Adaeze Thompson</div><div className="author-role">Head of Operations, Northpeak</div></div>
          </div>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '0' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Got a similar challenge? <span className="serif-italic">Let's chat.</span></h2>
          <p>Most products like Helix start with a 30-minute discovery call — usually free.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary btn-lg" href="/contact">Start a project <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost btn-lg" href="/book">Book consultation</Link>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
