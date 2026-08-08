"use client";

import React, { useState } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform, MotionValue } from "framer-motion";

export interface StepItem {
  id: string;
  number: string;
  name: string;
  sprint: string;
  sprintIndex: 1 | 2 | 3;
  color: "cyan" | "white";
  startAngle: number;
  icon: React.ReactNode;
  principleTitle: string;
  description: string;
}

const STEPS: StepItem[] = [
  {
    id: "strategy",
    number: "01",
    name: "Strategy",
    sprint: "Sprint 1",
    sprintIndex: 1,
    color: "cyan",
    startAngle: -90,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a7 7 0 1 0 7 7" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    principleTitle: "Honesty over hype",
    description: "We tell clients what we'd tell a friend — defining realistic roadmaps, transparent scopes, and architecture before writing a single line of code.",
  },
  {
    id: "design",
    number: "02",
    name: "Design",
    sprint: "Sprint 1 - 2",
    sprintIndex: 2,
    color: "white",
    startAngle: -18,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    principleTitle: "User-first UX & Systems",
    description: "Iterative design sprints crafting modern visual identity, high-fidelity mockups, and scalable design systems that wow your users.",
  },
  {
    id: "dev",
    number: "03",
    name: "Development & Testing",
    sprint: "Sprint 2",
    sprintIndex: 2,
    color: "cyan",
    startAngle: 54,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <path d="M14 4l-4 16" />
      </svg>
    ),
    principleTitle: "Ship weekly & build to last",
    description: "Every Friday a working demo lands on staging. Clean TypeScript codebases, thorough automated testing, and zero technical debt.",
  },
  {
    id: "launch",
    number: "04",
    name: "Launch",
    sprint: "Sprint 3",
    sprintIndex: 3,
    color: "white",
    startAngle: 126,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.26-1.5 1.76-2.31M12 15l-3-3" />
        <path d="M15 9l-3-3" />
        <path d="M9 15l6-6" />
        <path d="M12 3a9 9 0 0 1 9 9c0 2.5-1 4.5-2.5 6l-6.5-6.5" />
      </svg>
    ),
    principleTitle: "Smooth production release",
    description: "Zero-downtime deployment, infrastructure setup, domain integration, performance tuning, and pre-launch security checks.",
  },
  {
    id: "support",
    number: "05",
    name: "Support",
    sprint: "Sprint 3",
    sprintIndex: 3,
    color: "cyan",
    startAngle: 198,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    principleTitle: "Stay reachable & dedicated",
    description: "Direct Slack channel access, dedicated senior engineers, rapid SLA response times (<2 hours), and continuous post-launch optimization.",
  },
];

const OUTER_RADIUS_PCT = 0.41;
const INNER_RADIUS_PCT = 0.27;

