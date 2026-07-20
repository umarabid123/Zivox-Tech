import { notFound } from "next/navigation";
import { supabaseAnon } from "@/lib/supabase/server";
import PortfolioHelixSection from "@/components/sections/PortfolioHelix";
import Link from "next/link";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import ProjectGallery from "@/components/sections/ProjectGallery";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "helix") {
    return { title: "Helix • Zivoxtech" };
  }

  try {
    const { data } = await supabaseAnon()
      .from("portfolio_items")
      .select("title")
      .eq("slug", slug)
      .maybeSingle();

    return {
      title: data ? `${data.title} • Zivoxtech` : "Project Details • Zivoxtech",
    };
  } catch {
    return { title: "Project Details • Zivoxtech" };
  }
}

type Project = {
  id: string;
  title: string;
  slug: string | null;
  category: string | null;
  description: string | null;
  short_description: string | null;
  full_description: string | null;
  cover_image: string | null;
  poster_url: string | null;
  gallery_urls: string[] | null;
  technologies: string[] | null;
  tags: string[] | null;
  project_url: string | null;
  link: string | null;
  github_url: string | null;
  featured: boolean | null;
  display_order: number | null;
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch the item
  let project: Project | null = null;
  try {
    const { data } = await supabaseAnon()
      .from("portfolio_items")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    project = data as Project | null;
  } catch (err) {
    console.error("Error fetching project:", err);
  }

  // Fallback to static Helix if slug is helix and no DB item exists
  if (slug === "helix" && !project) {
    return <PortfolioHelixSection />;
  }

  if (!project) {
    notFound();
  }

  const poster = project.poster_url || project.cover_image;
  const techs = project.technologies || project.tags || [];
  const projectLink = project.project_url || project.link;

  return (
    <section className="page active" data-page="portfolio-detail">
      <section className="project-hero">
        <div className="container">
          <div className="breadcrumb" style={{ marginBottom: '22px', display: 'inline-flex', gap: '10px', fontSize: '13px', color: 'var(--text-3)' }}>
            <Link href="/">Home</Link><span style={{ opacity: '0.4' }}>/</span>
            <Link href="/portfolio">Portfolio</Link><span style={{ opacity: '0.4' }}>/</span>
            <span>{project.title}</span>
          </div>
          <div className="project-hero-grid">
            <div className="reveal">
              <span className="eyebrow" style={{ textTransform: 'capitalize' }}>
                <span className="dot"></span> {project.category || "Project"}
              </span>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-0.03em', marginTop: '22px', lineHeight: '1.06' }}>
                {project.title}
              </h1>
              <p style={{ marginTop: '22px', color: 'var(--text-2)', fontSize: '17px', lineHeight: '1.6', maxWidth: '540px' }}>
                {project.description || project.short_description}
              </p>
              <div className="project-meta-grid">
                <div className="project-meta">
                  <div className="label">Category</div>
                  <div className="value" style={{ textTransform: 'capitalize' }}>{project.category || "Custom Development"}</div>
                </div>
                {techs.length > 0 && (
                  <div className="project-meta">
                    <div className="label">Technologies</div>
                    <div className="value">{techs.slice(0, 3).join(", ")}</div>
                  </div>
                )}
                {projectLink && (
                  <div className="project-meta">
                    <div className="label">Live Project</div>
                    <div className="value">
                      <a href={projectLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                        Visit Link
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link className="btn btn-primary" href="/contact">Build something similar <span className="arrow">→</span></Link>
                <Link className="btn btn-ghost" href="/portfolio">More work</Link>
              </div>
            </div>
            <div className="reveal" style={{ transitionDelay: '.1s' }}>
              {poster ? (
                <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-2)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={poster}
                    alt={project.title}
                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div className="dashboard" style={{ transform: 'rotateY(-3deg) rotateX(2deg)' }}>
                  <div className="dashboard-top">
                    <div className="traffic"><span></span><span></span><span></span></div>
                    <div className="url">{project.slug}.zivoxtech.com</div>
                    <div style={{ width: '32px' }}></div>
                  </div>
                  <div className="dashboard-body" style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center', color: 'var(--text-3)' }}>
                      <h3>{project.title}</h3>
                      <p style={{ fontSize: '13px' }}>Preview image not uploaded</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge / Full Description Section */}
      <section className="section" style={{ paddingTop: '60px', paddingBottom: '40px' }}>
        <div className="container">
          <div className="why-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="reveal">
              <div className="section-eyebrow">Project Details</div>
              <h2 className="section-title">Overview &amp; <span className="serif-italic">Outcomes.</span></h2>
              <div style={{ fontSize: '17px', color: 'var(--text-2)', lineHeight: '1.7', marginTop: '24px', whiteSpace: 'pre-line' }}>
                {project.full_description || project.description || project.short_description}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery_urls && project.gallery_urls.length > 0 && (
        <ProjectGallery galleryUrls={project.gallery_urls} title={project.title} />
      )}

      {/* Under the hood (technologies) */}
      {techs.length > 0 && (
        <section className="section" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="container">
            <header className="section-header reveal">
              <div className="section-eyebrow">Under the hood</div>
              <h2 className="section-title">The <span className="serif-italic">tech stack</span> we used.</h2>
            </header>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }} className="reveal">
              {techs.map((t, i) => (
                <span key={i} className="tag" style={{ padding: '8px 14px', fontSize: '13px' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="cta-box reveal">
            <h2>Got a similar challenge? <span className="serif-italic">Let's chat.</span></h2>
            <p>Most projects start with a 30-minute discovery call — usually free.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary btn-lg" href="/contact">Start a project <span className="arrow">→</span></Link>
              <Link className="btn btn-ghost btn-lg" href="/book">Book consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
