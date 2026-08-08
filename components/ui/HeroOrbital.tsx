"use client";

import { useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

/* ─── Service cards ─────────────────────────────────────── */
const CARDS = [
  {
    id: "web",
    title: "Web Development",
    desc: "Fast, responsive and modern websites.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    startAngle: -90,
  },
  {
    id: "ai",
    title: "AI Solutions",
    desc: "Smart AI integrations to automate and scale your business.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    ),
    startAngle: 0,
  },
  {
    id: "mobile",
    title: "Mobile Apps",
    desc: "Native and cross-platform apps for iOS and Android.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
    startAngle: 90,
  },
  {
    id: "custom",
    title: "Custom Software",
    desc: "Scalable and secure software built for your needs.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7l8-4 8 4M4 7v10l8 4 8-4V7M4 7l8 4 8-4M12 11v10" />
      </svg>
    ),
    startAngle: 180,
  },
];

/* ─── Orbit radius (% of container half-size) ───────────── */
const ORBIT_RADIUS_PCT = 0.38;

/* ─── Main orbital component ────────────────────────────── */
export default function HeroOrbital({ className }: { className?: string }) {
  const angleRef = { current: 0 };
  const [paused, setPaused] = useState(false);
  const angles = CARDS.map((c) => useMotionValue(c.startAngle));

  useAnimationFrame((_, delta) => {
    if (paused) return;
    angleRef.current += delta * 0.018;
    CARDS.forEach((c, i) => {
      angles[i].set(c.startAngle + angleRef.current);
    });
  });

  return (
    <div
      className={`hero-orbital-wrap ${className || ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Circle image as background orbit ring */}
      <div className="orbit-circle-img-wrap">
        <Image
          src="/circle.png"
          alt="Orbit ring background"
          fill
          className="orbit-circle-img"
          priority
        />
      </div>

      {/* Connector lines from center to each card */}
      <OrbitLines angles={angles} />

      {/* Center logo — larger, no glow */}
      <div className="orbit-center">
        <Image
          src="/only_logo.png"
          alt="Zivox Tech logo"
          width={170}
          height={100}
          className="orbit-logo-img"
          priority
        />
      </div>

      {/* Orbiting service cards */}
      {CARDS.map((card, i) => (
        <OrbitCard key={card.id} card={card} angle={angles[i]} />
      ))}
    </div>
  );
}

/* ─── Individual orbiting card ──────────────────────────── */
function OrbitCard({
  card,
  angle,
}: {
  card: (typeof CARDS)[0];
  angle: MotionValue<number>;
}) {
  const x = useTransform(angle, (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `calc(50% + ${Math.cos(rad) * ORBIT_RADIUS_PCT * 100}% - 90px)`;
  });
  const y = useTransform(angle, (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `calc(50% + ${Math.sin(rad) * ORBIT_RADIUS_PCT * 100}% - 44px)`;
  });

  return (
    <motion.div
      className="orbit-card"
      style={{ left: x, top: y }}
      whileHover={{ scale: 1.07 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="orbit-card-icon">{card.icon}</div>
      <div>
        <div className="orbit-card-title">{card.title}</div>
        <div className="orbit-card-desc">{card.desc}</div>
      </div>
    </motion.div>
  );
}

/* ─── Live SVG connector lines ──────────────────────────── */
function OrbitLines({ angles }: { angles: MotionValue<number>[] }) {
  const [, setTick] = useState(0);
  useAnimationFrame(() => setTick((t) => t + 1));

  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * ORBIT_RADIUS_PCT;

  return (
    <svg
      className="orbit-lines"
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {angles.map((angleMotion, i) => {
        const deg = angleMotion.get();
        const rad = (deg * Math.PI) / 180;
        const ex = cx + Math.cos(rad) * r;
        const ey = cy + Math.sin(rad) * r;
        return (
          <g key={i}>
            <line
              x1={cx} y1={cy} x2={ex} y2={ey}
              stroke="rgba(59,130,246,0.18)"
              strokeWidth="1"
              strokeDasharray="5 5"
            />
            <circle cx={ex} cy={ey} r="4" fill="#3B82F6" opacity="0.65" />
          </g>
        );
      })}
    </svg>
  );
}
