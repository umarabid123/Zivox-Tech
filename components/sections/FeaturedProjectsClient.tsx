"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { flushSync } from "react-dom";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  slug: string | null;
  short_description: string | null;
  description: string | null;
  poster_url: string | null;
  cover_image: string | null;
  technologies: string[] | null;
  tags: string[] | null;
  project_url: string | null;
  link: string | null;
  github_url: string | null;
  featured: boolean | null;
  status: string | null;
  display_order: number | null;
};

const GRADIENT_PALETTES = [
  "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 100%)",
  "linear-gradient(135deg, rgba(16,185,129,0.10) 0%, rgba(59,130,246,0.08) 100%)",
  "linear-gradient(135deg, rgba(245,158,11,0.10) 0%, rgba(239,68,68,0.07) 100%)",
  "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)",
  "linear-gradient(135deg, rgba(236,72,153,0.10) 0%, rgba(245,158,11,0.08) 100%)",
  "linear-gradient(135deg, rgba(6,182,212,0.10) 0%, rgba(59,130,246,0.08) 100%)",
];

const AUTO_SLIDE_MS = 2000;
const CARD_GAP = 20; // px — must match CSS .fp-slider-track gap

/* ── Project Card ── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const techs = project.technologies || project.tags || [];
  const description = project.short_description || project.description || "";
  const poster = project.poster_url || project.cover_image;
  const href = project.slug
    ? `/portfolio/${project.slug}`
    : project.project_url || project.link || null;
  const gradient = GRADIENT_PALETTES[index % GRADIENT_PALETTES.length];

  return (
    <motion.div
      className="fp-card"
      whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.3 } }}
      style={{ background: gradient }}
    >
      {project.featured && (
        <div className="fp-badge">
          <span className="fp-badge-dot" />
          Featured
        </div>
      )}

      <div className="fp-poster">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt={project.title} className="fp-poster-img" />
        ) : (
          <div className="fp-poster-mock">
            <div className="fp-mock-bar blue" />
            <div className="fp-mock-bar" />
            <div className="fp-mock-bar short" />
            <div className="fp-mock-grid">
              <div className="fp-mock-tile blue" />
              <div className="fp-mock-tile" />
              <div className="fp-mock-tile" />
              <div className="fp-mock-tile blue" />
            </div>
          </div>
        )}
        <div className="fp-poster-shimmer" />
      </div>

      <div className="fp-body">
        {techs.length > 0 && (
          <div className="fp-tags">
            {techs.slice(0, 4).map((t, i) => (
              <span key={i} className="fp-tag">{t}</span>
            ))}
            {techs.length > 4 && (
              <span className="fp-tag muted">+{techs.length - 4}</span>
            )}
          </div>
        )}
        <h3 className="fp-title">{project.title}</h3>
        {description && <p className="fp-desc">{description}</p>}
        <div className="fp-actions">
          {href ? (
            <Link
              href={href}
              className="fp-btn primary"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              View Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          ) : (
            <span className="fp-btn primary disabled">View Project</span>
          )}
          {project.github_url && (
            <Link href={project.github_url} className="fp-btn ghost" target="_blank" rel="noopener noreferrer" title="View on GitHub">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Nav Button ── */
function SliderBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      className={`fp-slider-btn fp-slider-btn--${dir}`}
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}

