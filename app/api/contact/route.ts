import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";
import { sendContactEmail } from "@/lib/mailer";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  details?: string;
};

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, 5000) : "";
}

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const data = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    company: clean(body.company),
    service: clean(body.service),
    budget: clean(body.budget),
    details: clean(body.details),
  };

  if (!data.name || !data.email || !data.details) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  // 1) Save to DB (don't block on storage errors)
  try {
    await supabaseService().from("contact_submissions").insert(data);
  } catch (e) {
    console.error("contact insert failed", e);
  }

  // 2) Send email
  try {
    await sendContactEmail(data);
  } catch (e) {
    console.error("contact email failed", e);
    return NextResponse.json(
      { ok: true, warning: "Saved but email failed to send" },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true });
}
