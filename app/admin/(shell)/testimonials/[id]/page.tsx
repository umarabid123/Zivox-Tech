import { notFound } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { supabaseService } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseService().from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <div className="a-card"><h2 style={{ marginTop: 0 }}>Edit testimonial</h2><TestimonialForm row={data} /></div>;
}
