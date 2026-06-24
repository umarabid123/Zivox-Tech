"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseService } from "@/lib/supabase/server";
import { getAdminSession } from "@/lib/auth";

async function ensureAdmin() {
  const s = await getAdminSession();
  if (!s) throw new Error("Unauthorized");
}

function slugify(s: string): string {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function toBool(v: FormDataEntryValue | null): boolean {
  if (v == null) return false;
  if (typeof v === "string") return v === "on" || v === "true" || v === "1";
  return false;
}

function toInt(v: FormDataEntryValue | null, dflt = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : dflt;
}

function tags(v: FormDataEntryValue | null): string[] {
  if (typeof v !== "string") return [];
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ---------------- BLOG ---------------- */
export async function saveBlog(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id") as string | null;
  const title = String(formData.get("title") || "").trim();
  const slug =
    String(formData.get("slug") || "").trim() || slugify(title);
  const row = {
    title,
    slug,
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    cover_image: String(formData.get("cover_image") || ""),
    category: String(formData.get("category") || ""),
    read_time: String(formData.get("read_time") || ""),
    author: String(formData.get("author") || "Zivox Team"),
    published: toBool(formData.get("published")),
  };
  const sb = supabaseService();
  if (id) {
    const { error } = await sb.from("blog_posts").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("blog_posts").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlog(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("blog_posts").delete().eq("id", id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

/* ---------------- PORTFOLIO ---------------- */
export async function savePortfolio(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id") as string | null;
  const title = String(formData.get("title") || "").trim();
  const row = {
    title,
    slug: String(formData.get("slug") || "").trim() || slugify(title),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
    cover_image: String(formData.get("cover_image") || ""),
    link: String(formData.get("link") || ""),
    tags: tags(formData.get("tags")),
    sort_order: toInt(formData.get("sort_order")),
    published: toBool(formData.get("published")),
  };
  const sb = supabaseService();
  if (id) {
    const { error } = await sb.from("portfolio_items").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("portfolio_items").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function deletePortfolio(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("portfolio_items").delete().eq("id", id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
}

/* ---------------- CASE STUDIES ---------------- */
export async function saveCase(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id") as string | null;
  const title = String(formData.get("title") || "").trim();
  let metrics: unknown = [];
  const metricsRaw = String(formData.get("metrics") || "").trim();
  if (metricsRaw) {
    try {
      metrics = JSON.parse(metricsRaw);
    } catch {
      throw new Error("Metrics must be valid JSON, e.g. [{\"label\":\"ROI\",\"value\":\"+220%\"}]");
    }
  }
  const row = {
    title,
    slug: String(formData.get("slug") || "").trim() || slugify(title),
    client: String(formData.get("client") || ""),
    industry: String(formData.get("industry") || ""),
    summary: String(formData.get("summary") || ""),
    content: String(formData.get("content") || ""),
    cover_image: String(formData.get("cover_image") || ""),
    metrics,
    sort_order: toInt(formData.get("sort_order")),
    published: toBool(formData.get("published")),
  };
  const sb = supabaseService();
  if (id) {
    const { error } = await sb.from("case_studies").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("case_studies").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
  redirect("/admin/case-studies");
}

export async function deleteCase(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("case_studies").delete().eq("id", id);
  revalidatePath("/admin/case-studies");
  revalidatePath("/case-studies");
}

/* ---------------- SERVICES ---------------- */
export async function saveService(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id") as string | null;
  const title = String(formData.get("title") || "").trim();
  const row = {
    title,
    slug: String(formData.get("slug") || "").trim() || slugify(title),
    icon: String(formData.get("icon") || ""),
    description: String(formData.get("description") || ""),
    features: tags(formData.get("features")),
    pricing: String(formData.get("pricing") || ""),
    sort_order: toInt(formData.get("sort_order")),
    published: toBool(formData.get("published")),
  };
  const sb = supabaseService();
  if (id) {
    const { error } = await sb.from("services").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("services").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/services");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
}

/* ---------------- TESTIMONIALS ---------------- */
export async function saveTestimonial(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id") as string | null;
  const row = {
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    company: String(formData.get("company") || ""),
    avatar: String(formData.get("avatar") || ""),
    quote: String(formData.get("quote") || ""),
    rating: toInt(formData.get("rating"), 5),
    sort_order: toInt(formData.get("sort_order")),
    published: toBool(formData.get("published")),
  };
  const sb = supabaseService();
  if (id) {
    const { error } = await sb.from("testimonials").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("testimonials").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

/* ---------------- SUBMISSIONS ---------------- */
export async function markContactStatus(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status") || "read");
  await supabaseService().from("contact_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin/contacts");
}

export async function deleteContact(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("contact_submissions").delete().eq("id", id);
  revalidatePath("/admin/contacts");
}

export async function markBookingStatus(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status") || "read");
  await supabaseService().from("booking_submissions").update({ status }).eq("id", id);
  revalidatePath("/admin/bookings");
}

export async function deleteBooking(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("booking_submissions").delete().eq("id", id);
  revalidatePath("/admin/bookings");
}
