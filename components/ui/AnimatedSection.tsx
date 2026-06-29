"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** Animation variant: "fadeUp" | "fadeIn" | "scaleUp" */
  variant?: "fadeUp" | "fadeIn" | "scaleUp";
  /** Tag to render as (default: "div") */
  as?: keyof React.JSX.IntrinsicElements;
  /** Threshold to trigger animation (default: 0.1) */
  threshold?: number;
  id?: string;
}

const variants = {
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(6px)",
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
    },
  },
  fadeIn: {
    hidden: {
      opacity: 0,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
    },
  },
  scaleUp: {
    hidden: {
      opacity: 0,
      scale: 0.92,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
  },
};

const transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function AnimatedSection({
  children,
  className,
  style,
  delay = 0,
  variant = "fadeUp",
  as: Tag = "div",
  threshold = 0.1,
  id,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false, // replay every time section enters viewport
    amount: threshold,
    margin: "0px 0px -60px 0px",
  });

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{ ...transition, delay }}
    >
      {children}
    </MotionTag>
  );
}

// ─────────────────────────────────────────────────────────
// Staggered container for grids/lists of children
// ─────────────────────────────────────────────────────────

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
  /** Entry threshold (default: 0.08) */
  threshold?: number;
  id?: string;
}

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(5px)",
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export function StaggerContainer({
  children,
  className,
  style,
  staggerDelay = 0,
  threshold = 0.08,
  id,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: threshold,
    margin: "0px 0px -60px 0px",
  });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...staggerContainerVariants,
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={staggerItemVariants}
    >
      {children}
    </motion.div>
  );
}
