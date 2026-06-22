import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";
import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditService({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseService().from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <div className="a-card"><h2 style={{ marginTop: 0 }}>Edit service</h2><ServiceForm row={data} /></div>;
}