export default function ProcessOrbitalSection() {
  const [activeId, setActiveId] = useState<string>("strategy");
  const [paused, setPaused] = useState<boolean>(false);

  // Outer ring motion angle for all 5 steps (Clockwise)
  const outerAngleRef = React.useRef(0);

  const outerAngles = [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMotionValue(STEPS[0].startAngle),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMotionValue(STEPS[1].startAngle),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMotionValue(STEPS[2].startAngle),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMotionValue(STEPS[3].startAngle),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMotionValue(STEPS[4].startAngle),
  ];

  useAnimationFrame((_, delta) => {
    if (paused) return;
    // Outer spins Clockwise (+)
    outerAngleRef.current += delta * 0.015;
    STEPS.forEach((s, idx) => {
      outerAngles[idx].set(s.startAngle + outerAngleRef.current);
    });
  });

  return (
    <section className="section process-orbital-section" style={{ paddingTop: "20px", paddingBottom: "60px" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header center reveal" style={{ marginBottom: "48px" }}>
          <div className="section-eyebrow">Our Process & Principles</div>
          <h2 className="section-title">
            Five steps, <span className="serif-italic">every project.</span>
          </h2>
          <p className="section-sub" style={{ maxWidth: "640px", margin: "12px auto 0" }}>
            A structured agile approach that takes your project from initial concept to high-impact production software.
          </p>
        </div>

        {/* Main Grid: Left Sprint Chart, Right Animated Orbital */}
        <div className="process-grid-container">
          {/* LEFT SIDE: Sprint Timeline Table */}
          <div className="sprint-timeline-wrapper">
            <div className="sprint-table">
              {/* Header Columns */}
              <div className="sprint-header-row">
                <div className="sprint-col-header">SPRINT 1</div>
                <div className="sprint-col-header">SPRINT 2</div>
                <div className="sprint-col-header">SPRINT 3</div>
              </div>

              {/* Vertical Grid Lines */}
              <div className="sprint-grid-lines">
                <div className="sprint-grid-line" />
                <div className="sprint-grid-line" />
                <div className="sprint-grid-line" />
              </div>

              {/* Rows with Pills */}
              <div className="sprint-rows-container">
                {/* Row 1: Strategy (Sprint 1) */}
                <div className="sprint-row">
                  <div className="sprint-cell sprint-cell-1">
                    <button
                      type="button"
                      className={`sprint-pill cyan ${activeId === "strategy" ? "active" : ""}`}
                      onClick={() => setActiveId("strategy")}
                      onMouseEnter={() => {
                        setActiveId("strategy");
                        setPaused(true);
                      }}
                      onMouseLeave={() => setPaused(false)}
                    >
                      <span>Strategy</span>
                    </button>
                  </div>
                </div>

                {/* Row 2: Design (Sprint 1 - 2) */}
                <div className="sprint-row">
                  <div className="sprint-cell sprint-cell-mid">
                    <button
                      type="button"
                      className={`sprint-pill white ${activeId === "design" ? "active" : ""}`}
                      onClick={() => setActiveId("design")}
                      onMouseEnter={() => {
                        setActiveId("design");
                        setPaused(true);
                      }}
                      onMouseLeave={() => setPaused(false)}
                    >
                      <span>Design</span>
                    </button>
                  </div>
                </div>

                {/* Row 3: Development & Testing (Sprint 2) */}
                <div className="sprint-row">
                  <div className="sprint-cell sprint-cell-2">
                    <button
                      type="button"
                      className={`sprint-pill cyan ${activeId === "dev" ? "active" : ""}`}
                      onClick={() => setActiveId("dev")}
                      onMouseEnter={() => {
                        setActiveId("dev");
                        setPaused(true);
                      }}
                      onMouseLeave={() => setPaused(false)}
                    >
                      <span>Development & Testing</span>
                    </button>
                  </div>
                </div>

                {/* Row 4: Launch (Sprint 3) */}
                <div className="sprint-row">
                  <div className="sprint-cell sprint-cell-3-top">
                    <button
                      type="button"
                      className={`sprint-pill white ${activeId === "launch" ? "active" : ""}`}
                      onClick={() => setActiveId("launch")}
                      onMouseEnter={() => {
                        setActiveId("launch");
                        setPaused(true);
                      }}
                      onMouseLeave={() => setPaused(false)}
                    >
                      <span>Launch</span>
                    </button>
                  </div>
                </div>

                {/* Row 5: Support (Sprint 3) */}
                <div className="sprint-row">
                  <div className="sprint-cell sprint-cell-3-bottom">
                    <button
                      type="button"
                      className={`sprint-pill cyan ${activeId === "support" ? "active" : ""}`}
                      onClick={() => setActiveId("support")}
                      onMouseEnter={() => {
                        setActiveId("support");
                        setPaused(true);
                      }}
                      onMouseLeave={() => setPaused(false)}
                    >
                      <span>Support</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Animated Concentric Orbital Widget */}
          <div
            className="orbital-widget-wrapper"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="orbital-canvas">
              {/* Background ambient glow */}
              <div className="orbital-center-glow" />

              {/* Center Core Sphere */}
              <div className="orbital-center-sphere">
                <div className="orbital-sphere-inner" />
              </div>

              {/* SVG Ring Lines & Tracks */}
              <svg className="orbital-svg-rings" viewBox="0 0 500 500" fill="none">
                {/* Outer Ring Track (Clockwise baseline) */}
                <circle cx="250" cy="250" r={500 * OUTER_RADIUS_PCT} stroke="var(--orbital-ring-outer, rgba(0, 216, 255, 0.28))" strokeWidth="1.5" />
                <circle cx="250" cy="250" r={500 * OUTER_RADIUS_PCT} stroke="var(--orbital-ring-outer-dash, rgba(0, 216, 255, 0.15))" strokeWidth="4" strokeDasharray="6 14" />

                {/* Inner Ring Track: Animated Dotted Ring spinning Anti-Clockwise */}
                <motion.g
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, ease: "linear", repeat: Infinity }}
                  style={{ transformOrigin: "250px 250px" }}
                >
                  <circle cx="250" cy="250" r={500 * INNER_RADIUS_PCT} stroke="var(--orbital-ring-inner, rgba(0, 216, 255, 0.45))" strokeWidth="2.5" strokeDasharray="4 10" />
                  <circle cx="250" cy="250" r={500 * INNER_RADIUS_PCT} stroke="var(--orbital-ring-inner-dash, rgba(255, 255, 255, 0.6))" strokeWidth="1" strokeDasharray="2 18" />
                  
                  {/* Even larger 4 dots on inner anti-clockwise spinning ring */}
                  <circle cx="250" cy={250 - 500 * INNER_RADIUS_PCT} r="8.5" fill="#00d8ff" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={250 + 500 * INNER_RADIUS_PCT} cy="250" r="8.5" fill="#ffffff" stroke="#00d8ff" strokeWidth="2" />
                  <circle cx="250" cy={250 + 500 * INNER_RADIUS_PCT} r="8.5" fill="#00d8ff" stroke="#ffffff" strokeWidth="2" />
                  <circle cx={250 - 500 * INNER_RADIUS_PCT} cy="250" r="8.5" fill="#ffffff" stroke="#00d8ff" strokeWidth="2" />
                </motion.g>
              </svg>

              {/* All 5 Steps on Outer Orbit (Clockwise) */}
              {STEPS.map((step, idx) => (
                <OrbitNode
                  key={step.id}
                  step={step}
                  radiusPct={OUTER_RADIUS_PCT}
                  angle={outerAngles[idx]}
                  isActive={activeId === step.id}
                  onSelect={() => setActiveId(step.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Helper Component for Node positioning along Orbit */
function OrbitNode({
  step,
  radiusPct,
  angle,
  isActive,
  onSelect,
}: {
  step: StepItem;
  radiusPct: number;
  angle: MotionValue<number>;
  isActive: boolean;
  onSelect: () => void;
}) {
  // mathematical offset alignment done in coordinate space to avoid transform override bugs
  const x = useTransform(angle, (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `calc(50% + ${Math.cos(rad) * radiusPct * 100}% - 20px)`;
  });

  const y = useTransform(angle, (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `calc(50% + ${Math.sin(rad) * radiusPct * 100}% - 20px)`;
  });

  return (
    <motion.div
      className={`orbital-node ${step.color} ${isActive ? "active" : ""}`}
      style={{ left: x, top: y }}
      onClick={onSelect}
      whileHover={{ scale: 1.12 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
    >
      <div className="node-badge">
        {step.icon}
      </div>
      <div className="node-label">{step.name}</div>
    </motion.div>
  );
}
