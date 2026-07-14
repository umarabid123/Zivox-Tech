"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import HeroOrbital from "@/components/ui/HeroOrbital";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroScene = dynamic(() => import("@/components/ui/HeroScene"), {
  ssr: false,
  loading: () => <div style={{ height: "450px", width: "100%", background: "transparent" }} />
});

const SERVICES = [
  {
    title: "Web Solutions",
    description: "Marketing sites, dashboards, customer portals and e-commerce — fast, accessible, and built to convert.",
    tags: ["Next.js", "Dashboards", "E-commerce", "Portals"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="2" y1="9" x2="22" y2="9"></line><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    )
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile experiences for iOS and Android — designed for daily use and built to perform.",
    tags: ["React Native", "Flutter", "iOS", "Android"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2"></rect><line x1="12" y1="18" x2="12" y2="18.01"></line>
      </svg>
    )
  },
  {
    title: "AI Solutions",
    description: "Smart chatbots, intelligent automations, and AI assistants that handle support, sales and operations — 24/7.",
    tags: ["Chatbots", "RAG", "Automation", "Assistants"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path>
      </svg>
    )
  },
  {
    title: "Custom Software",
    description: "Tailor-built CRMs, booking engines and internal tools — engineered for your exact operations, not a generic template.",
    tags: ["CRM", "Booking", "Internal tools", "SaaS"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7l8-4 8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4M12 11v10"></path>
      </svg>
    )
  },
  {
    title: "Modern Solutions",
    description: "Built with the latest technologies and industry best practices.",
    tags: ["Modern", "Tech Stack", "Performance"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    )
  },
  {
    title: "Startup Focused",
    description: "Flexible and affordable solutions designed for growing startups.",
    tags: ["Flexibility", "Affordable", "Startups"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </svg>
    )
  },
  {
    title: "Quality Assured",
    description: "Clean, scalable and secure code on every project we ship.",
    tags: ["Secure", "Clean Code", "Scalable"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    )
  },
  {
    title: "End-to-End Support",
    description: "From the first idea to launch day and beyond — we're with you.",
    tags: ["Support", "Launch", "Partnership"],
    href: "/services",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    )
  }
];

