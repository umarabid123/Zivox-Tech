import Link from "next/link";

export default function PrivacySection() {
  return (
    <section className="page active" data-page="privacy">
    <section className="page-header" style={{ paddingBottom: '40px', borderBottom: '0' }}>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Privacy</span>
        </div>
        <h1>Privacy <span className="serif-italic">Policy.</span></h1>
        <p className="lead">A plain-language summary of how we handle your data.</p>
      </div>
    </section>

    <div className="container">
      <div className="legal">
        <span className="legal-updated">Last updated: May 23, 2026</span>

        <h2>1. What we collect</h2>
        <p>We collect only what we need to run our website and respond to you. That includes:</p>
        <ul>
          <li><strong>Contact info you give us</strong> — name, email, phone, company, and project details when you fill in a form or send us an email.</li>
          <li><strong>Booking info</strong> — when you book a consultation, we collect the date, time and your selected topic.</li>
          <li><strong>Usage data</strong> — anonymized page views, referrers, and rough location (country/region), via a privacy-respecting analytics tool. No third-party tracking pixels.</li>
          <li><strong>Cookies</strong> — only strictly necessary cookies. No advertising or cross-site tracking cookies.</li>
        </ul>

        <h2>2. How we use it</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Respond to your inquiries and deliver projects.</li>
          <li>Confirm and remind you of bookings.</li>
          <li>Improve the website (mostly: figure out which posts you find useful).</li>
          <li>Send our monthly newsletter — only if you've opted in. One click to unsubscribe.</li>
        </ul>
        <p>We do <strong>not</strong> sell your data, ever. We do not share it with advertisers or marketing brokers.</p>

        <h2>3. How long we keep it</h2>
        <p>Form submissions are kept for up to 24 months in our CRM unless you ask us to delete them sooner. Anonymized analytics data is kept for 12 months. Newsletter subscribers stay until they unsubscribe.</p>

        <h2>4. Who we share it with</h2>
        <p>We use a small set of trusted vendors to operate. They each see only the data they need:</p>
        <ul>
          <li><strong>Resend</strong> — to send transactional emails (form confirmations, booking reminders).</li>
          <li><strong>Vercel</strong> — to host the website.</li>
          <li><strong>Supabase</strong> — to store form submissions in a private database.</li>
          <li><strong>Plausible</strong> — for privacy-friendly, cookie-less analytics.</li>
        </ul>
        <p>All vendors are GDPR-aligned. We never grant them rights to use your data for their own purposes.</p>

        <h2>5. Your rights</h2>
        <p>If you're in the EU/UK/Switzerland (or anywhere with similar laws), you have the right to:</p>
        <ul>
          <li>Ask what data we have about you.</li>
          <li>Ask us to correct or delete it.</li>
          <li>Object to specific uses.</li>
          <li>Receive a portable copy.</li>
        </ul>
        <p>Just email us at <a href="mailto:privacy@nexvora.tech" style={{ color: 'var(--accent-2)' }}>privacy@nexvora.tech</a>. We'll respond within 30 days, usually much sooner.</p>

        <h2>6. Children</h2>
        <p>Our services aren't directed at children under 16, and we don't knowingly collect their data.</p>

        <h2>7. International transfers</h2>
        <p>We're based in the EU. Some of our vendors are in the US. We use Standard Contractual Clauses where required and only transfer data with appropriate safeguards.</p>

        <h2>8. Changes</h2>
        <p>If we update this policy, we'll update the date at the top and — for material changes — notify newsletter subscribers and anyone with an active project.</p>

        <h2>9. Contact</h2>
        <p>Questions? Concerns? Bug us at <a href="mailto:privacy@nexvora.tech" style={{ color: 'var(--accent-2)' }}>privacy@nexvora.tech</a> or via our <Link href="/contact" style={{ color: 'var(--accent-2)' }}>contact form</Link>. We read everything.</p>
      </div>
    </div>
    </section>
  );
}
