import Link from "next/link";

export default function HomeSection() {
  return (
    <section className="page active" data-page="home">

    <section id="home" className="hero">
      <div className="hero-aurora" aria-hidden="true"></div>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-text reveal">
            <span className="eyebrow"><span className="dot"></span> New · AI-Powered Solutions Live</span>
            <h1>
              Digital products,<br />
              engineered with <span className="serif-italic">intent.</span>
            </h1>
            <p className="lead">
              We design and build modern websites, mobile apps, AI assistants, and custom business systems — for ambitious startups and growing teams worldwide.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-primary btn-lg magnetic" href="/contact">
                Start Your Project
                <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/book">
                Book Consultation
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-num"><span className="counter" data-counter="120">0</span><span style={{ color: 'var(--accent-2)' }}>+</span></div>
                <div className="stat-label">Projects delivered</div>
              </div>
              <div>
                <div className="stat-num"><span className="counter" data-counter="80">0</span><span style={{ color: 'var(--accent-2)' }}>+</span></div>
                <div className="stat-label">Happy clients</div>
              </div>
              <div>
                <div className="stat-num"><span className="counter" data-counter="98">0</span><span style={{ color: 'var(--accent-2)' }}>%</span></div>
                <div className="stat-label">Satisfaction rate</div>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal" style={{ transitionDelay: '.15s' }}>
            <div className="dashboard" role="img" aria-label="Nexvora analytics dashboard preview">
              <div className="dashboard-top">
                <div className="traffic"><span></span><span></span><span></span></div>
                <div className="url">app.nexvora.tech/dashboard</div>
                <div style={{ width: '32px' }}></div>
              </div>
              <div className="dashboard-body">
                <div className="kpi-row">
                  <div className="kpi"><div className="kpi-label">MRR</div><div className="kpi-value">$42.8k</div><div className="kpi-delta">↑ 12.4%</div></div>
                  <div className="kpi"><div className="kpi-label">Active Users</div><div className="kpi-value accent">8,492</div><div className="kpi-delta">↑ 4.7%</div></div>
                  <div className="kpi"><div className="kpi-label">Conversion</div><div className="kpi-value">3.21%</div><div className="kpi-delta">↑ 0.6%</div></div>
                </div>
                <div className="chart-card">
                  <div className="chart-head">
                    <div><div className="label">Revenue · 30 days</div><div className="value">$128,420</div></div>
                    <div className="legend"><span><span className="swatch"></span> This month</span><span><span className="swatch alt"></span> Last month</span></div>
                  </div>
                  <svg className="chart-svg" viewBox="0 0 400 130" preserveAspectRatio="none">
                    <defs><linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35"></stop><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"></stop></linearGradient></defs>
                    <g stroke="#1F2128" strokeWidth="1"><line x1="0" y1="32" x2="400" y2="32"></line><line x1="0" y1="65" x2="400" y2="65"></line><line x1="0" y1="98" x2="400" y2="98"></line></g>
                    <path className="chart-line alt" d="M0,90 L40,82 L80,86 L120,75 L160,78 L200,68 L240,72 L280,60 L320,64 L360,55 L400,58"></path>
                    <path className="chart-area" d="M0,95 L40,85 L80,78 L120,62 L160,68 L200,48 L240,52 L280,32 L320,38 L360,22 L400,18 L400,130 L0,130 Z"></path>
                    <path className="chart-line" d="M0,95 L40,85 L80,78 L120,62 L160,68 L200,48 L240,52 L280,32 L320,38 L360,22 L400,18"></path>
                    <circle className="chart-dot" cx="400" cy="18" r="4"></circle>
                  </svg>
                </div>
                <div className="dash-bottom-row">
                  <div className="activity">
                    <div className="row"><span style={{ color: '#86efac' }}>●</span>New signup — Acme Corp<span className="pill">+$249</span></div>
                    <div className="row"><span style={{ color: 'var(--accent-2)' }}>●</span>Lead captured — chatbot<span className="pill">qualified</span></div>
                    <div className="row"><span style={{ color: '#fbbf24' }}>●</span>Demo booked — 3:00 PM<span className="pill">today</span></div>
                  </div>
                  <div className="donut">
                    <svg viewBox="0 0 36 36"><circle className="donut-track" cx="18" cy="18" r="15.9" fill="none" strokeWidth="3"></circle><circle className="donut-progress" cx="18" cy="18" r="15.9" fill="none" strokeWidth="3" strokeDasharray="78 100" pathLength="100"></circle></svg>
                    <div className="donut-label"><b>78%</b>Goal progress</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ai-card" aria-hidden="true">
              <div className="ai-head">
                <div className="ai-avatar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg></div>
                <div>
                  <div className="ai-title">Nova · AI Assistant</div>
                  <div className="ai-sub"><span className="live"></span> Replying to a lead</div>
                </div>
              </div>
              <div className="ai-msg">Got it — I can book a 30-min consult tomorrow at 2pm. Want me to send the invite?</div>
              <div className="typing"><span></span><span></span><span></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="trusted" aria-label="Trusted by leading teams">
      <div className="container">
        <div className="trusted-label">Trusted by ambitious teams from seed to series B</div>
        <div className="marquee">
          <div className="marquee-track">
            <span className="logo">◆ Lumen</span>
            <span className="logo">⌬ Helix Labs</span>
            <span className="logo">▲ Northpeak</span>
            <span className="logo">◐ Orbital</span>
            <span className="logo">✦ Vantage</span>
            <span className="logo">◇ Quill Studio</span>
            <span className="logo">⬡ Forge</span>
            <span className="logo">∎ Aurora</span>
            <span className="logo">◈ Cinder</span>
        
            <span className="logo" aria-hidden="true">◆ Lumen</span>
            <span className="logo" aria-hidden="true">⌬ Helix Labs</span>
            <span className="logo" aria-hidden="true">▲ Northpeak</span>
            <span className="logo" aria-hidden="true">◐ Orbital</span>
            <span className="logo" aria-hidden="true">✦ Vantage</span>
            <span className="logo" aria-hidden="true">◇ Quill Studio</span>
            <span className="logo" aria-hidden="true">⬡ Forge</span>
            <span className="logo" aria-hidden="true">∎ Aurora</span>
            <span className="logo" aria-hidden="true">◈ Cinder</span>
          </div>
        </div>
      </div>
    </section>


    <section id="services" className="section">
      <div className="container">
        <header className="section-header reveal">
          <div className="section-eyebrow">Services</div>
          <h2 className="section-title">Everything you need to <span className="serif-italic">ship</span> &amp; scale.</h2>
          <p className="section-sub">From first wireframe to production deployment — we cover the full surface area of modern software products.</p>
        </header>

        <div className="services-grid reveal-stagger">
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></div>
            <h3>Web Solutions</h3>
            <p>Marketing sites, dashboards, customer portals and e-commerce — fast, accessible, and built to convert.</p>
            <div className="tag-row"><span className="tag">Next.js</span><span className="tag">Dashboards</span><span className="tag">E-commerce</span><span className="tag">Portals</span></div>
            <Link className="learn-more" href="/services">Learn more</Link>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="12" y1="18" x2="12" y2="18.01"></line></svg></div>
            <h3>Mobile App Development</h3>
            <p>Native and cross-platform mobile experiences for iOS and Android — designed for daily use and built to perform.</p>
            <div className="tag-row"><span className="tag">React Native</span><span className="tag">Flutter</span><span className="tag">iOS</span><span className="tag">Android</span></div>
            <Link className="learn-more" href="/services">Learn more</Link>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg></div>
            <h3>AI Solutions</h3>
            <p>Smart chatbots, intelligent automations, and AI assistants that handle support, sales and operations — 24/7.</p>
            <div className="tag-row"><span className="tag">Chatbots</span><span className="tag">RAG</span><span className="tag">Automation</span><span className="tag">Assistants</span></div>
            <Link className="learn-more" href="/services">Learn more</Link>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7l8-4 8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4M12 11v10"></path></svg></div>
            <h3>Custom Software</h3>
            <p>Tailor-built CRMs, booking engines and internal tools — engineered for your exact operations, not a generic template.</p>
            <div className="tag-row"><span className="tag">CRM</span><span className="tag">Booking</span><span className="tag">Internal tools</span><span className="tag">SaaS</span></div>
            <Link className="learn-more" href="/services">Learn more</Link>
          </article>
        </div>
      </div>
    </section>


    <section id="solutions" className="section" style={{ paddingTop: '0' }}>
      <div className="container">
        <header className="section-header reveal">
          <div className="section-eyebrow">Solutions</div>
          <h2 className="section-title">Industry solutions, <span className="serif-italic">built to fit.</span></h2>
          <p className="section-sub">Patterns we've shipped across industries — adapted to your stack, branding, and workflows.</p>
        </header>
        <div className="solutions-grid reveal-stagger">
          <article className="solution-card"><div className="sol-head"><span className="sol-num">/ 01</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Education Platforms</h3><p>Course portals, LMS systems, interactive learning experiences and student dashboards.</p></article>
          <article className="solution-card"><div className="sol-head"><span className="sol-num">/ 02</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Healthcare Systems</h3><p>Patient portals, appointment management, HIPAA-mindful records and tele-health flows.</p></article>
          <article className="solution-card"><div className="sol-head"><span className="sol-num">/ 03</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Business Automation</h3><p>Workflow engines that connect tools, eliminate manual work and ship reports nightly.</p></article>
          <article className="solution-card"><div className="sol-head"><span className="sol-num">/ 04</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Booking Systems</h3><p>Calendars, slots, payments, reminders — for clinics, studios, restaurants and consultancies.</p></article>
          <article className="solution-card"><div className="sol-head"><span className="sol-num">/ 05</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Management Systems</h3><p>Internal admin panels — inventory, staff, orders, projects — fully role-aware and audited.</p></article>
          <article className="solution-card"><div className="sol-head"><span className="sol-num">/ 06</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>AI Support &amp; Sales</h3><p>RAG-powered assistants trained on your docs that answer, qualify and route in real-time.</p></article>
        </div>
      </div>
    </section>


    <section id="about" className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="why-grid">
          <div className="reveal">
            <div className="section-eyebrow">Why Nexvora</div>
            <h2 className="section-title">Engineered with <span className="serif-italic">care.</span> Delivered with rigor.</h2>
            <div className="feature-list">
              <div className="feature">
                <div className="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg></div>
                <div><h4>Lightning Fast Delivery</h4><p>Sprint-based execution. Most MVPs ship in 4–8 weeks with weekly demos and no surprises.</p></div>
              </div>
              <div className="feature">
                <div className="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div>
                <div><h4>Enterprise-Grade Security</h4><p>Hardened API routes, secure auth, encrypted data, OWASP-aligned reviews on every release.</p></div>
              </div>
              <div className="feature">
                <div className="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"></path></svg></div>
                <div><h4>Dedicated Team</h4><p>One senior designer, one senior engineer and a PM on every engagement — the people who pitched also ship.</p></div>
              </div>
              <div className="feature">
                <div className="feature-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                <div><h4>Built to Scale</h4><p>Architecture decisions made for year three, not week two — clean codebases that survive growth.</p></div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ transitionDelay: '.15s' }}>
            <div className="code-block">
              <div className="code-head"><div className="traffic"><span></span><span></span><span></span></div><span>~/nexvora/values.ts</span></div>
              <pre className="code-body"><span className="gutter">1</span><span className="kw">const</span> <span className="key">nexvora</span> = &#123;{"\n"}<span className="gutter">2</span>  <span className="key">mission</span>: <span className="str">"build software that ships"</span>,{"\n"}<span className="gutter">3</span>  <span className="key">approach</span>: [{"\n"}<span className="gutter">4</span>    <span className="str">"design before code"</span>,{"\n"}<span className="gutter">5</span>    <span className="str">"weekly demos"</span>,{"\n"}<span className="gutter">6</span>    <span className="str">"no surprises"</span>,{"\n"}<span className="gutter">7</span>  ],{"\n"}<span className="gutter">8</span>  <span className="key">stack</span>: &#123;{"\n"}<span className="gutter">9</span>    <span className="key">web</span>: <span className="str">"Next.js · TypeScript"</span>,{"\n"}<span className="gutter">10</span>    <span className="key">mobile</span>: <span className="str">"React Native · Flutter"</span>,{"\n"}<span className="gutter">11</span>    <span className="key">ai</span>: <span className="str">"OpenAI · RAG · vector DBs"</span>,{"\n"}<span className="gutter">12</span>  &#125;,{"\n"}<span className="gutter">13</span>  <span className="key">delivery</span>: <span className="num">4</span><span className="kw">..</span><span className="num">12</span><span className="kw"> as</span> <span className="key">weeks</span>,{"\n"}<span className="gutter">14</span>  <span className="comment">// ↓ what clients actually get</span>{"\n"}<span className="gutter">15</span>  <span className="key">outcomes</span>: <span className="fn">deliver</span>(&#123;{"\n"}<span className="gutter">16</span>    <span className="key">quality</span>: <span className="str">"production-grade"</span>,{"\n"}<span className="gutter">17</span>    <span className="key">timeline</span>: <span className="str">"on schedule"</span>,{"\n"}<span className="gutter">18</span>    <span className="key">support</span>: <span className="str">"post-launch, always"</span>,{"\n"}<span className="gutter">19</span>  &#125;),{"\n"}<span className="gutter">20</span>&#125;;</pre>
            </div>
          </div>
        </div>
      </div>
    </section>


    <section className="section process" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header reveal" style={{ textAlign: 'center', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Process</div>
          <h2 className="section-title" style={{ margin: '0 auto' }}>A simple, four-step <span className="serif-italic">cadence.</span></h2>
          <p className="section-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>From first call to launch day — predictable milestones, weekly progress, no black boxes.</p>
        </header>
        <div className="process-grid reveal-stagger">
          <div className="process-step"><div className="process-num">i</div><h4>Discovery</h4><p>Goals, scope, success metrics — captured in a clear written brief.</p></div>
          <div className="process-step"><div className="process-num">ii</div><h4>Design</h4><p>Wireframes, then high-fidelity prototypes you can click through and approve.</p></div>
          <div className="process-step"><div className="process-num">iii</div><h4>Develop</h4><p>Weekly demos on a staging environment. You see the product grow each Friday.</p></div>
          <div className="process-step"><div className="process-num">iv</div><h4>Deploy</h4><p>Production launch, monitoring, post-launch support and iteration.</p></div>
        </div>
      </div>
    </section>


    <section id="portfolio" className="section">
      <div className="container">
        <header className="section-header reveal">
          <div className="section-eyebrow">Portfolio</div>
          <h2 className="section-title">Recent <span className="serif-italic">work</span> we're proud of.</h2>
          <p className="section-sub">A small sample of products we've shipped — each one built end-to-end.</p>
        </header>
        <div className="portfolio-filter reveal">
          <button className="filter-btn active" data-cat="all">All Work</button>
          <button className="filter-btn" data-cat="web">Web</button>
          <button className="filter-btn" data-cat="mobile">Mobile</button>
          <button className="filter-btn" data-cat="ai">AI</button>
          <button className="filter-btn" data-cat="saas">SaaS</button>
        </div>
        <div className="portfolio-grid reveal-stagger">
          <Link href="/portfolio/helix" className="portfolio-card featured" data-cats="web,saas">
            <div className="portfolio-thumb"><div className="mock"><div className="mock-bar blue"></div><div className="mock-bar"></div><div className="mock-bar short"></div><div className="mock-grid"><div className="mock-tile blue"></div><div className="mock-tile"></div><div className="mock-tile"></div><div className="mock-tile"></div><div className="mock-tile blue"></div><div className="mock-tile"></div></div><div className="mock-bar" style={{ marginTop: '14px' }}></div><div className="mock-bar short"></div></div></div>
            <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Web</span><span className="tag">SaaS</span><span className="tag">Dashboard</span></div><h3>Helix — analytics platform for ops teams</h3><p>End-to-end dashboard product: data ingestion, query builder, custom reports and team workspaces. Built from scratch in 11 weeks.</p></div>
          </Link>
          <Link href="/portfolio" className="portfolio-card" data-cats="mobile">
            <div className="portfolio-thumb"><div className="mock" style={{ inset: '30px 60px' }}><div className="mock-bar blue"></div><div className="mock-bar short"></div><div className="mock-tile blue" style={{ aspectRatio: '2.5', marginTop: '10px' }}></div><div className="mock-bar" style={{ marginTop: '10px' }}></div><div className="mock-bar short"></div></div></div>
            <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Mobile</span><span className="tag">iOS / Android</span></div><h3>Orbital — habit tracking app</h3><p>React Native app with offline sync, gentle streak mechanics, and a personal insights engine.</p></div>
          </Link>
          <Link href="/portfolio" className="portfolio-card" data-cats="ai,saas">
            <div className="portfolio-thumb"><div className="mock"><div className="mock-bar short blue"></div><div className="mock-bar"></div><div className="mock-bar"></div><div className="mock-bar short"></div><div className="mock-tile" style={{ aspectRatio: '4', marginTop: '12px', background: 'rgba(59,130,246,0.18)' }}></div><div className="mock-bar short" style={{ marginTop: '8px' }}></div></div></div>
            <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">AI</span><span className="tag">RAG</span></div><h3>Quill — AI knowledge assistant</h3><p>RAG-powered support bot trained on a client's docs — handling 64% of tickets without escalation.</p></div>
          </Link>
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link className="btn btn-ghost btn-lg" href="/portfolio">View all work <span className="arrow">→</span></Link>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header reveal">
          <div className="section-eyebrow">Testimonials</div>
          <h2 className="section-title">What clients <span className="serif-italic">say</span> after launch.</h2>
        </header>
        <div className="testimonials-grid reveal-stagger">
          <article className="testimonial">
            <div className="stars" aria-label="5 stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
            </div>
            <p className="quote">"Nexvora shipped our internal dashboard in eight weeks. It's now the single tool our ops team opens every morning."</p>
            <div className="testimonial-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4fb3)' }}>AT</div><div><div className="author-name">Adaeze Thompson</div><div className="author-role">Head of Operations, Northpeak</div></div></div>
          </article>
          <article className="testimonial">
            <div className="stars" aria-label="5 stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
            </div>
            <p className="quote">"The AI assistant they built handles 64% of our support tickets. ROI was clear within the first month."</p>
            <div className="testimonial-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)' }}>MK</div><div><div className="author-name">Marcus Klein</div><div className="author-role">Founder, Quill Studio</div></div></div>
          </article>
          <article className="testimonial">
            <div className="stars" aria-label="5 stars">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
            </div>
            <p className="quote">"They feel like an extension of our team — weekly demos, honest answers, and a final product that looks like Linear."</p>
            <div className="testimonial-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>SR</div><div><div className="author-name">Sana Reyes</div><div className="author-role">CTO, Vantage</div></div></div>
          </article>
        </div>
      </div>
    </section>


    <section id="faq" className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header reveal" style={{ textAlign: 'center', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>FAQ</div>
          <h2 className="section-title" style={{ margin: '0 auto' }}>Questions, <span className="serif-italic">answered.</span></h2>
        </header>
        <div className="faq-wrap reveal">
          <div className="faq-item"><button className="faq-q"><span><span className="cat">Pricing</span><br />How much does a typical project cost?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">It depends on scope, but most projects fall between $5k for a marketing site and $50k+ for a full SaaS product or mobile app. We send a fixed quote after a free 30-minute discovery call, so there are no surprises mid-project.</div></div></div>
          <div className="faq-item"><button className="faq-q"><span><span className="cat">Timeline</span><br />How long does it take to ship?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Marketing sites: 2–3 weeks. Dashboards and SaaS MVPs: 6–10 weeks. Mobile apps: 8–12 weeks. AI integrations: 4–8 weeks. You'll see weekly demos on a staging environment from week two onwards.</div></div></div>
          <div className="faq-item"><button className="faq-q"><span><span className="cat">Support</span><br />What happens after launch?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Every project includes 30 days of free post-launch support — bug fixes, tweaks and onboarding help. After that, we offer ongoing retainers starting at $1,200/month for monitoring, iterations and feature work.</div></div></div>
          <div className="faq-item"><button className="faq-q"><span><span className="cat">Technology</span><br />What stack do you use?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">For web: Next.js + TypeScript + Tailwind + PostgreSQL. For mobile: React Native or Flutter. For AI: OpenAI / Anthropic + vector stores like Pinecone. We pick what's best for your project, not what's trendy.</div></div></div>
          <div className="faq-item"><button className="faq-q"><span><span className="cat">Maintenance</span><br />Can you take over an existing codebase?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Yes — we regularly inherit existing apps. We start with a code audit (free), document findings, then propose a clear path forward: stabilize, refactor or rewrite. You decide the pace.</div></div></div>
          <div className="faq-item"><button className="faq-q"><span><span className="cat">Consultation</span><br />Is the first call really free?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Yes — completely free, no obligation. You'll get a real conversation with a senior person (not a sales rep), a written summary of what we discussed, and an honest opinion of whether we're a good fit.</div></div></div>
        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '0' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Have an idea? <span className="serif-italic">Let's build it.</span></h2>
          <p>Tell us a little about your project. We'll get back within 24 hours with next steps — or schedule a free 30-minute consultation.</p>
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
