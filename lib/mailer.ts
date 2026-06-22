import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { env } from "@/lib/env";

let _tx: Transporter | null = null;

function transport(): Transporter {
  if (_tx) return _tx;
  _tx = nodemailer.createTransport({
    host: env.smtpHost(),
    port: env.smtpPort(),
    secure: env.smtpPort() === 465,
    auth: { user: env.smtpUser(), pass: env.smtpPass() },
  });
  return _tx;
}

function escape(s: string): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function box(title: string, rows: Array<[string, string]>): string {
  const trs = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#666;font-size:13px;width:140px">${escape(k)}</td>` +
        `<td style="padding:8px 12px;color:#111;font-size:14px;white-space:pre-wrap">${escape(v)}</td></tr>`
    )
    .join("");
  return `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px">
    <h2 style="font-size:18px;margin:0 0 16px;color:#111">${escape(title)}</h2>
    <table style="border-collapse:collapse;width:100%;border:1px solid #eee;border-radius:8px;overflow:hidden">
      ${trs}
    </table>
    <p style="color:#999;font-size:12px;margin-top:16px">Sent automatically from nexvora.tech</p>
  </div>`;
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  details?: string;
}) {
  const html = box("New contact form submission", [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone ?? ""],
    ["Company", data.company ?? ""],
    ["Service", data.service ?? ""],
    ["Budget", data.budget ?? ""],
    ["Details", data.details ?? ""],
  ]);
  await transport().sendMail({
    from: env.smtpFrom(),
    to: env.contactToEmail(),
    replyTo: data.email,
    subject: `New contact: ${data.name}`,
    html,
  });
}

export async function sendBookingEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  meeting_date: string;
  meeting_time: string;
  notes?: string;
}) {
  const html = box("New booking request", [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone ?? ""],
    ["Company", data.company ?? ""],
    ["Date", data.meeting_date],
    ["Time", data.meeting_time],
    ["Notes", data.notes ?? ""],
  ]);
  await transport().sendMail({
    from: env.smtpFrom(),
    to: env.contactToEmail(),
    replyTo: data.email,
    subject: `New booking: ${data.name} — ${data.meeting_date} ${data.meeting_time}`,
    html,
  });
}