/* ── Responsive perPage ── */
function usePerPage() {
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerPage(1);
      else if (window.innerWidth < 1024) setPerPage(2);
      else setPerPage(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}

interface FeaturedProjectsClientProps {
  projects: Project[];
  compact?: boolean;
}

export default function FeaturedProjectsClient({ projects, compact = false }: FeaturedProjectsClientProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: false, amount: 0.2 });

  const perPage = usePerPage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  /**
   * trackCards: indices into `projects[]`.
   * Length = perPage + 1 (perPage visible + 1 buffer card off-screen for sliding).
   * When sliding NEXT → extra card is on the RIGHT.
   * When sliding PREV → extra card is on the LEFT.
   */
  const [trackCards, setTrackCards] = useState<number[]>(() =>
    Array.from({ length: perPage + 1 }, (_, i) => i % projects.length)
  );

  // x motion value drives the track's horizontal position
  const x = useMotionValue(0);

  // The leftmost visible card index (used for dots)
  const activeIdx = trackCards[0];

  // Reinit when perPage changes
  useEffect(() => {
    const first = trackCards[0] ?? 0;
    setTrackCards(Array.from({ length: perPage + 1 }, (_, i) => (first + i) % projects.length));
    x.set(0);
    setProgressKey((k) => k + 1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);

  /**
   * Amount to translate for 1 card = card width + gap.
   * card width = (viewport - (perPage-1)*gap) / perPage
   * slot width = card width + gap = (viewport + gap) / perPage
   */
  const getSlotWidth = useCallback(() => {
    if (!viewportRef.current) return 0;
    return (viewportRef.current.offsetWidth + CARD_GAP) / perPage;
  }, [perPage]);

  /* ── SLIDE NEXT (left) ── */
  const slideNext = useCallback(async () => {
    if (isAnimatingRef.current || !viewportRef.current) return;
    isAnimatingRef.current = true;
    setProgressKey((k) => k + 1);

    const slotW = getSlotWidth();
    // Animate track LEFT by one slot
    await animate(x, -slotW, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });

    // Remove leftmost card, append new card on right
    setTrackCards((prev) => {
      const newLast = (prev[prev.length - 1] + 1) % projects.length;
      return [...prev.slice(1), newLast];
    });
    // Snap back to 0 (no animation — DOM update already shifted cards)
    x.set(0);
    isAnimatingRef.current = false;
  }, [getSlotWidth, projects.length, x]);

  /* ── SLIDE PREV (right) ── */
  const slidePrev = useCallback(async () => {
    if (isAnimatingRef.current || !viewportRef.current) return;
    isAnimatingRef.current = true;
    setProgressKey((k) => k + 1);

    const slotW = getSlotWidth();

    // 1. Synchronously prepend a new card on the LEFT (flushSync forces immediate re-render)
    flushSync(() => {
      setTrackCards((prev) => {
        const newFirst = (prev[0] - 1 + projects.length) % projects.length;
        return [newFirst, ...prev.slice(0, perPage)]; // keep length = perPage + 1
      });
    });

    // 2. Jump x to -slotW so viewport still shows the old cards (new card is off-screen left)
    x.set(-slotW);

    // 3. Animate track RIGHT to 0 — new card slides into view
    await animate(x, 0, { duration: 0.45, ease: [0.22, 1, 0.36, 1] });

    isAnimatingRef.current = false;
  }, [getSlotWidth, perPage, projects.length, x]);

  /* ── Jump to specific project (dot click) ── */
  const goToProject = useCallback((targetIdx: number) => {
    if (isAnimatingRef.current) return;
    setTrackCards(
      Array.from({ length: perPage + 1 }, (_, i) => (targetIdx + i) % projects.length)
    );
    x.set(0);
    setProgressKey((k) => k + 1);
  }, [perPage, projects.length, x]);

  /* ── Auto-slide every 2 s, pauses on hover ── */
  useEffect(() => {
    if (isPaused || projects.length <= 1) return;
    const id = setInterval(slideNext, AUTO_SLIDE_MS);
    return () => clearInterval(id);
  }, [isPaused, slideNext, projects.length]);

  if (projects.length === 0) return null;

  return (
    <section
      className={compact ? "fp-section fp-section--compact" : "fp-section"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* ── Header ── */}
        {compact ? (
          <motion.header
            ref={headerRef}
            className="section-header reveal"
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-eyebrow">Featured Projects</div>
            <h2 className="section-title">
              Work we&apos;re <span className="serif-italic">proud of.</span>
            </h2>
            <p className="section-sub">
              A curated selection of products we&apos;ve shipped — each one built end-to-end.
            </p>
          </motion.header>
        ) : (
          <motion.div
            ref={headerRef}
            className="fp-header"
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 32, filter: "blur(6px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="fp-eyebrow">
              <span className="fp-eyebrow-dot" />
              Our Work
            </div>
            <h2 className="fp-section-title">
              Featured <span className="serif-italic">Projects</span>
            </h2>
            <p className="fp-section-sub">
              A curated selection of products we&apos;ve designed and built end-to-end — across web, mobile, AI and SaaS.
            </p>
          </motion.div>
        )}

        {/* ── Carousel ── */}
        <div className="fp-slider-outer">
          <SliderBtn dir="prev" onClick={slidePrev} />

          {/* Viewport: clips the track */}
          <div ref={viewportRef} className="fp-slider-viewport">
            {/* Track: wider than viewport, slides on x axis */}
            <motion.div
              className="fp-slider-track"
              style={{
                x,
                "--fp-per-page": perPage,
                "--fp-gap": `${CARD_GAP}px`,
              } as any}
            >
              {trackCards.map((projectIdx, i) => (
                <div key={`card-${i}-${projectIdx}`} className="fp-slide-card">
                  <ProjectCard project={projects[projectIdx]} index={projectIdx} />
                </div>
              ))}
            </motion.div>
          </div>

          <SliderBtn dir="next" onClick={slideNext} />
        </div>

        {/* ── Dot indicators (one per project) ── */}
        {projects.length > 1 && (
          <div className="fp-dots">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`fp-dot${i === activeIdx ? " fp-dot--active" : ""}`}
                onClick={() => goToProject(i)}
                aria-label={`Go to project ${i + 1}`}
              >
                {i === activeIdx && (
                  <span
                    key={progressKey}
                    className={`fp-dot-progress${isPaused ? " fp-dot-progress--paused" : ""}`}
                    style={{ animationDuration: `${AUTO_SLIDE_MS}ms` }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* ── CTA ── */}
        <motion.div
          className="fp-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/portfolio" className="btn btn-ghost btn-lg">
            View all work <span className="arrow">→</span>
          </Link>
          {!compact && (
            <Link href="/book" className="btn btn-primary btn-lg">
              Start a project <span className="arrow">→</span>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
