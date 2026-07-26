import { notFound } from "next/navigation";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { supabaseService } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EditPortfolio({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseService()
    .from("portfolio_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  return (
    <div className="a-card">
      <div className="a-top" style={{ marginBottom: 20, paddingBottom: 12 }}>
        <h2 className="a-h1" style={{ fontSize: 18, margin: 0 }}>
          Edit Project
        </h2>
        <Link className="a-btn secondary" href="/admin/portfolio">
          ← Back to Portfolio
        </Link>
      </div>
      <PortfolioForm row={data} />
    </div>
  );
}
