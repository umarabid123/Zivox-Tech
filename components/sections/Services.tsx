import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="page active" data-page="services">

    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <span>Services</span>
        </div>
        <h1>What we <span className="serif-italic">build.</span></h1>
        <p className="lead">From a marketing site to a production AI assistant, we cover the full surface area of modern software. Pick what you need below.</p>
      </div>
    </section>


    <section className="container">
      <div className="service-detail">
        <div className="reveal">
          <div className="section-eyebrow">01 · Web Solutions</div>
          <h2>Websites that <span className="serif-italic">convert,</span> dashboards that compound.</h2>
          <p className="lead">Marketing sites, customer portals, dashboards, e-commerce — built fast, accessible by default, and tuned for performance.</p>
          <ul className="feature-list-small">
            <li>
              <span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <span><strong>Marketing &amp; landing sites.</strong> Premium aesthetic, SEO ready, Lighthouse 95+ — built on Next.js or framework of choice.</span>
            </li>
            <li>
              <span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <span><strong>SaaS dashboards.</strong> Auth, billing, role-aware access, real-time data, custom reports.</span>
            </li>
            <li>
              <span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <span><strong>Customer portals.</strong> Self-service flows for accounts, billing, support and onboarding.</span>
            </li>
            <li>
              <span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span>
              <span><strong>E-commerce.</strong> Headless Shopify, custom checkouts, Stripe integrations, B2B portals.</span>
            </li>
          </ul>
          <Link className="btn btn-ghost" style={{ marginTop: '24px' }} href="/contact">Start a web project <span className="arrow">→</span></Link>
        </div>
        <div className="service-visual reveal" style={{ transitionDelay: '.1s' }}>
          <div className="kpi-row">
            <div className="kpi"><div className="kpi-label">Visits / mo</div><div className="kpi-value">142k</div><div className="kpi-delta">↑ 18%</div></div>
            <div className="kpi"><div className="kpi-label">CVR</div><div className="kpi-value accent">4.2%</div><div className="kpi-delta">↑ 0.8%</div></div>
          </div>
          <div style={{ marginTop: '14px' }} className="chart-card">
            <div className="chart-head"><div><div className="label">Lighthouse</div><div className="value">98 / 100</div></div></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '12px' }}>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: '22px', color: 'var(--accent-2)', fontWeight: '600' }}>100</div><div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Perf</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: '22px', color: 'var(--accent-2)', fontWeight: '600' }}>100</div><div style={{ fontSize: '11px', color: 'var(--text-3)' }}>A11y</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: '22px', color: 'var(--accent-2)', fontWeight: '600' }}>98</div><div style={{ fontSize: '11px', color: 'var(--text-3)' }}>SEO</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: '22px', color: 'var(--accent-2)', fontWeight: '600' }}>95</div><div style={{ fontSize: '11px', color: 'var(--text-3)' }}>BP</div></div>
            </div>
          </div>
        </div>
      </div>

  
      <div className="service-detail reverse">
        <div className="reveal">
          <div className="section-eyebrow">02 · Mobile App Development</div>
          <h2>Apps people <span className="serif-italic">open daily.</span></h2>
          <p className="lead">Cross-platform and native — designed for daily use, engineered to perform, and ready for the store within 8–12 weeks.</p>
          <ul className="feature-list-small">
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>React Native &amp; Flutter.</strong> One codebase, two stores — without compromising on native feel.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Offline-first sync.</strong> Local DBs, conflict resolution, and graceful degradation when networks die.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Push, payments, biometrics.</strong> The hard infrastructure handled, so you focus on the product.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Store submission &amp; ASO.</strong> We handle the Apple/Google review process so you don't have to.</span></li>
          </ul>
          <Link className="btn btn-ghost" style={{ marginTop: '24px' }} href="/contact">Start a mobile project <span className="arrow">→</span></Link>
        </div>
        <div className="service-visual reveal" style={{ transitionDelay: '.1s' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ aspectRatio: '9/16', background: 'var(--bg-elev)', borderRadius: '18px', border: '1px solid var(--border-2)', padding: '14px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ height: '6px', width: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', margin: '0 auto 14px' }}></div>
              <div style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '8px' }}>Today</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '600', letterSpacing: '-0.02em' }}>Good morning, Sam.</div>
              <div style={{ marginTop: '14px', padding: '10px 12px', background: 'var(--accent-soft)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '10px' }}>
                <div style={{ fontSize: '10px', color: 'var(--accent-2)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Streak</div>
                <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--accent-2)', letterSpacing: '-0.02em' }}>14 days</div>
              </div>
              <div style={{ marginTop: '10px', display: 'grid', gap: '6px' }}>
                <div style={{ height: '28px', background: 'rgba(255,255,255,0.04)', borderRadius: '7px' }}></div>
                <div style={{ height: '28px', background: 'rgba(255,255,255,0.04)', borderRadius: '7px' }}></div>
                <div style={{ height: '28px', background: 'rgba(255,255,255,0.04)', borderRadius: '7px' }}></div>
              </div>
            </div>
            <div style={{ aspectRatio: '9/16', background: 'var(--bg-elev)', borderRadius: '18px', border: '1px solid var(--border-2)', padding: '14px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ height: '6px', width: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', margin: '0 auto 14px' }}></div>
              <div style={{ fontSize: '11px', color: 'var(--text-3)', marginBottom: '8px' }}>Insights</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', letterSpacing: '-0.02em' }}>This week</div>
              <svg style={{ marginTop: '12px', width: '100%', height: '80px' }} viewBox="0 0 100 50" preserveAspectRatio="none"><path d="M0,35 L20,30 L40,20 L60,15 L80,10 L100,5" stroke="#3B82F6" strokeWidth="2" fill="none" strokeLinecap="round"></path><path d="M0,35 L20,30 L40,20 L60,15 L80,10 L100,5 L100,50 L0,50Z" fill="url(#g1)" opacity="0.4"></path><defs><linearGradient id="g1" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3B82F6"></stop><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"></stop></linearGradient></defs></svg>
              <div style={{ marginTop: '14px', fontSize: '12px', color: 'var(--text-2)' }}>"Most productive Tuesday yet."</div>
            </div>
          </div>
        </div>
      </div>

  
      <div className="service-detail">
        <div className="reveal">
          <div className="section-eyebrow">03 · AI Solutions</div>
          <h2>AI assistants that <span className="serif-italic">earn their keep.</span></h2>
          <p className="lead">RAG-powered chatbots, intelligent automations, internal copilots — production-grade, evaluated, and tied to clear business metrics.</p>
          <ul className="feature-list-small">
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Knowledge-base chatbots.</strong> RAG over your docs, support history and APIs. Deflects 60%+ of tickets.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Workflow automations.</strong> Triage tickets, draft replies, classify documents, summarize calls — all in your stack.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Internal copilots.</strong> Custom agents that know your data, follow your rules, and integrate with Slack/email.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Evals &amp; safety.</strong> We don't ship until quality crosses your benchmark. Then we monitor in production.</span></li>
          </ul>
          <Link className="btn btn-ghost" style={{ marginTop: '24px' }} href="/contact">Start an AI project <span className="arrow">→</span></Link>
        </div>
        <div className="service-visual reveal" style={{ transitionDelay: '.1s' }}>
          <div className="ai-head" style={{ marginBottom: '14px' }}><div className="ai-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg></div><div><div className="ai-title">Nova · Trained on your docs</div><div className="ai-sub"><span className="live"></span> Production · 24/7</div></div></div>
          <div className="msg bot" style={{ maxWidth: '100%', marginBottom: '8px' }}>How do I reset the device pairing on my Aurora hub?</div>
          <div className="msg user" style={{ alignSelf: 'flex-end', marginLeft: 'auto', maxWidth: '90%', marginBottom: '8px' }}>Hold the power button for 8 seconds until the LED flashes blue. Then re-add the device from Settings → Devices → Add new.</div>
          <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', fontSize: '12.5px', color: '#6ee7b7' }}>
            ✓ Answered from <b>support-kb/aurora-hub.md</b> · 0.4s · helpful: 4.8 / 5
          </div>
        </div>
      </div>

  
      <div className="service-detail reverse">
        <div className="reveal">
          <div className="section-eyebrow">04 · Custom Software</div>
          <h2>Systems that fit <span className="serif-italic">your</span> operation.</h2>
          <p className="lead">CRMs, booking engines, internal tools, B2B portals. When the SaaS market doesn't have your shape, we build the exact thing.</p>
          <ul className="feature-list-small">
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Custom CRMs.</strong> Lead-to-renewal pipelines tuned to your sales motion, with the integrations you actually use.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Booking systems.</strong> Calendars, slots, payments, reminders. For clinics, studios, restaurants, consultants.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>Internal admin tools.</strong> Replace your spreadsheet patchwork with a real role-aware app.</span></li>
            <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span><strong>B2B portals.</strong> Customer-facing apps tied into your existing data and operations.</span></li>
          </ul>
          <Link className="btn btn-ghost" style={{ marginTop: '24px' }} href="/contact">Start a custom build <span className="arrow">→</span></Link>
        </div>
        <div className="service-visual reveal" style={{ transitionDelay: '.1s' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-3)', marginBottom: '12px', letterSpacing: '0.04em' }}>OPERATIONS DASHBOARD</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div className="kpi"><div className="kpi-label">Open orders</div><div className="kpi-value">412</div></div>
            <div className="kpi"><div className="kpi-label">Inventory low</div><div className="kpi-value accent">7</div></div>
            <div className="kpi"><div className="kpi-label">Staff today</div><div className="kpi-value">23</div></div>
            <div className="kpi"><div className="kpi-label">Revenue MTD</div><div className="kpi-value">$84k</div></div>
          </div>
          <div style={{ marginTop: '14px', padding: '12px 14px', background: 'rgba(255,255,255,0.015)', border: '1px solid var(--border-2)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Approve refund</span><span className="pill" style={{ background: 'rgba(248,113,113,0.1)', color: '#fca5a5' }}>action</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Restock — SKU 142</span><span className="pill" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>soon</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}><span>Schedule shift change</span><span className="pill" style={{ background: 'var(--accent-soft)', color: 'var(--accent-2)' }}>today</span></div>
          </div>
        </div>
      </div>
    </section>


    <section className="section">
      <div className="container">
        <header className="section-header center reveal">
          <div className="section-eyebrow">Pricing</div>
          <h2 className="section-title">Engagement <span className="serif-italic">models.</span></h2>
          <p className="section-sub">Three ways to work with us. Most clients pick Sprint or Build.</p>
        </header>
        <div className="pricing-grid reveal-stagger">
          <div className="pricing-card">
            <h3>Audit</h3>
            <p className="desc">A focused review of your existing product, codebase or design.</p>
            <div className="pricing-price">$2,500<span className="unit"> · fixed</span></div>
            <ul>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>1-week turnaround</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Written findings doc</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Prioritized fix list</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>90-min readout call</li>
            </ul>
            <Link className="btn btn-ghost" href="/contact">Get an audit</Link>
          </div>
          <div className="pricing-card featured">
            <span className="pricing-badge">Most chosen</span>
            <h3>Sprint</h3>
            <p className="desc">A focused 2-week sprint to design, prototype or build a feature.</p>
            <div className="pricing-price">from $8,500<span className="unit"> / sprint</span></div>
            <ul>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Senior designer + engineer</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Working prototype or feature</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Weekly demos</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Async Slack channel</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Continuation discount</li>
            </ul>
            <Link className="btn btn-primary" href="/contact">Start a sprint <span className="arrow">→</span></Link>
          </div>
          <div className="pricing-card">
            <h3>Build</h3>
            <p className="desc">End-to-end product delivery — design, build, ship, support.</p>
            <div className="pricing-price">from $25k<span className="unit"> · scoped</span></div>
            <ul>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Dedicated 3-person team</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Fixed scope &amp; milestones</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Production launch</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>30 days free support</li>
              <li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>Optional retainer</li>
            </ul>
            <Link className="btn btn-ghost" href="/contact">Scope a build</Link>
          </div>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '13px', marginTop: '32px' }}>
          Not sure which fits? <Link href="/book" style={{ color: 'var(--accent-2)' }}>Book a free 30-min consultation</Link> and we'll help you decide.
        </p>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '0' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Found something? <span className="serif-italic">Let's start.</span></h2>
          <p>Tell us a little about your project — we'll come back within 24 hours with a clear next step.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary btn-lg" href="/contact">Start Your Project <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost btn-lg" href="/book">Book a Call</Link>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
