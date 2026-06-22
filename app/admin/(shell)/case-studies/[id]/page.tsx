import { notFound } from "next/navigation";
import CaseForm from "@/components/admin/CaseForm";
import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditCase({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseService().from("case_studies").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <div className="a-card"><h2 style={{ marginTop: 0 }}>Edit case study</h2><CaseForm row={data} /></div>;
}
