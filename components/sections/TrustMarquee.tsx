"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Building2, Zap, Bot, Code2 } from "lucide-react";

const DEFAULT_ITEMS = [
  { id: "1", text: "Building Scalable & Secure Software Solutions", icon: <Globe size="1em" strokeWidth={1.5} /> },
  { id: "2", text: "Modern Web App & Mobile Development", icon: <Smartphone size="1em" strokeWidth={1.5} /> },
  { id: "3", text: "Enterprise-Grade Architecture that Survives Growth", icon: <Building2 size="1em" strokeWidth={1.5} /> },
  { id: "4", text: "High-Performance Applications Delivered at Lightning Speed", icon: <Zap size="1em" strokeWidth={1.5} /> },
  { id: "5", text: "AI-Powered Systems that Drive Real ROI", icon: <Bot size="1em" strokeWidth={1.5} /> },
  { id: "6", text: "Clean, Documented Codebases Built to Scale", icon: <Code2 size="1em" strokeWidth={1.5} /> },
];

export type TrustCompany = {
  id: string;
  name: string;
  logo_url?: string | null;
  tagline?: string | null;
  website_url?: string | null;
};

type Props = {
  mode?: "marquee" | "logos";
  companies?: TrustCompany[];
};

/* ─── Text Marquee ────────────────────────────────────────────────────── */
function TextMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Duplicate items 3× so the loop has no visual gap */
  const items = [...DEFAULT_ITEMS, ...DEFAULT_ITEMS, ...DEFAULT_ITEMS];

  return (
    <div className="trust-marquee-wrap" onMouseEnter={(e) => {
      const el = e.currentTarget.querySelector<HTMLElement>(".trust-marquee-track");
      if (el) el.style.animationPlayState = "paused";
    }} onMouseLeave={(e) => {
      const el = e.currentTarget.querySelector<HTMLElement>(".trust-marquee-track");
      if (el) el.style.animationPlayState = "running";
    }}>
      {/* Left gradient fade */}
      <div className="trust-marquee-fade trust-marquee-fade--left" />
      {/* Right gradient fade */}
      <div className="trust-marquee-fade trust-marquee-fade--right" />

      <div ref={trackRef} className="trust-marquee-track">
        {items.map((item, i) => (
          <span key={`${item.id}-${i}`} className="trust-marquee-item">
            <span className="trust-marquee-icon">{item.icon}</span>
            <span className="trust-marquee-text">{item.text}</span>
            <span className="trust-marquee-sep" aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Logo Cards Slider ───────────────────────────────────────────────── */
function LogoSlider({ companies }: { companies: TrustCompany[] }) {
  if (!companies.length) return <TextMarquee />;

  /* Triple the list for seamless infinite loop */
  const items = [...companies, ...companies, ...companies];

  return (
    <div className="trust-logo-wrap" onMouseEnter={(e) => {
      const el = e.currentTarget.querySelector<HTMLElement>(".trust-logo-track");
      if (el) el.style.animationPlayState = "paused";
    }} onMouseLeave={(e) => {
      const el = e.currentTarget.querySelector<HTMLElement>(".trust-logo-track");
      if (el) el.style.animationPlayState = "running";
    }}>
      <div className="trust-marquee-fade trust-marquee-fade--left" />
      <div className="trust-marquee-fade trust-marquee-fade--right" />
      <div className="trust-logo-track">
        {items.map((c, i) => (
          <a
            key={`${c.id}-${i}`}
            href={c.website_url || "#"}
            target={c.website_url ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="trust-logo-card"
            tabIndex={-1}
          >
            {c.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.logo_url} alt={c.name} className="trust-logo-img" />
            ) : (
              <span className="trust-logo-placeholder">{c.name.slice(0, 2).toUpperCase()}</span>
            )}
            {c.tagline && <span className="trust-logo-tagline">{c.tagline}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Export ─────────────────────────────────────────────────────── */
export default function TrustMarquee({ mode = "marquee", companies = [] }: Props) {
  return (
    <motion.section
      className="trust-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="trust-header">
        <span className="trust-eyebrow">
          {mode === "logos" ? "Trusted by great teams" : "What we stand for"}
        </span>
      </div>

      {mode === "logos" ? (
        <LogoSlider companies={companies} />
      ) : (
        <TextMarquee />
      )}
    </motion.section>
  );
}
