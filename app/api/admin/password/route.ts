import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { getAdminSession, getAdminUserByEmail, updateAdminPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const currentPassword = body.currentPassword || "";
  const newPassword = body.newPassword || "";

  if (!currentPassword || newPassword.length < 8) {
    return NextResponse.json(
      { ok: false, error: "Enter your current password and a new password with at least 8 characters." },
      { status: 400 }
    );
  }

  const user = await getAdminUserByEmail(session.email);
  if (!user) {
    return NextResponse.json({ ok: false, error: "Admin account not found" }, { status: 404 });
  }

  const matches = await bcrypt.compare(currentPassword, user.password_hash);
  if (!matches) {
    return NextResponse.json({ ok: false, error: "Current password is incorrect" }, { status: 401 });
  }

  await updateAdminPassword(session.email, newPassword);
  return NextResponse.json({ ok: true });
}