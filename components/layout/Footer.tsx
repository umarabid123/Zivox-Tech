import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-about">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true"></span>
              <span className="brand-name">Zivoxtech<span>.</span></span>
            </Link>
            <p>Modern digital solutions for ambitious startups and growing businesses worldwide. Web, mobile, AI, and custom software — engineered with care.</p>

          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link href="/services">Web Development</Link></li>
              <li><Link href="/services">Mobile Apps</Link></li>
              <li><Link href="/services">AI Solutions</Link></li>
              <li><Link href="/services">Custom Software</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/book">Book Consultation</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
          <div className="footer-col footer-newsletter">
            <h5>Newsletter</h5>
            <p style={{ fontSize: '13.5px', color: 'var(--text-2)', margin: '0 0 14px', lineHeight: '1.55' }}>A monthly note on building software well. No fluff, no spam.</p>
            <form className="newsletter">
              <input type="email" placeholder="you@company.com" aria-label="Email" required />
              <button type="submit" aria-label="Subscribe">
                Subscribe
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg>
              </button>
            </form>
            <div className="newsletter-note">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              We never share your email. Unsubscribe anytime.
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="copy">
            <span>© 2026 Zivoxtech.</span>
            <span className="sep"></span>
            <span>Crafted in Lisbon</span>
            <span className="sep"></span>
            <Link href="/privacy">Privacy</Link>
            <span className="sep"></span>
            <Link href="/terms">Terms</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div className="socials">
              <a href="https://www.instagram.com/zivoxtech" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="https://www.linkedin.com/in/zivoxtech" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              <a href="https://github.com/zivoxtech" aria-label="GitHub"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
              <a href="https://www.facebook.com/zivoxtech1" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
              <a href="https://twitter.com/zivoxtech" aria-label="X / Twitter"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
              
              <a href="#" aria-label="Dribbble"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72M19.5 5.5c-3.2 1.5-5 2.5-7 2.5-2.5 0-4.5-.5-7-2M2.5 13.5c2-1 4.5-2 7-2 4 0 6 1.5 9.5 5"></path></svg></a>
            </div>
            <button className="back-to-top" aria-label="Back to top">
              Back to top
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
