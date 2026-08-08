import Link from "next/link";
import { supabaseAnon } from "@/lib/supabase/server";
import AnimatedSection from "@/components/ui/AnimatedSection";
import FeaturedProjectsClient from "./FeaturedProjectsClient";

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

async function getProjects(): Promise<Project[]> {
  try {
    const { data } = await supabaseAnon()
      .from("portfolio_items")
      .select(
        "id,title,slug,short_description,description,poster_url,cover_image,technologies,tags,project_url,link,github_url,featured,status,display_order"
      )
      .or("status.eq.published,published.eq.true")
      .order("featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(12);
    return (data ?? []) as Project[];
  } catch {
    return [];
  }
}

export default async function SolutionsSection() {
  const projects = await getProjects();

  return (
    <section className="page active" data-page="solutions">
      {/* Page header */}
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Featured Projects</span>
          </div>
          <h1>
            Work we&apos;re{" "}
            <span className="serif-italic">proud of.</span>
          </h1>
          <p className="lead">
            Hand-picked projects built end-to-end for clients across industries — live, shipped, and making an impact.
          </p>
        </div>
      </section>

      {/* Featured Projects grid — live data from CMS */}
      <FeaturedProjectsClient projects={projects} />

      {/* Process section */}
      <section className="section" style={{ paddingTop: "40px" }}>
        <div className="container">
          <AnimatedSection as="header" className="section-header center reveal" variant="fadeUp">
            <div className="section-eyebrow">How we work</div>
            <h2 className="section-title">
              Patterns, <span className="serif-italic">not</span> templates.
            </h2>
            <p className="section-sub">
              Every project is rebuilt for your team — same proven shape, completely new code and design tuned to fit.
            </p>
          </AnimatedSection>

          <div className="process-grid">
            {[
              {
                num: "01",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20l9-7-9-7-9 7 9 7zM12 4v16" />
                  </svg>
                ),
                title: "Discovery first",
                desc: "We learn your workflow before proposing anything. Bring spreadsheets, screenshots, half-finished projects — all useful.",
              },
              {
                num: "02",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                ),
                title: "Adapt the pattern",
                desc: "We take a proven shape and bend it to your terminology, roles, and existing tools — not the other way around.",
              },
              {
                num: "03",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ),
                title: "You own the code",
                desc: "Clean, documented code that stays yours. No unnecessary lock-in, no black box.",
              },
              {
                num: "04",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                  </svg>
                ),
                title: "Test & Deploy",
                desc: "We rigorously test every integration and deploy to production, ensuring a flawless launch with zero downtime.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} className="service-card process-card" variant="fadeUp" delay={i * 0.1}>
                <div className="process-number">{item.num}</div>
                <div className="service-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <AnimatedSection className="cta-box reveal" variant="scaleUp">
            <h2>
              Have a project in mind?{" "}
              <span className="serif-italic">Let&apos;s talk.</span>
            </h2>
            <p>
              Tell us what you&apos;re building and we&apos;ll tell you if — and how — we can help.
            </p>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" href="/contact">
                Start a conversation <span className="arrow">→</span>
              </Link>
              <Link className="btn btn-ghost btn-lg" href="/portfolio">
                See all work
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </section>
  );
}
