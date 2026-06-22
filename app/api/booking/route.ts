import { NextResponse } from "next/server";
import { supabaseService } from "@/lib/supabase/server";
import { sendBookingEmail } from "@/lib/mailer";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  meeting_date?: string;
  meeting_time?: string;
  notes?: string;
};

function clean(v: unknown): string {
  return typeof v === "string" ? v.trim().slice(0, 2000) : "";
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
    meeting_date: clean(body.meeting_date),
    meeting_time: clean(body.meeting_time),
    notes: clean(body.notes),
  };

  if (!data.name || !data.email || !data.meeting_date || !data.meeting_time) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(data.email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  try {
    await supabaseService().from("booking_submissions").insert(data);
  } catch (e) {
    console.error("booking insert failed", e);
  }

  try {
    await sendBookingEmail(data);
  } catch (e) {
    console.error("booking email failed", e);
    return NextResponse.json(
      { ok: true, warning: "Saved but email failed to send" },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true });
}
