"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ContactSection() {
  return (
    <section className="page active" data-page="contact">
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link><span className="sep">/</span><span>Contact</span>
        </div>
        <h1>Let&apos;s build <span className="serif-italic">something.</span></h1>
        <p className="lead">Tell us about your project and we&apos;ll come back within a business day with clear next steps.</p>
      </div>
    </section>

    <section className="section" style={{ paddingTop: '60px' }}>
      <div className="container">
        <div className="contact-grid">
          <AnimatedSection className="contact-info reveal" variant="fadeUp">
            <div className="section-eyebrow">Reach us</div>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 36px)' }}>Pick the path that <span className="serif-italic">fits.</span></h2>

            <div className="contact-detail">
              <div className="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
              <div><div className="label">Email · for everything</div><div className="value">hello@zivox.tech</div></div>
            </div>
            <div className="contact-detail">
              <div className="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
              <div><div className="label">Phone · M–F, 9–6 CET</div><div className="value">+1 (415) 555-0142</div></div>
            </div>
            <div className="contact-detail">
              <div className="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
              <div><div className="label">Based in</div><div className="value">Lisbon, PT · serving globally</div></div>
            </div>

            <div className="contact-extras">
              <Link href="/book" className="contact-extra-card">
                <div className="ic-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
                <h5>Book a consultation</h5>
                <p>Free 30-min call with a senior person — no sales pressure.</p>
              </Link>
              <Link href="/services" className="contact-extra-card">
                <div className="ic-sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="14 2 14 8 20 8"></polyline><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg></div>
                <h5>Services &amp; pricing</h5>
                <p>See what we do and the engagement models we offer.</p>
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.15}>
            <form id="contactForm" className="contact-form reveal" style={{ transitionDelay: '.1s' }} noValidate>
              <div className="form-success">
                <span>✓</span>
                <span>Message received — we&apos;ll be in touch within 24 hours.</span>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Full Name <span className="req">*</span></label>
                  <input id="name" name="name" type="text" placeholder="Jane Doe" data-validate="required" />
                  <span className="error-msg">Please tell us your name</span>
                </div>
                <div className="field">
                  <label htmlFor="email">Email <span className="req">*</span></label>
                  <input id="email" name="email" type="email" placeholder="jane@company.com" data-validate="required,email" />
                  <span className="error-msg">Please enter a valid email</span>
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input id="phone" name="phone" type="tel" placeholder="+1 415 ..." />
                </div>
                <div className="field">
                  <label htmlFor="company">Company (optional)</label>
                  <input id="company" name="company" type="text" placeholder="Acme, Inc." />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="service">Service required <span className="req">*</span></label>
                  <select id="service" name="service" defaultValue="" data-validate="required">
                    <option value="">Select a service</option>
                    <option>Web Development</option>
                    <option>Mobile App</option>
                    <option>AI Solution</option>
                    <option>Custom Software</option>
                    <option>Other</option>
                  </select>
                  <span className="error-msg">Please select a service</span>
                </div>
                <div className="field">
                  <label htmlFor="budget">Budget range</label>
                  <select id="budget" name="budget" defaultValue="">
                    <option value="">Not sure yet</option>
                    <option>Under $5k</option>
                    <option>$5k – $15k</option>
                    <option>$15k – $50k</option>
                    <option>$50k+</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="details">Project details <span className="req">*</span></label>
                <textarea id="details" name="details" placeholder="Tell us about your project, goals and timeline (20+ chars)…" data-validate="required,min:20"></textarea>
                <span className="error-msg">Please share at least 20 characters about your project</span>
              </div>
              <button className="btn btn-primary form-submit" type="submit">
                Send Message <span className="arrow">→</span>
              </button>
              <p style={{ fontSize: '12px', color: 'var(--text-3)', margin: '12px 0 0', textAlign: 'center' }}>
                We read every message. Most replies go out within 4 hours, M–F.
              </p>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
    </section>
  );
}
