"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ─── Types ────────────────────────────────────────────────── */
export type TeamMember = {
  id: string;
  name: string;
  title: string;
  photo_url?: string | null;
  company?: string | null;
  bio?: string | null;
  linkedin_url?: string | null;
  display_order?: number;
};

/* ─── Fallback data ────────────────────────────────────────── */
const FALLBACK: TeamMember[] = [
  { id: "1", name: "Elias Marchetti",  title: "Co-founder · Engineering", company: "Zivoxtech", bio: "Ex-Stripe, 12 years in product engineering. Leads architecture and back-end builds." },
  { id: "2", name: "Priya Narang",     title: "Co-founder · Design",      company: "Zivoxtech", bio: "Ex-Linear, ex-Figma. Owns design across every project — from wireframe to launch." },
  { id: "3", name: "Samuel Okonkwo",  title: "Lead Engineer · Mobile",   company: "Zivoxtech", bio: "React Native and Flutter specialist. Shipped seven apps on the App Store top 100." },
  { id: "4", name: "Léa Fournier",    title: "Lead Engineer · AI",       company: "Zivoxtech", bio: "Builds RAG systems and AI workflows. Previously at Anthropic and Vercel." },
];

const AVATAR_COLORS = [
  ["#3B82F6", "#1d4fb3"],
  ["#8b5cf6", "#5b21b6"],
  ["#10b981", "#047857"],
  ["#f59e0b", "#b45309"],
  ["#ef4444", "#991b1b"],
  ["#06b6d4", "#0e7490"],
  ["#ec4899", "#9d174d"],
  ["#84cc16", "#3f6212"],
];

