"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Premium three-layer cursor effect:
 *  Layer 1 – Glow blob   : large radial gradient, slowest trailing spring
 *  Layer 2 – Outer ring  : circular outline, medium spring with visible lag
 *  Layer 3 – Center dot  : small solid dot, fastest spring (near-instant)
 *
 * All layers expand / intensify when hovering interactive elements.
 * Hidden entirely on touch / pointer-coarse devices.
 */
export default function CursorGlow() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default true → no FOUC

  // Single source of truth for raw mouse position
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  // ── Layer 2: Outer ring — medium lag for trailing feel ──────────────
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 200, mass: 0.65 });
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 200, mass: 0.65 });

  // ── Layer 1: Glow blob — slowest, most diffuse ──────────────────────
  const glowX = useSpring(mouseX, { damping: 42, stiffness: 110, mass: 1.3 });
  const glowY = useSpring(mouseY, { damping: 42, stiffness: 110, mass: 1.3 });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const INTERACTIVE_SELECTOR =
      "button, a, .btn, .service-card, .portfolio-card, " +
      ".faq-q, .filter-btn, .contact-extra-card, .team-card, " +
      ".solution-card, .timeline-item, .blog-card, " +
      "input, textarea, select, label, [role='button']";

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(el.closest(INTERACTIVE_SELECTOR) !== null);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isTouchDevice) return null;

  const SHARED = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    pointerEvents: "none" as const,
    translateX: "-50%",
    translateY: "-50%",
  };

  const FADE = { duration: 0.35 };

  return (
    <>
      {/* ── Layer 1: Ambient glow blob ───────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ ...SHARED, x: glowX, y: glowY, zIndex: 9994 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={FADE}
      >
        <motion.div
          animate={{
            width: isHovering ? 240 : 150,
            height: isHovering ? 240 : 150,
            opacity: isHovering ? 0.55 : 0.3,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(59,130,246,0.38) 0%, rgba(96,165,250,0.12) 45%, transparent 72%)",
            filter: "blur(22px)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>

      {/* ── Layer 2: Outer ring ──────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        style={{ ...SHARED, x: ringX, y: ringY, zIndex: 9995 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={FADE}
      >
        <motion.div
          animate={{
            width: isHovering ? 58 : 36,
            height: isHovering ? 58 : 36,
            borderColor: isHovering
              ? "rgba(96, 165, 250, 0.92)"
              : "rgba(96, 165, 250, 0.48)",
            boxShadow: isHovering
              ? "0 0 16px 4px rgba(59,130,246,0.40), inset 0 0 10px rgba(59,130,246,0.18)"
              : "0 0 8px 1px rgba(59,130,246,0.20)",
            scale: isHovering ? 1 : 1,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderRadius: "50%",
            border: "1.5px solid rgba(96, 165, 250, 0.48)",
            // Subtle glass fill
            background: "rgba(59,130,246,0.04)",
            backdropFilter: "blur(1px)",
          }}
        />
      </motion.div>
    </>
  );
}
