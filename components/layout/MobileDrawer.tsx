import Link from "next/link";

export default function MobileDrawer() {
  return (
    <aside className="mobile-drawer" aria-label="Mobile navigation">
      <Link href="/" data-nav="home">Home</Link>
      <Link href="/about" data-nav="about">About</Link>
      <Link href="/services" data-nav="services">Services</Link>
      <Link href="/solutions" data-nav="solutions">Solutions</Link>
      <Link href="/portfolio" data-nav="portfolio">Portfolio</Link>
      <Link href="/blog" data-nav="blog">Blog</Link>
      <Link href="/contact" data-nav="contact">Contact</Link>
      <Link className="btn btn-primary btn-lg" href="/contact">Start Project →</Link>
    </aside>
  );
}
