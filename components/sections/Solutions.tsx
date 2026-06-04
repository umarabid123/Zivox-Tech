import Link from "next/link";

export default function SolutionsSection() {
  return (
    <section className="page active" data-page="solutions">
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Solutions</span>
        </div>
        <span className="eyebrow"><span className="dot"></span> 6 industries · proven patterns</span>
        <h1>Solutions, <span className="serif-italic">built to fit.</span></h1>
        <p className="lead">Reusable patterns we've shipped across industries — adapted to your stack, branding and workflows.</p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '80px' }}>
      <div className="container">
        <div className="solutions-grid reveal-stagger" style={{ gridTemplateColumns: '1fr 1fr' }}>

          <article className="solution-card" style={{ padding: '32px' }}>
            <div className="sol-head">
              <span className="sol-num">/ 01 — EDUCATION</span>
              <div className="service-icon" style={{ marginBottom: '0' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg></div>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Education Platforms</h3>
            <p>Course portals, LMS systems, interactive learning experiences and student dashboards. Built for cohorts of 10 or 10,000.</p>
            <ul className="feature-list-small" style={{ marginTop: '20px' }}>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Video-based course delivery</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Cohort dashboards &amp; progress tracking</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Quizzes, certificates, badges</span></li>
            </ul>
          </article>

          <article className="solution-card" style={{ padding: '32px' }}>
            <div className="sol-head">
              <span className="sol-num">/ 02 — HEALTHCARE</span>
              <div className="service-icon" style={{ marginBottom: '0' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Healthcare Systems</h3>
            <p>Patient portals, appointment management, HIPAA-mindful records, telehealth flows. Calm UX for clinicians and patients.</p>
            <ul className="feature-list-small" style={{ marginTop: '20px' }}>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>HIPAA-aligned data handling</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Telehealth video integration</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Insurance + billing integrations</span></li>
            </ul>
          </article>

          <article className="solution-card" style={{ padding: '32px' }}>
            <div className="sol-head">
              <span className="sol-num">/ 03 — AUTOMATION</span>
              <div className="service-icon" style={{ marginBottom: '0' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></div>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Business Automation</h3>
            <p>Workflow engines that connect your tools, eliminate manual work, and ship reports while you sleep.</p>
            <ul className="feature-list-small" style={{ marginTop: '20px' }}>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Custom workflow engines</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Slack, Email, Stripe, HubSpot integrations</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Scheduled reports &amp; alerting</span></li>
            </ul>
          </article>

          <article className="solution-card" style={{ padding: '32px' }}>
            <div className="sol-head">
              <span className="sol-num">/ 04 — BOOKING</span>
              <div className="service-icon" style={{ marginBottom: '0' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Booking Systems</h3>
            <p>Calendars, slot availability, deposits, reminders. For clinics, studios, restaurants, consultancies and field services.</p>
            <ul className="feature-list-small" style={{ marginTop: '20px' }}>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Multi-resource scheduling</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Stripe deposits, refunds, no-show fees</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>SMS &amp; email reminders</span></li>
            </ul>
          </article>

          <article className="solution-card" style={{ padding: '32px' }}>
            <div className="sol-head">
              <span className="sol-num">/ 05 — MANAGEMENT</span>
              <div className="service-icon" style={{ marginBottom: '0' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>Management Systems</h3>
            <p>Internal admin panels — inventory, staff, orders, projects. Fully role-aware, audited, and ready to replace spreadsheets.</p>
            <ul className="feature-list-small" style={{ marginTop: '20px' }}>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Role-based access &amp; audit logs</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>CSV imports, bulk edits</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Reports, exports, dashboards</span></li>
            </ul>
          </article>

          <article className="solution-card" style={{ padding: '32px' }}>
            <div className="sol-head">
              <span className="sol-num">/ 06 — AI SUPPORT</span>
              <div className="service-icon" style={{ marginBottom: '0' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg></div>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '12px' }}>AI Support &amp; Sales</h3>
            <p>RAG-powered assistants trained on your docs that answer, qualify, and route conversations in real-time.</p>
            <ul className="feature-list-small" style={{ marginTop: '20px' }}>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Custom-trained on your knowledge base</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Lead capture &amp; CRM routing</span></li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span><span>Hand-off to human when needed</span></li>
            </ul>
          </article>

        </div>
      </div>
    </section>


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <header className="section-header center reveal">
          <div className="section-eyebrow">How we tailor</div>
          <h2 className="section-title">Patterns, <span className="serif-italic">not</span> templates.</h2>
          <p className="section-sub">Every solution is rebuilt for your team — same proven shape, completely new code and design tuned to fit.</p>
        </header>
        <div className="services-grid reveal-stagger">
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20l9-7-9-7-9 7 9 7zM12 4v16"></path></svg></div>
            <h3>Discovery first</h3>
            <p>We learn your workflow before proposing anything. Bring spreadsheets, screenshots, half-finished projects — all useful.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 3"></path></svg></div>
            <h3>Adapt the pattern</h3>
            <p>We take a proven shape and bend it to your terminology, roles, and existing tools — not the other way around.</p>
          </article>
          <article className="service-card">
            <div className="service-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
            <h3>You own the code</h3>
            <p>Clean, documented codebases delivered on your GitHub. You can hire anyone to extend it — including us.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '0' }}>
      <div className="container">
        <div className="cta-box reveal">
          <h2>Got an industry we missed? <span className="serif-italic">Tell us.</span></h2>
          <p>We've shipped in plenty of niches not listed here. Send us your context and we'll tell you if and how we can help.</p>
          <div className="cta-actions">
            <Link className="btn btn-primary btn-lg" href="/contact">Start a conversation <span className="arrow">→</span></Link>
            <Link className="btn btn-ghost btn-lg" href="/portfolio">See our work</Link>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
