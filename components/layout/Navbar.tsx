"use client";

import Link from "next/link";
import { useScroll, useMotionValueEvent, motion } from "framer-motion";
import { useState } from "react";

const springTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] } as const;
const bgTransition = { duration: 0.85, ease: [0.22, 1, 0.36, 1] } as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    // Animate width and top position, keep perfectly centered
    <motion.header
      className={`nav${scrolled ? " scrolled" : ""}`}
      role="banner"
      initial={false}
      style={{ left: "50%", x: "-50%" }}
      animate={
        scrolled
          ? { width: "100%", top: 0 }
          : { width: "80%", top: 14 }
      }
      transition={springTransition}
    >
      {/* nav-inner: position:relative + overflow:hidden set in CSS */}
      <motion.div
        className="nav-inner"
        initial={false}
        animate={
          scrolled
            ? { borderRadius: "20px", backdropFilter: "saturate(210%) blur(28px)" }
            : { borderRadius: "14px", backdropFilter: "saturate(180%) blur(18px)" }
        }
        transition={springTransition}
      >
        {/*
          ── Center-expanding background overlay ──────────────────────────
          Sits at z-index 0 behind all content.
          scaleX goes 0→1 (scrolled) or 1→0 (top), growing/shrinking from
          the centre of the navbar thanks to transformOrigin: "center".
        */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: scrolled ? 1 : 0 }}
          transition={bgTransition}
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--nav-bg-scrolled)",
            transformOrigin: "center",
            zIndex: 0,
            borderRadius: "inherit",
            // Soft shadow visible only when expanded
            boxShadow: scrolled
              ? "0 8px 40px -10px rgba(0,0,0,0.5), 0 2px 0 rgba(255,255,255,0.05) inset"
              : "none",
          }}
        />

        {/* ── Content (z-index 1, above bg overlay) ───────────────────── */}
        <Link
          className="brand"
          href="/"
          aria-label="Zivoxtech home"
          style={{ position: "relative", zIndex: 1 }}
        >
          <span className="brand-mark" aria-hidden="true"></span>
          <span className="brand-name">Zivoxtech<span>.</span></span>
        </Link>

        <nav aria-label="Primary" style={{ position: "relative", zIndex: 1 }}>
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

        <div className="nav-cta" style={{ position: "relative", zIndex: 1 }}>
          <button className="theme-toggle" aria-label="Toggle theme">
            <svg className="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
            <svg className="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
            </svg>
          </button>
          <Link className="btn btn-primary magnetic" href="/contact">
            Start Project
            <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <button className="hamburger" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span>
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
