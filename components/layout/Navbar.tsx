import Link from "next/link";

export default function Navbar() {
  return (
    <header className="nav" role="banner">
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="Nexvora Tech home">
          <span className="brand-mark" aria-hidden="true"></span>
          <span className="brand-name">Nexvora<span>.</span></span>
        </Link>
        <nav aria-label="Primary">
          <ul className="nav-links">
            <li><Link href="/" data-nav="home">Home</Link></li>
            <li><Link href="/about" data-nav="about">About</Link></li>
            <li><Link href="/services" data-nav="services">Services</Link></li>
            <li><Link href="/solutions" data-nav="solutions">Solutions</Link></li>
            <li><Link href="/portfolio" data-nav="portfolio">Portfolio</Link></li>
            <li><Link href="/blog" data-nav="blog">Blog</Link></li>
            <li><Link href="/contact" data-nav="contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="nav-cta">
          <button className="theme-toggle" aria-label="Toggle theme">
            <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            <svg className="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path></svg>
          </button>
          <Link className="btn btn-primary magnetic" href="/contact">
            Start Project
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <button className="hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
