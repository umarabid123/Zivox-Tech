import Link from "next/link";

export default function CaseStudiesSection() {
  return (
    <section className="page active" data-page="case-studies">
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Case Studies</span>
        </div>
        <span className="eyebrow"><span className="dot"></span> 3 in-depth write-ups</span>
        <h1>Case <span className="serif-italic">studies.</span></h1>
        <p className="lead">A closer look at three recent client engagements — what they came to us with, what we built, what changed afterwards.</p>
      </div>
    </section>

    <section className="container">
  
      <div className="case-row">
        <div className="reveal">
          <div className="section-eyebrow">01 · Quill Studio</div>
          <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>A support team drowning in tickets — <span className="serif-italic">cut</span> in half by AI.</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', margin: '22px 0 18px' }}>
            Quill Studio's 2-person support team was answering 800+ tickets a week. We trained a RAG chatbot on their entire help center and order history, plugged it into Intercom, and watched their queue collapse in the first week.
          </p>
          <div className="case-stat-row">
            <div className="case-stat"><div className="num">64%</div><div className="lbl">Tickets deflected</div></div>
            <div className="case-stat"><div className="num">38h</div><div className="lbl">Saved per week</div></div>
            <div className="case-stat"><div className="num">4.8</div><div className="lbl">Bot rating / 5</div></div>
          </div>
          <Link className="btn btn-ghost" style={{ marginTop: '28px' }} href="/portfolio/helix">Read full case <span className="arrow">→</span></Link>
        </div>
        <div className="reveal" style={{ transitionDelay: '.1s' }}>
          <div className="service-visual" style={{ minHeight: 'auto' }}>
            <div className="ai-head" style={{ marginBottom: '14px' }}>
              <div className="ai-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg></div>
              <div><div className="ai-title">Quill Support · AI</div><div className="ai-sub"><span className="live"></span> Trained on 2,400 articles</div></div>
            </div>
            <div className="msg bot" style={{ maxWidth: '100%', marginBottom: '8px' }}>Where's my order? I placed it 3 days ago — #Q-29481.</div>
            <div className="msg user" style={{ alignSelf: 'flex-end', marginLeft: 'auto', maxWidth: '90%', marginBottom: '8px' }}>Hi! Order Q-29481 shipped yesterday via DHL — tracking ABCD12345. Estimated arrival: Friday.</div>
            <div style={{ marginTop: '12px', padding: '10px 12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', fontSize: '12px', color: '#6ee7b7' }}>✓ Resolved · 0.6s · helpful</div>
          </div>
        </div>
      </div>

  
      <div className="case-row reverse">
        <div className="reveal">
          <div className="section-eyebrow">02 · Northpeak Operations</div>
          <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>From seven spreadsheets to <span className="serif-italic">one</span> source of truth.</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', margin: '22px 0 18px' }}>
            Northpeak ran a $40M business on a patchwork of Google Sheets and a one-day-stale Looker dashboard. We designed and built Helix, their internal analytics platform, in 11 weeks — from blank slate to multi-tenant production.
          </p>
          <div className="case-stat-row">
            <div className="case-stat"><div className="num">11w</div><div className="lbl">Design + build</div></div>
            <div className="case-stat"><div className="num">23%</div><div className="lbl">DAU at launch</div></div>
            <div className="case-stat"><div className="num">$280k</div><div className="lbl">Annual ops savings</div></div>
          </div>
          <Link className="btn btn-ghost" style={{ marginTop: '28px' }} href="/portfolio/helix">Read full case <span className="arrow">→</span></Link>
        </div>
        <div className="reveal" style={{ transitionDelay: '.1s' }}>
          <div className="service-visual" style={{ minHeight: 'auto' }}>
            <div className="kpi-row">
              <div className="kpi"><div className="kpi-label">Revenue MTD</div><div className="kpi-value">$1.2M</div><div className="kpi-delta">↑ 18%</div></div>
              <div className="kpi"><div className="kpi-label">Pipeline</div><div className="kpi-value accent">$4.8M</div><div className="kpi-delta">↑ 22%</div></div>
            </div>
            <div style={{ marginTop: '14px' }} className="chart-card">
              <div className="chart-head"><div><div className="label">Daily active teams</div><div className="value">142</div></div></div>
              <svg style={{ width: '100%', height: '80px' }} viewBox="0 0 400 80" preserveAspectRatio="none">
                <path d="M0,60 L40,52 L80,46 L120,40 L160,32 L200,28 L240,22 L280,18 L320,14 L360,10 L400,8" stroke="#3B82F6" strokeWidth="2" fill="none"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

  
      <div className="case-row">
        <div className="reveal">
          <div className="section-eyebrow">03 · Orbital Health</div>
          <h2 style={{ fontSize: 'clamp(28px, 3.4vw, 42px)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>A habit-tracking app users <span className="serif-italic">actually</span> stick with.</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-2)', lineHeight: '1.65', margin: '22px 0 18px' }}>
            Orbital's first app shipped in 2022 had a 12% day-7 retention. We rebuilt it in React Native with a new onboarding, gentle streak mechanics, and an offline-first sync layer. Day-7 retention tripled.
          </p>
          <div className="case-stat-row">
            <div className="case-stat"><div className="num">36%</div><div className="lbl">Day-7 retention</div></div>
            <div className="case-stat"><div className="num">4.7</div><div className="lbl">App Store rating</div></div>
            <div className="case-stat"><div className="num">2.4×</div><div className="lbl">Session length</div></div>
          </div>
          <Link className="btn btn-ghost" style={{ marginTop: '28px' }} href="/portfolio/helix">Read full case <span className="arrow">→</span></Link>
        </div>
        <div className="reveal" style={{ transitionDelay: '.1s' }}>
          <div className="service-visual" style={{ minHeight: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '320px', margin: '0 auto' }}>
              <div style={{ aspectRatio: '9/16', background: 'var(--bg-elev)', borderRadius: '18px', border: '1px solid var(--border-2)', padding: '14px' }}>
                <div style={{ height: '6px', width: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', margin: '0 auto 14px' }}></div>
                <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Today</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '17px', fontWeight: '600', letterSpacing: '-0.02em', margin: '4px 0 12px' }}>Morning, Sam.</div>
                <div style={{ padding: '8px 10px', background: 'var(--accent-soft)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '8px' }}><div style={{ fontSize: '9px', color: 'var(--accent-2)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Streak</div><div style={{ fontSize: '22px', color: 'var(--accent-2)', fontWeight: '600' }}>14 d</div></div>
              </div>
              <div style={{ aspectRatio: '9/16', background: 'var(--bg-elev)', borderRadius: '18px', border: '1px solid var(--border-2)', padding: '14px' }}>
                <div style={{ height: '6px', width: '50px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px', margin: '0 auto 14px' }}></div>
                <div style={{ fontSize: '11px', color: 'var(--text-3)' }}>Insights</div>
                <svg style={{ marginTop: '12px', width: '100%', height: '60px' }} viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M0,30 L20,25 L40,18 L60,12 L80,8 L100,4" stroke="#3B82F6" strokeWidth="2" fill="none"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Want a case study like <span className="serif-italic">these?</span></h2>
          <p>Tell us about your situation — we'll come back with an honest take on whether and how we can help.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary btn-lg" href="/contact">Start a conversation <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost btn-lg" href="/book">Book a Call</Link>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
