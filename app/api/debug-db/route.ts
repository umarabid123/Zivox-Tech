import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";
import { ensureAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // 1. Try to query team_members table
    const { data: teamMembers, error: teamError } = await supabaseService()
      .from("team_members")
      .select("*");

    if (teamError) {
      return NextResponse.json({
        ok: false,
        message: "Failed to query team_members table",
        error: teamError
      });
    }

    // 2. Try to run ensureAdminUser
    const user = await ensureAdminUser();

    const { data: adminUsers } = await supabaseService()
      .from("admin_users")
      .select("*");

    return NextResponse.json({
      ok: true,
      message: "Database queries worked!",
      adminUsersCount: adminUsers?.length,
      currentAdminUser: user
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      message: "An exception occurred",
      error: err.message,
      stack: err.stack
    });
  }
}