function getGradient(idx: number) {
  const [a, b] = AVATAR_COLORS[idx % AVATAR_COLORS.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

/* ─── SVG canvas dimensions ────────────────────────────────── */
const W = 900, H = 560;
const CX = W / 2, CY = H / 2;

/* Concentric ellipses: inner → outer */
const ELLIPSES = [
  { rx: 102, ry: 58 },
  { rx: 218, ry: 130 },
  { rx: 334, ry: 202 },
];

/* Outer orbit: where avatars are placed */
const ORX = 405, ORY = 255;

/* 8 evenly-spaced angles around the orbit */
const ANGLES = Array.from({ length: 8 }, (_, i) => -Math.PI / 2 + (i * 2 * Math.PI) / 8);

/* Compute each slot's SVG (x,y), percentage position, inner-ellipse edge, and tooltip direction */
const SLOTS = ANGLES.map((angle) => {
  const x  = CX + ORX * Math.cos(angle);
  const y  = CY + ORY * Math.sin(angle);
  const ix = CX + ELLIPSES[0].rx * Math.cos(angle);
  const iy = CY + ELLIPSES[0].ry * Math.sin(angle);
  const xp = (x / W) * 100;
  const yp = (y / H) * 100;
  // Tooltip direction based on quadrant
  let dir: "right" | "left" | "below" | "above";
  if (xp < 30)       dir = "right";
  else if (xp > 70)  dir = "left";
  else if (yp < 40)  dir = "below";
  else                dir = "above";
  return { angle, x, y, ix, iy, xp, yp, dir };
});

/* ─── LinkedIn icon ────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ─── Main TeamShowcase Component ──────────────────────────── */
export default function TeamShowcase() {
  const [members, setMembers] = useState<TeamMember[]>(FALLBACK);
  const [slotIdx, setSlotIdx] = useState<number[]>(() =>
    SLOTS.map((_, i) => i % FALLBACK.length)
  );
  const [activeSlot, setActiveSlot] = useState<number>(-1);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const cycleRef = useRef(0);

  /* ── Fetch live data from API ──────────────────────────── */
  useEffect(() => {
    fetch("/api/team")
      .then(r => r.json())
      .then((data: TeamMember[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setMembers(data);
          setSlotIdx(SLOTS.map((_, i) => i % data.length));
        }
      })
      .catch(() => {});
  }, []);

  /* ── Sequential slot cycling ───────────────────────────── */
  useEffect(() => {
    cycleRef.current = 0;
    const timer = setInterval(() => {
      const slot = cycleRef.current;
      setActiveSlot(slot);
      setSlotIdx(prev => {
        const next = [...prev];
        next[slot] = (next[slot] + 1) % members.length;
        return next;
      });
      cycleRef.current = (cycleRef.current + 1) % SLOTS.length;
    }, 1600);
    return () => clearInterval(timer);
  }, [members.length]);

  return (
    <div className="ts-section">

      {/* ════════════════════════════════════════════════════
          DESKTOP: Orbital animation view
          ════════════════════════════════════════════════════ */}
      <div className="ts-orbit-container" role="img" aria-label="Team members orbital display">

        {/* ── SVG: ellipses + connector lines ──────────────── */}
        <svg viewBox={`0 0 ${W} ${H}`} className="ts-svg" aria-hidden>
          {/* Glow gradient definition */}
          <defs>
            <radialGradient id="ts-glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle central glow */}
          <ellipse cx={CX} cy={CY} rx={140} ry={85} fill="url(#ts-glow-grad)" />

          {/* Concentric ellipses */}
          {ELLIPSES.map((e, i) => (
            <ellipse
              key={i}
              cx={CX} cy={CY}
              rx={e.rx} ry={e.ry}
              fill="none"
              stroke="currentColor"
              strokeWidth={i === 0 ? 1.5 : 0.9}
              strokeOpacity={0.18 - i * 0.04}
              className="ts-ring-path"
            />
          ))}

          {/* Dashed connector lines: inner-ellipse-edge → slot-center */}
          {SLOTS.map((slot, i) => (
            <line
              key={i}
              x1={slot.ix} y1={slot.iy}
              x2={slot.x}  y2={slot.y}
              stroke="currentColor"
              strokeWidth={0.75}
              strokeOpacity={hoveredSlot === i || activeSlot === i ? 0.55 : 0.13}
              strokeDasharray="3 5"
              style={{ transition: "stroke-opacity 0.45s ease" }}
            />
          ))}
        </svg>

        {/* ── Slots overlay ────────────────────────────────── */}
        <div className="ts-overlay" aria-hidden>
          {SLOTS.map((slot, si) => {
            const mi        = slotIdx[si];
            const member    = members[mi] ?? members[0];
            const isActive  = activeSlot === si;
            const isHovered = hoveredSlot === si;

            return (
              <div
                key={si}
                className="ts-slot"
                style={{ left: `${slot.xp}%`, top: `${slot.yp}%` }}
                onMouseEnter={() => setHoveredSlot(si)}
                onMouseLeave={() => setHoveredSlot(null)}
              >
                {/* Pulse glow when active */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="ts-pulse"
                      key="pulse"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: [0, 0.8, 0], scale: [0.7, 1.4, 1.6] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  )}
                </AnimatePresence>

                {/* Avatar (transitions when member changes) */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${si}-${mi}`}
                    className={`ts-avatar-shell${isActive ? " ts-avatar-shell--active" : ""}`}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: isActive ? 1.1 : 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Perpetual float */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 3.2 + si * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: si * 0.18,
                      }}
                    >
                      {member.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="ts-avatar"
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="ts-avatar ts-avatar-fallback"
                          style={{ background: getGradient(mi) }}
                        >
                          {initials(member.name)}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Tooltip: shown on hover or when slot is active */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.div
                      key="tip"
                      className={`ts-tip ts-tip--${slot.dir}`}
                      initial={{ opacity: 0, scale: 0.88 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.88 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="ts-tip-name">{member.name}</span>
                      <span className="ts-tip-role">{member.title}</span>
                      {member.company && (
                        <span className="ts-tip-company">{member.company}</span>
                      )}
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ts-tip-li"
                          onClick={e => e.stopPropagation()}
                        >
                          <LinkedInIcon /> LinkedIn
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Center CTA pill */}
          <Link href="/contact" className="ts-cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Hire Our Team
          </Link>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          MOBILE: Simple responsive card grid
          ════════════════════════════════════════════════════ */}
      <div className="ts-mobile-grid">
        {members.map((m, i) => (
          <motion.div
            key={m.id}
            className="ts-mobile-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {m.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.photo_url} alt={m.name} className="ts-mobile-avatar" loading="lazy" />
            ) : (
              <div className="ts-mobile-avatar ts-mobile-initials" style={{ background: getGradient(i) }}>
                {initials(m.name)}
              </div>
            )}
            <div className="ts-mobile-info">
              <span className="ts-mobile-name">{m.name}</span>
              <span className="ts-mobile-role">{m.title}</span>
              {m.company && <span className="ts-mobile-company">{m.company}</span>}
              {m.linkedin_url && (
                <a href={m.linkedin_url} target="_blank" rel="noopener noreferrer" className="ts-mobile-li">
                  <LinkedInIcon /> LinkedIn
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
