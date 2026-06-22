import { notFound } from "next/navigation";
import PortfolioForm from "@/components/admin/PortfolioForm";
import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditPortfolio({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseService().from("portfolio_items").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return (
    <div className="a-card">
      <h2 style={{ marginTop: 0 }}>Edit portfolio item</h2>
      <PortfolioForm row={data} />
    </div>
  );
}
