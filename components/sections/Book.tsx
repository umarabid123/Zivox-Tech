import Link from "next/link";

export default function BookSection() {
  return (
    <section className="page active" data-page="book">
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Book Consultation</span>
        </div>
        <span className="eyebrow"><span className="dot"></span> Free · 30 min · senior team</span>
        <h1>Book a <span className="serif-italic">consultation.</span></h1>
        <p className="lead">Pick a time that works. You'll get an honest 30 minutes with a senior person — no sales pitches.</p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
    
        <div className="book-grid reveal" id="bookFlow">
          <div className="book-info">
            <div className="section-eyebrow">What's included</div>
            <h2>A real 30-minute <span className="serif-italic">conversation.</span></h2>
            <p className="lead">No deck. No script. Bring your project, your constraints, and your questions.</p>
            <div className="item"><span className="ic">⌚</span><div><b>30 minutes</b><div style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>Calendar invite + Google Meet link</div></div></div>
            <div className="item"><span className="ic">👤</span><div><b>Senior person</b><div style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>Founder or lead engineer — not a BDR</div></div></div>
            <div className="item"><span className="ic">📝</span><div><b>Written summary</b><div style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>Notes &amp; recommendations within 24h</div></div></div>
            <div className="item"><span className="ic">🚫</span><div><b>No obligation</b><div style={{ fontSize: '13px', color: 'var(--text-3)', marginTop: '2px' }}>Truly free. Even if we're not a fit, you'll leave with useful direction.</div></div></div>
          </div>

          <div className="calendar">
            <div className="cal-head">
              <div>
                <h3 id="calMonth">May 2026</h3>
                <div style={{ fontSize: '12.5px', color: 'var(--text-3)', marginTop: '4px' }}>All times in your local timezone</div>
              </div>
              <div className="cal-nav">
                <button id="prevMonth" aria-label="Previous month"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                <button id="nextMonth" aria-label="Next month"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
              </div>
            </div>

            <div className="cal-grid" id="calDows">
              <div className="cal-dow">Mon</div><div className="cal-dow">Tue</div><div className="cal-dow">Wed</div>
              <div className="cal-dow">Thu</div><div className="cal-dow">Fri</div><div className="cal-dow">Sat</div><div className="cal-dow">Sun</div>
            </div>
            <div className="cal-grid" id="calDays"></div>

            <div id="slotsWrap" style={{ display: 'none' }}>
              <div className="slot-grid" id="slots"></div>
            </div>

            <button className="btn btn-primary" id="continueBtn" style={{ marginTop: '24px', width: '100%', padding: '14px' }} disabled>
              Select a time to continue
            </button>
          </div>
        </div>

    
        <div id="detailsStep" style={{ display: 'none', maxWidth: '640px', margin: '0 auto' }}>
          <button className="btn btn-ghost" id="backToCal" style={{ marginBottom: '24px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back to calendar
          </button>
          <form className="contact-form" id="bookForm" noValidate>
            <h3 style={{ marginBottom: '20px' }}>Tell us a little about you</h3>
            <div id="selectedSummary" style={{ marginBottom: '24px', padding: '14px 16px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: 'var(--accent-2)' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span>
              <span style={{ fontSize: '14px', color: 'var(--text)' }} id="summaryText">Selected time</span>
            </div>
            <div className="field-row">
              <div className="field"><label>Full Name <span className="req">*</span></label><input type="text" placeholder="Jane Doe" data-validate="required" /><span className="error-msg">Required</span></div>
              <div className="field"><label>Email <span className="req">*</span></label><input type="email" placeholder="jane@company.com" data-validate="required,email" /><span className="error-msg">Valid email required</span></div>
            </div>
            <div className="field">
              <label>What's the project about?</label>
              <textarea placeholder="A brief sketch — we'll come prepared." style={{ minHeight: '90px' }}></textarea>
            </div>
            <button className="btn btn-primary form-submit" type="submit">Confirm Booking <span className="arrow">→</span></button>
          </form>
        </div>

    
        <div id="confirmStep" style={{ display: 'none' }}>
          <div className="confirm-card">
            <div className="check-big">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h2>You're booked.</h2>
            <p>We've sent a calendar invite and confirmation email. A team member will reach out with a Google Meet link 1 hour before.</p>
            <div className="confirm-detail">
              <div className="row"><span className="label">When</span><span className="val" id="confirmWhen">—</span></div>
              <div className="row"><span className="label">Duration</span><span className="val">30 minutes</span></div>
              <div className="row"><span className="label">Where</span><span className="val">Google Meet (link incoming)</span></div>
              <div className="row"><span className="label">Reminders</span><span className="val">24h &amp; 1h before</span></div>
            </div>
            <Link className="btn btn-ghost" href="/">Back to home</Link>
          </div>
        </div>
      </div>
    </section>
    </section>
  );
}
