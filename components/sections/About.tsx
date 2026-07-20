"use client";

import Link from "next/link";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import TrustMarquee from "@/components/sections/TrustMarquee";
import TeamShowcase from "@/components/sections/TeamShowcase";
import ProcessOrbitalSection from "@/components/sections/ProcessOrbitalSection";

export default function AboutSection() {
  return (
    <section className="page active" data-page="about">

    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <span>About</span>
        </div>
        <h1>Software built by <span className="serif-italic">people</span> who care.</h1>
        <p className="lead">Zivoxtech is a small, senior team of designers and engineers helping ambitious teams turn ideas into production-grade software — fast, calmly, and without the usual agency noise.</p>
      </div>
    </section>


    <TrustMarquee mode="marquee" />


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <div className="why-grid">
          <AnimatedSection className="reveal" variant="fadeUp">
            <div className="section-eyebrow">Our story</div>
            <h2 className="section-title">A studio born from <span className="serif-italic">frustration</span> with how agencies work.</h2>
          </AnimatedSection>
          <AnimatedSection className="reveal" variant="fadeUp" delay={0.1}>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '0 0 18px' }}>
              We started Zivoxtech in 2021 after years of watching agencies over-promise, drag timelines, and hand off products that nobody on the client side could maintain.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '0 0 18px' }}>
              We wanted to build the opposite — a small team of senior people who design and ship things end-to-end, communicate honestly, and treat every codebase like we&apos;ll inherit it ourselves.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', margin: '0' }}>
              Four years later, we&apos;ve shipped 120+ products for teams in healthcare, education, fintech, and SaaS — and every one of them was led by someone whose name is on this page.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>


    <ProcessOrbitalSection />


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <AnimatedSection as="header" className="section-header center reveal" variant="fadeUp">
          <div className="section-eyebrow">The team</div>
          <h2 className="section-title">Small by design. <span className="serif-italic">Senior</span> by default.</h2>
          <p className="section-sub">No juniors, no shadow contractors, no offshore hand-offs. The person who pitches you also writes the code.</p>
        </AnimatedSection>
        <TeamShowcase />
      </div>
    </section>

    {/* zivoxtech company history add later if needed */}
    {/* <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <AnimatedSection as="header" className="section-header center reveal" variant="fadeUp">
          <div className="section-eyebrow">Milestones</div>
          <h2 className="section-title">Four years, <span className="serif-italic">in brief.</span></h2>
        </AnimatedSection>
        <StaggerContainer className="timeline reveal-stagger">
          <StaggerItem>
            <div className="timeline-item">
              <div className="timeline-year">2021 · Q3</div>
              <h4>Zivoxtech is born</h4>
              <p>Elias and Priya leave their day jobs and take on the first three clients out of a co-working space in Lisbon.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="timeline-item">
              <div className="timeline-year">2022 · Q4</div>
              <h4>First 25 projects shipped</h4>
              <p>Team grows to six. We start specializing in dashboards and SaaS products for venture-backed teams.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="timeline-item">
              <div className="timeline-year">2023 · Q3</div>
              <h4>AI practice launches</h4>
              <p>We add a dedicated AI/RAG practice. Léa joins. Our first chatbot deflects 60%+ of a client&apos;s support tickets.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="timeline-item">
              <div className="timeline-year">2024 · Q4</div>
              <h4>Mobile practice + 100 clients</h4>
              <p>Samuel joins to lead mobile. We cross 100 shipped projects across three continents.</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="timeline-item">
              <div className="timeline-year">2026 · Today</div>
              <h4>120+ projects, fully remote</h4>
              <p>Twelve people across six countries, working with teams from seed-stage startups to Series B SaaS companies.</p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section> */}


    <section className="section" style={{ paddingTop: '40px' }}>
      <div className="container">
        <AnimatedSection className="cta-box reveal" variant="scaleUp">
          <h2>Want to work with us? <span className="serif-italic">Let&apos;s talk.</span></h2>
          <p>We take on a small number of clients each quarter. Tell us about your project — we&apos;ll get back within 24 hours.</p>
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
