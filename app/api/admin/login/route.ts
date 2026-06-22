import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { signSession, setAdminCookie } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 });
  }

  const adminEmail = env.adminEmail().trim().toLowerCase();
  const adminPassword = env.adminPassword();

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signSession(adminEmail);
  await setAdminCookie(token);
  return NextResponse.json({ ok: true });
}
