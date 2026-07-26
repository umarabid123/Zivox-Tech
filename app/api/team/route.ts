import { supabaseService } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabaseService()
      .from("team_members")
      .select("id, name, title, photo_url, company, bio, linkedin_url, display_order")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch {
    // Return empty array — frontend falls back to hardcoded defaults
    return NextResponse.json([]);
  }
}
