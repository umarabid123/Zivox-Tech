import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="page active" data-page="about">

    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <span>About</span>
        </div>
        <h1>Software built by <span className="serif-italic">people</span> who care.</h1>
        <p className="lead">Zivox is a small, senior team of designers and engineers helping ambitious teams turn ideas into production-grade software — fast, calmly, and without the usual agency noise.</p>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '80px' }}>
      <div className="container">
        <div className="big-stats reveal-stagger">
          <div className="big-stat">
            <div className="big-stat-num"><span className="counter" data-counter="120">0</span><span className="serif-italic" style={{ color: 'var(--accent-2)' }}>+</span></div>
            <div className="big-stat-label">Projects shipped since 2021</div>
          </div>
          <div className="big-stat">
            <div className="big-stat-num"><span className="counter" data-counter="14">0</span></div>
            <div className="big-stat-label">Countries we've worked in</div>
          </div>
          <div className="big-stat">
            <div className="big-stat-num"><span className="counter" data-counter="98">0</span><span className="serif-italic" style={{ color: 'var(--accent-2)' }}>%</span></div>
            <div className="big-stat-label">On-time delivery rate</div>
          </div>
          <div className="big-stat">
            <div className="big-stat-num"><span className="counter" data-counter="4.9">0</span></div>
            <div className="big-stat-label">Average client rating</div>
          </div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="why-grid">
          <div className="reveal">
            <div className="section-eyebrow">Our story</div>
            <h2 className="section-title">A studio born from <span className="serif-italic">frustration</span> with how agencies work.</h2>
          </div>
          <div className="reveal" style={{ transitionDelay: '.1s' }}>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '0 0 18px' }}>
              We started Zivox in 2021 after years of watching agencies over-promise, drag timelines, and hand off products that nobody on the client side could maintain.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '0 0 18px' }}>
              We wanted to build the opposite — a small team of senior people who design and ship things end-to-end, communicate honestly, and treat every codebase like we'll inherit it ourselves.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '0' }}>
              Four years later, we've shipped 120+ products for teams in healthcare, education, fintech, and SaaS — and every one of them was led by someone whose name is on this page.
            </p>
          </div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header center reveal">
          <div className="section-eyebrow">Values</div>
          <h2 className="section-title">Four principles, <span className="serif-italic">every project.</span></h2>
        </header>
        <div className="services-grid reveal-stagger">
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg></div>
            <h3>Honesty over hype</h3>
            <p>We tell clients what we'd tell a friend — even when it means saying the project shouldn't happen yet, or recommending a competitor.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
            <h3>Ship weekly</h3>
            <p>Every Friday, a working demo lands on staging. No "month-three reveals", no big-bang launches, no surprises.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg></div>
            <h3>Build what survives</h3>
            <p>Architecture decisions made for year three, not week two. Clean, documented codebases that don't trap you with us.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div>
            <h3>Stay reachable</h3>
            <p>Slack channels, weekly calls, and a senior person on every reply. We aim for &lt;2 hours response time during business hours.</p>
          </article>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header center reveal">
          <div className="section-eyebrow">The team</div>
          <h2 className="section-title">Small by design. <span className="serif-italic">Senior</span> by default.</h2>
          <p className="section-sub">No juniors, no shadow contractors, no offshore hand-offs. The person who pitches you also writes the code.</p>
        </header>
        <div className="team-grid reveal-stagger">
          <div className="team-card">
            <div className="team-avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4fb3)' }}>EM</div>
            <h4>Elias Marchetti</h4>
            <p className="role">Co-founder · Engineering</p>
            <p>Ex-Stripe, 12 years in product engineering. Leads architecture and back-end builds.</p>
          </div>
          <div className="team-card">
            <div className="team-avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)' }}>PN</div>
            <h4>Priya Narang</h4>
            <p className="role">Co-founder · Design</p>
            <p>Ex-Linear, ex-Figma. Owns design across every project — from wireframe to launch.</p>
          </div>
          <div className="team-card">
            <div className="team-avatar" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>SO</div>
            <h4>Samuel Okonkwo</h4>
            <p className="role">Lead Engineer · Mobile</p>
            <p>React Native and Flutter specialist. Shipped seven apps on the App Store top 100.</p>
          </div>
          <div className="team-card">
            <div className="team-avatar" style={{ background: 'linear-gradient(135deg, #f59e0b, #b45309)' }}>LF</div>
            <h4>Léa Fournier</h4>
            <p className="role">Lead Engineer · AI</p>
            <p>Builds RAG systems and AI workflows. Previously at Anthropic and Vercel.</p>
          </div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header center reveal">
          <div className="section-eyebrow">Milestones</div>
          <h2 className="section-title">Four years, <span className="serif-italic">in brief.</span></h2>
        </header>
        <div className="timeline reveal-stagger">
          <div className="timeline-item">
            <div className="timeline-year">2021 · Q3</div>
            <h4>Zivox is born</h4>
            <p>Elias and Priya leave their day jobs and take on the first three clients out of a co-working space in Lisbon.</p>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2022 · Q4</div>
            <h4>First 25 projects shipped</h4>
            <p>Team grows to six. We start specializing in dashboards and SaaS products for venture-backed teams.</p>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2023 · Q3</div>
            <h4>AI practice launches</h4>
            <p>We add a dedicated AI/RAG practice. Léa joins. Our first chatbot deflects 60%+ of a client's support tickets.</p>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2024 · Q4</div>
            <h4>Mobile practice + 100 clients</h4>
            <p>Samuel joins to lead mobile. We cross 100 shipped projects across three continents.</p>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2026 · Today</div>
            <h4>120+ projects, fully remote</h4>
            <p>Twelve people across six countries, working with teams from seed-stage startups to Series B SaaS companies.</p>
          </div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Want to work with us? <span className="serif-italic">Let's talk.</span></h2>
          <p>We take on a small number of clients each quarter. Tell us about your project — we'll get back within 24 hours.</p>
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
