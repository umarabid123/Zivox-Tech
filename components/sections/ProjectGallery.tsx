"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectGalleryProps {
  galleryUrls: string[];
  title: string;
}

export default function ProjectGallery({ galleryUrls, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (galleryUrls.length <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % galleryUrls.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [galleryUrls, isHovered]);

  if (!galleryUrls || galleryUrls.length === 0) return null;

  const activeUrl = galleryUrls[activeIndex];

  return (
    <section className="section" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
      <div className="container">
        <header className="section-header reveal in">
          <div className="section-eyebrow">Gallery</div>
          <h2 className="section-title">
            Project <span className="serif-italic">screenshots.</span>
          </h2>
        </header>

        <div 
          className="pg-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Large Image Preview */}
          <div className="pg-main-view">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="pg-main-image-wrap"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeUrl}
                  alt={`${title} Screenshot ${activeIndex + 1}`}
                  className="pg-main-image"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar Thumbnails Panel */}
          <div className="pg-sidebar">
            <div className="pg-sidebar-title">
              Screenshots ({galleryUrls.length})
            </div>
            <div className="pg-thumbnails-grid">
              {galleryUrls.map((url, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`pg-thumb-btn ${isActive ? "active" : ""}`}
                    aria-label={`View screenshot ${idx + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`${title} Thumbnail ${idx + 1}`}
                      className="pg-thumb-img"
                    />
                    {isActive && (
                      <motion.div 
                        layoutId="activeBorder" 
                        className="pg-active-indicator" 
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .pg-container {
          display: grid;
          grid-template-columns: 1.55fr 1fr;
          gap: 24px;
          margin-top: 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-2, rgba(255,255,255,0.08));
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(8px);
        }

        [data-theme="light"] .pg-container {
          background: rgba(0, 0, 0, 0.015);
          border-color: rgba(0, 0, 0, 0.08);
        }

        .pg-main-view {
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          border: 1px solid var(--border-2, rgba(255,255,255,0.08));
        }

        [data-theme="light"] .pg-main-view {
          background: #f3f4f6;
          border-color: rgba(0, 0, 0, 0.08);
        }

        .pg-main-image-wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pg-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pg-sidebar {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pg-sidebar-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-2);
          letter-spacing: -0.01em;
        }

        .pg-thumbnails-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          overflow-y: auto;
          max-height: 400px;
          padding-right: 4px;
        }

        .pg-thumb-btn {
          position: relative;
          aspect-ratio: 16/10;
          border-radius: 8px;
          overflow: hidden;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .pg-thumb-btn:hover {
          transform: translateY(-2px);
        }

        .pg-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border-radius: 8px;
          border: 1px solid var(--border-2, rgba(255,255,255,0.08));
          transition: border-color 0.2s ease;
        }

        [data-theme="light"] .pg-thumb-img {
          border-color: rgba(0, 0, 0, 0.08);
        }

        .pg-active-indicator {
          position: absolute;
          inset: 0;
          border: 2px solid var(--accent, #3B82F6);
          border-radius: 8px;
          pointer-events: none;
          z-index: 2;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .pg-container {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 16px;
          }
          
          .pg-thumbnails-grid {
            grid-template-columns: repeat(4, 1fr);
            max-height: none;
          }
        }

        @media (max-width: 575px) {
          .pg-thumbnails-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
