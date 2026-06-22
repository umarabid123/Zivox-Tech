import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function count(table: string): Promise<number> {
  try {
    const { count } = await supabaseService()
      .from(table)
      .select("*", { count: "exact", head: true });
    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function AdminHome() {
  const [posts, portfolio, cases, services, testimonials, contacts, bookings] =
    await Promise.all([
      count("blog_posts"),
      count("portfolio_items"),
      count("case_studies"),
      count("services"),
      count("testimonials"),
      count("contact_submissions"),
      count("booking_submissions"),
    ]);

  const stats = [
    { label: "Blog posts", value: posts },
    { label: "Portfolio", value: portfolio },
    { label: "Case studies", value: cases },
    { label: "Services", value: services },
    { label: "Testimonials", value: testimonials },
    { label: "Contact leads", value: contacts },
    { label: "Bookings", value: bookings },
  ];

  return (
    <div className="a-grid">
      {stats.map((s) => (
        <div key={s.label} className="a-card a-stat">
          <div className="l">{s.label}</div>
          <div className="v">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
