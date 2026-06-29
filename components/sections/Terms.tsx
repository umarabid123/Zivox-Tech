import Link from "next/link";

export default function TermsSection() {
  return (
    <section className="page active" data-page="terms">
    <section className="page-header" style={{ paddingBottom: '40px', borderBottom: '0' }}>
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Terms</span>
        </div>
        <h1>Terms &amp; <span className="serif-italic">Conditions.</span></h1>
        <p className="lead">The rules of engagement for our site and services. Short, in plain English.</p>
      </div>
    </section>

    <div className="container">
      <div className="legal">
        <span className="legal-updated">Last updated: May 23, 2026</span>

        <h2>1. Who we are</h2>
        <p>Zivoxtech (&quot;we&quot;, &quot;us&quot;) is a software design and development studio. By using this website, you (&quot;you&quot;) agree to these terms. If you don&apos;t agree, please don&apos;t use it.</p>

        <h2>2. Using the website</h2>
        <p>You can browse, read, share and link to the site freely. You can't:</p>
        <ul>
          <li>Scrape it at a rate that disrupts service.</li>
          <li>Republish entire articles or large excerpts without attribution and a link back.</li>
          <li>Use our brand to imply endorsement of something we haven't endorsed.</li>
          <li>Try to break into the site, send spam through our forms, or otherwise be a nuisance.</li>
        </ul>

        <h2>3. Forms, bookings, newsletters</h2>
        <p>By submitting a form, booking a call, or subscribing to our newsletter, you agree to receive related communications (a confirmation email, the requested follow-up, monthly notes). You can unsubscribe at any time from the link in every email.</p>

        <h2>4. Project engagements</h2>
        <p>Anything you read on this site — including pricing ranges, timelines, or services described — is informational only. Actual engagements are governed by a separately signed Statement of Work or Master Services Agreement. In case of conflict, the signed agreement wins.</p>

        <h2>5. Intellectual property</h2>
        <p>Content on this site — text, design, code shown in articles, logos — is © Zivoxtech. Logos, names, and trademarks of our clients shown on the site (e.g. in case studies) belong to their respective owners and are used with permission.</p>
        <p>Code released to clients in our paid engagements transfers to the client per the signed agreement.</p>

        <h2>6. Third-party links</h2>
        <p>We link to external sites for context. We don't control them and aren't responsible for their content.</p>

        <h2>7. Disclaimer</h2>
        <p>The site is provided "as is". We make reasonable efforts to keep it accurate and available, but we can't guarantee zero errors, zero downtime, or fitness for any specific purpose. To the maximum extent allowed by law, we limit liability to what's covered in your signed engagement (if any) or, otherwise, to €100.</p>

        <h2>8. Changes</h2>
        <p>We may update these terms over time. The "last updated" date at the top reflects the current version. For material changes, we'll flag them prominently for 30 days.</p>

        <h2>9. Governing law</h2>
        <p>These terms are governed by the laws of Portugal. Any disputes go to the courts of Lisbon, unless local consumer-protection law gives you a stronger forum.</p>

        <h2>10. Contact</h2>
        <p>Questions or concerns? Email <a href="mailto:legal@zivox.tech" style={{ color: 'var(--accent-2)' }}>legal@zivox.tech</a> or use the <Link href="/contact" style={{ color: 'var(--accent-2)' }}>contact form</Link>.</p>
      </div>
    </div>
    </section>
  );
}