export default function HomeSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const totalItems = SERVICES.length;
  const extendedServices = [...SERVICES, ...SERVICES.slice(0, 3)];

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextVal = prev + visibleCount;
      return nextVal >= totalItems ? totalItems : nextVal;
    });
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return totalItems % visibleCount === 0 
          ? totalItems - visibleCount 
          : totalItems - (totalItems % visibleCount);
      }
      const nextVal = prev - visibleCount;
      return nextVal < 0 ? 0 : nextVal;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [visibleCount]);

  useEffect(() => {
    if (currentIndex >= totalItems) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    } else if (currentIndex === 0) {
      setIsTransitioning(true);
    }
  }, [currentIndex, totalItems]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <section className="page active" data-page="home">

      <section id="home" className="hero">
        {/* Background gradient blur layer */}
        <div className="hero-bg-blurred" />

        {/* Animated background marquee */}
        <div className="brand-carousel">
          <div className="brand-carousel-track">
            <span className="bc-word">ZIVOX TECH</span>
            <span className="bc-star">★</span>
            <span className="bc-word bc-word--outline">ZIVOX TECH</span>
            <span className="bc-star">★</span>
            <span className="bc-word">ZIVOX TECH</span>
            <span className="bc-star">★</span>
            <span className="bc-word bc-word--outline">ZIVOX TECH</span>
            <span className="bc-star">★</span>
            <span className="bc-word">ZIVOX TECH</span>
            <span className="bc-star">★</span>
            <span className="bc-word bc-word--outline">ZIVOX TECH</span>
            <span className="bc-star">★</span>
            <span className="bc-word">ZIVOX TECH</span>
            <span className="bc-star">★</span>
            <span className="bc-word bc-word--outline">ZIVOX TECH</span>
            <span className="bc-star">★</span>
          </div>
        </div>

        <div className="hero-wide-container">
          <div className="hero-grid hero-grid--two-col">
            {/* LEFT: text content */}
            <StaggerContainer className="hero-text reveal">
              <StaggerItem>
                <span className="eyebrow"><span className="dot"></span> Design · Build · Launch</span>
              </StaggerItem>
              <StaggerItem>
                <h1>
                  We build software<br />
                  that <span className="serif-italic">Grows</span><br />
                  your business.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="lead">
                  We design and develop modern websites, AI solutions, mobile apps, and custom software that help startups and businesses grow with confidence.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="hero-ctas">
                  <Link className="btn btn-primary btn-lg magnetic" href="/contact">
                    Start Your Project
                    <span className="arrow" aria-hidden="true">→</span>
                  </Link>
                  <Link className="btn btn-ghost btn-lg" href="/portfolio">
                    View Our Work <span className="arrow">→</span>
                  </Link>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* RIGHT: Framer Motion orbital diagram */}
            <HeroScene />
          </div>
        </div>
      </section>

      {/* ── Services Carousel Section ── */}
      <section id="services" className="section">
        <div className="container">
          <header className="section-header">
            <div className="section-eyebrow">Services</div>
            <h2 className="section-title">Everything you need to <span className="serif-italic">ship</span> &amp; scale.</h2>
            <p className="section-sub">From first wireframe to production deployment — we cover the full surface area of modern software products.</p>
          </header>

          <div className="services-carousel-container" style={{ position: "relative" }}>
            <button
              className="carousel-arrow carousel-arrow--left"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="carousel-arrow carousel-arrow--right"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            <div className="services-carousel-wrapper" ref={containerRef}>
              <motion.div
                className="services-carousel-track"
                drag="x"
                dragConstraints={containerRef}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `-${currentIndex * (100 / visibleCount)}%`,
                }}
                transition={
                  isTransitioning
                    ? { type: "spring", stiffness: 120, damping: 20 }
                    : { duration: 0 }
                }
              >
              {extendedServices.map((service, idx) => (
                <div
                  key={idx}
                  className="services-carousel-item"
                  style={{
                    flex: `0 0 ${100 / visibleCount}%`,
                    width: `${100 / visibleCount}%`,
                  }}
                >
                  <motion.article 
                    className="service-card"
                    whileHover={{ 
                      y: -8,
                      scale: 1.015,
                      boxShadow: "0 20px 40px -15px rgba(59,130,246,0.25)",
                      borderColor: "rgba(59, 130, 246, 0.45)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="tag-row">
                      {service.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link className="learn-more" href={service.href}>
                      Learn more
                    </Link>
                  </motion.article>
                </div>
              ))}
              </motion.div>
            </div>
          </div>

          <div className="services-carousel-dots">
            {SERVICES.map((_, idx) => (
              <button
                key={idx}
                className={`carousel-dot ${currentIndex % totalItems === idx ? "active" : ""}`}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>


      <section id="solutions" className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <AnimatedSection as="header" className="section-header reveal" variant="fadeUp">
            <div className="section-eyebrow">Solutions</div>
            <h2 className="section-title">Industry solutions, <span className="serif-italic">built to fit.</span></h2>
            <p className="section-sub">Patterns we&apos;ve shipped across industries — adapted to your stack, branding, and workflows.</p>
          </AnimatedSection>
          <StaggerContainer className="solutions-grid reveal-stagger">
            <StaggerItem><article className="solution-card"><div className="sol-head"><span className="sol-num">/ 01</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Education Platforms</h3><p>Course portals, LMS systems, interactive learning experiences and student dashboards.</p></article></StaggerItem>
            <StaggerItem><article className="solution-card"><div className="sol-head"><span className="sol-num">/ 02</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Healthcare Systems</h3><p>Patient portals, appointment management, HIPAA-mindful records and tele-health flows.</p></article></StaggerItem>
            <StaggerItem><article className="solution-card"><div className="sol-head"><span className="sol-num">/ 03</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Business Automation</h3><p>Workflow engines that connect tools, eliminate manual work and ship reports nightly.</p></article></StaggerItem>
            <StaggerItem><article className="solution-card"><div className="sol-head"><span className="sol-num">/ 04</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Booking Systems</h3><p>Calendars, slots, payments, reminders — for clinics, studios, restaurants and consultancies.</p></article></StaggerItem>
            <StaggerItem><article className="solution-card"><div className="sol-head"><span className="sol-num">/ 05</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>Management Systems</h3><p>Internal admin panels — inventory, staff, orders, projects — fully role-aware and audited.</p></article></StaggerItem>
            <StaggerItem><article className="solution-card"><div className="sol-head"><span className="sol-num">/ 06</span><span className="sol-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"></path></svg></span></div><h3>AI Support &amp; Sales</h3><p>RAG-powered assistants trained on your docs that answer, qualify and route in real-time.</p></article></StaggerItem>
          </StaggerContainer>
        </div>
      </section>


      <section id="about" className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <div className="why-grid">
            <AnimatedSection className="reveal" variant="fadeUp">
              <div className="section-eyebrow">Why Zivoxtech</div>
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
            </AnimatedSection>

            <AnimatedSection className="reveal" variant="scaleUp" delay={0.15} style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "stretch", alignItems: "stretch" }}>
              <HeroOrbital className="why-orbital" />
            </AnimatedSection>
          </div>
        </div>
      </section>


      <section className="section process" style={{ paddingTop: '40px' }}>
        <div className="container">
          <AnimatedSection as="header" className="section-header reveal" variant="fadeUp" style={{ textAlign: 'center', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Process</div>
            <h2 className="section-title" style={{ margin: '0 auto' }}>A simple, four-step <span className="serif-italic">cadence.</span></h2>
            <p className="section-sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>From first call to launch day — predictable milestones, weekly progress, no black boxes.</p>
          </AnimatedSection>
          <StaggerContainer className="process-grid reveal-stagger">
            <StaggerItem><div className="process-step"><div className="process-num">i</div><h4>Discovery</h4><p>Goals, scope, success metrics — captured in a clear written brief.</p></div></StaggerItem>
            <StaggerItem><div className="process-step"><div className="process-num">ii</div><h4>Design</h4><p>Wireframes, then high-fidelity prototypes you can click through and approve.</p></div></StaggerItem>
            <StaggerItem><div className="process-step"><div className="process-num">iii</div><h4>Develop</h4><p>Weekly demos on a staging environment. You see the product grow each Friday.</p></div></StaggerItem>
            <StaggerItem><div className="process-step"><div className="process-num">iv</div><h4>Deploy</h4><p>Production launch, monitoring, post-launch support and iteration.</p></div></StaggerItem>
          </StaggerContainer>
        </div>
      </section>


      <section id="portfolio" className="section">
        <div className="container">
          <AnimatedSection as="header" className="section-header reveal" variant="fadeUp">
            <div className="section-eyebrow">Portfolio</div>
            <h2 className="section-title">Recent <span className="serif-italic">work</span> we&apos;re proud of.</h2>
            <p className="section-sub">A small sample of products we&apos;ve shipped — each one built end-to-end.</p>
          </AnimatedSection>
          <AnimatedSection className="portfolio-filter reveal" variant="fadeIn" delay={0.1}>
            <button className="filter-btn active" data-cat="all">All Work</button>
            <button className="filter-btn" data-cat="web">Web</button>
            <button className="filter-btn" data-cat="mobile">Mobile</button>
            <button className="filter-btn" data-cat="ai">AI</button>
            <button className="filter-btn" data-cat="saas">SaaS</button>
          </AnimatedSection>
          <StaggerContainer className="portfolio-grid reveal-stagger">
            <StaggerItem>
              <Link href="/portfolio/helix" className="portfolio-card featured" data-cats="web,saas">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar blue"></div><div className="mock-bar"></div><div className="mock-bar short"></div><div className="mock-grid"><div className="mock-tile blue"></div><div className="mock-tile"></div><div className="mock-tile"></div><div className="mock-tile"></div><div className="mock-tile blue"></div><div className="mock-tile"></div></div><div className="mock-bar" style={{ marginTop: '14px' }}></div><div className="mock-bar short"></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Web</span><span className="tag">SaaS</span><span className="tag">Dashboard</span></div><h3>Helix — analytics platform for ops teams</h3><p>End-to-end dashboard product: data ingestion, query builder, custom reports and team workspaces. Built from scratch in 11 weeks.</p></div>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/portfolio" className="portfolio-card" data-cats="mobile">
                <div className="portfolio-thumb"><div className="mock" style={{ inset: '30px 60px' }}><div className="mock-bar blue"></div><div className="mock-bar short"></div><div className="mock-tile blue" style={{ aspectRatio: '2.5', marginTop: '10px' }}></div><div className="mock-bar" style={{ marginTop: '10px' }}></div><div className="mock-bar short"></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">Mobile</span><span className="tag">iOS / Android</span></div><h3>Orbital — habit tracking app</h3><p>React Native app with offline sync, gentle streak mechanics, and a personal insights engine.</p></div>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Link href="/portfolio" className="portfolio-card" data-cats="ai,saas">
                <div className="portfolio-thumb"><div className="mock"><div className="mock-bar short blue"></div><div className="mock-bar"></div><div className="mock-bar"></div><div className="mock-bar short"></div><div className="mock-tile" style={{ aspectRatio: '4', marginTop: '12px', background: 'rgba(59,130,246,0.18)' }}></div><div className="mock-bar short" style={{ marginTop: '8px' }}></div></div></div>
                <div className="portfolio-body"><div className="portfolio-tags"><span className="tag">AI</span><span className="tag">RAG</span></div><h3>Quill — AI knowledge assistant</h3><p>RAG-powered support bot trained on a client&apos;s docs — handling 64% of tickets without escalation.</p></div>
              </Link>
            </StaggerItem>
          </StaggerContainer>
          <AnimatedSection variant="fadeIn" delay={0.2} style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link className="btn btn-ghost btn-lg" href="/portfolio">View all work <span className="arrow">→</span></Link>
          </AnimatedSection>
        </div>
      </section>


      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <AnimatedSection as="header" className="section-header reveal" variant="fadeUp">
            <div className="section-eyebrow">Testimonials</div>
            <h2 className="section-title">What clients <span className="serif-italic">say</span> after launch.</h2>
          </AnimatedSection>
          <StaggerContainer className="testimonials-grid reveal-stagger">
            <StaggerItem>
              <article className="testimonial">
                <div className="stars" aria-label="5 stars">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                </div>
                <p className="quote">&quot;Zivoxtech shipped our internal dashboard in eight weeks. It&apos;s now the single tool our ops team opens every morning.&quot;</p>
                <div className="testimonial-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #3B82F6, #1d4fb3)' }}>AT</div><div><div className="author-name">Adaeze Thompson</div><div className="author-role">Head of Operations, Northpeak</div></div></div>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="testimonial">
                <div className="stars" aria-label="5 stars">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                </div>
                <p className="quote">&quot;The AI assistant they built handles 64% of our support tickets. ROI was clear within the first month.&quot;</p>
                <div className="testimonial-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #8b5cf6, #5b21b6)' }}>MK</div><div><div className="author-name">Marcus Klein</div><div className="author-role">Founder, Quill Studio</div></div></div>
              </article>
            </StaggerItem>
            <StaggerItem>
              <article className="testimonial">
                <div className="stars" aria-label="5 stars">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"></path></svg>
                </div>
                <p className="quote">&quot;They feel like an extension of our team — weekly demos, honest answers, and a final product that looks like Linear.&quot;</p>
                <div className="testimonial-author"><div className="avatar" style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}>SR</div><div><div className="author-name">Sana Reyes</div><div className="author-role">CTO, Vantage</div></div></div>
              </article>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>


      <section id="faq" className="section" style={{ paddingTop: '40px' }}>
        <div className="container">
          <AnimatedSection as="header" className="section-header reveal" variant="fadeUp" style={{ textAlign: 'center', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>FAQ</div>
            <h2 className="section-title" style={{ margin: '0 auto' }}>Questions, <span className="serif-italic">answered.</span></h2>
          </AnimatedSection>
          <AnimatedSection className="faq-wrap reveal" variant="fadeUp" delay={0.1}>
            <div className="faq-item"><button className="faq-q"><span><span className="cat">Pricing</span><br />How much does a typical project cost?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">It depends on scope, but most projects fall between $5k for a marketing site and $50k+ for a full SaaS product or mobile app. We send a fixed quote after a free 30-minute discovery call, so there are no surprises mid-project.</div></div></div>
            <div className="faq-item"><button className="faq-q"><span><span className="cat">Timeline</span><br />How long does it take to ship?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Marketing sites: 2–3 weeks. Dashboards and SaaS MVPs: 6–10 weeks. Mobile apps: 8–12 weeks. AI integrations: 4–8 weeks. You&apos;ll see weekly demos on a staging environment from week two onwards.</div></div></div>
            <div className="faq-item"><button className="faq-q"><span><span className="cat">Support</span><br />What happens after launch?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Every project includes 30 days of free post-launch support — bug fixes, tweaks and onboarding help. After that, we offer ongoing retainers starting at $1,200/month for monitoring, iterations and feature work.</div></div></div>
            <div className="faq-item"><button className="faq-q"><span><span className="cat">Technology</span><br />What stack do you use?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">For web: Next.js + TypeScript + Tailwind + PostgreSQL. For mobile: React Native or Flutter. For AI: OpenAI / Anthropic + vector stores like Pinecone. We pick what&apos;s best for your project, not what&apos;s trendy.</div></div></div>
            <div className="faq-item"><button className="faq-q"><span><span className="cat">Maintenance</span><br />Can you take over an existing codebase?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Yes — we regularly inherit existing apps. We start with a code audit (free), document findings, then propose a clear path forward: stabilize, refactor or rewrite. You decide the pace.</div></div></div>
            <div className="faq-item"><button className="faq-q"><span><span className="cat">Consultation</span><br />Is the first call really free?</span><span className="faq-toggle" aria-hidden="true"></span></button><div className="faq-a"><div className="faq-a-inner">Yes — completely free, no obligation. You&apos;ll get a real conversation with a senior person (not a sales rep), a written summary of what we discussed, and an honest opinion of whether we&apos;re a good fit.</div></div></div>
          </AnimatedSection>
        </div>
      </section>


      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <AnimatedSection className="cta-box reveal" variant="scaleUp">
            <h2>Have an idea? <span className="serif-italic">Let&apos;s build it.</span></h2>
            <p>Tell us a little about your project. We&apos;ll get back within 24 hours with next steps — or schedule a free 30-minute consultation.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" href="/contact">Start Your Project <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost btn-lg" href="/book">Book a Call</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </section>
  );
}
