"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseService } from "@/lib/supabase/server";
import { getAdminSession } from "@/lib/auth";
import { env } from "@/lib/env";

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

/* ---------------- PORTFOLIO / FEATURED PROJECTS ---------------- */

/** Extract storage path from a public Supabase URL */
function storagePathFrom(publicUrl: string, bucket: string): string | null {
  try {
    const url = new URL(publicUrl);
    // Pattern: /storage/v1/object/public/<bucket>/<path>
    const marker = `/storage/v1/object/public/${bucket}/`;
    const idx = url.pathname.indexOf(marker);
    if (idx === -1) return null;
    return url.pathname.slice(idx + marker.length);
  } catch {
    return null;
  }
}

/** Delete a list of public image URLs from Supabase Storage (best-effort) */
async function deleteImagesFromStorage(urls: string[]) {
  const bucket = env.storageBucket();
  const sb = supabaseService();
  const paths = urls
    .filter(Boolean)
    .map((u) => storagePathFrom(u, bucket))
    .filter((p): p is string => p !== null);
  if (paths.length > 0) {
    await sb.storage.from(bucket).remove(paths);
  }
}

export async function savePortfolio(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id") as string | null;
  const title = String(formData.get("title") || "").trim();

  // Gallery URLs stored as JSON array in hidden field
  let galleryUrls: string[] = [];
  try {
    const raw = String(formData.get("gallery_urls") || "[]");
    galleryUrls = JSON.parse(raw);
    if (!Array.isArray(galleryUrls)) galleryUrls = [];
  } catch { galleryUrls = []; }

  const row = {
    title,
    slug: String(formData.get("slug") || "").trim() || slugify(title),
    category: String(formData.get("category") || ""),
    short_description: String(formData.get("short_description") || ""),
    full_description: String(formData.get("full_description") || ""),
    poster_url: String(formData.get("poster_url") || ""),
    gallery_urls: galleryUrls,
    technologies: tags(formData.get("technologies")),
    project_url: String(formData.get("project_url") || ""),
    github_url: String(formData.get("github_url") || ""),
    featured: formData.get("featured") === "true",
    display_order: toInt(formData.get("display_order")),
    background_color: String(formData.get("background_color") || "#10B981"),
    status: String(formData.get("status") || "draft"),
    // keep legacy columns in sync
    description: String(formData.get("short_description") || ""),
    cover_image: String(formData.get("poster_url") || ""),
    tags: tags(formData.get("technologies")),
    link: String(formData.get("project_url") || ""),
    sort_order: toInt(formData.get("display_order")),
    published: formData.get("status") === "published",
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
  revalidatePath("/solutions");
  redirect("/admin/portfolio");
}

export async function deletePortfolio(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  const sb = supabaseService();

  // Fetch image URLs before deleting the row
  const { data } = await sb
    .from("portfolio_items")
    .select("poster_url, cover_image, gallery_urls")
    .eq("id", id)
    .maybeSingle();

  await sb.from("portfolio_items").delete().eq("id", id);

  // Clean up storage images (best-effort, don't fail delete if storage errors)
  if (data) {
    const toDelete = [
      data.poster_url,
      data.cover_image,
      ...(Array.isArray(data.gallery_urls) ? data.gallery_urls : []),
    ].filter((u): u is string => Boolean(u));
    await deleteImagesFromStorage(toDelete).catch(() => {});
  }

  revalidatePath("/admin/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/solutions");
}

export async function toggleProjectStatus(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  const currentStatus = String(formData.get("current_status") || "draft");
  const newStatus = currentStatus === "published" ? "draft" : "published";
  await supabaseService()
    .from("portfolio_items")
    .update({ status: newStatus, published: newStatus === "published" })
    .eq("id", id);
  revalidatePath("/admin/portfolio");
  revalidatePath("/solutions");
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

/* ---------------- TRUSTED COMPANIES ---------------- */

export async function saveTrustedCompany(formData: FormData) {
  await ensureAdmin();
  const id = formData.get("id") as string | null;
  const row = {
    name: String(formData.get("name") || "").trim(),
    logo_url: String(formData.get("logo_url") || "") || null,
    tagline: String(formData.get("tagline") || "") || null,
    website_url: String(formData.get("website_url") || "") || null,
    display_order: toInt(formData.get("display_order")),
    is_active: toBool(formData.get("is_active")),
  };
  if (!row.name) throw new Error("Company name is required.");
  const sb = supabaseService();
  if (id) {
    const { error } = await sb.from("trusted_companies").update(row).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await sb.from("trusted_companies").insert(row);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/trusted-companies");
  revalidatePath("/about");
  redirect("/admin/trusted-companies");
}

export async function deleteTrustedCompany(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  await supabaseService().from("trusted_companies").delete().eq("id", id);
  revalidatePath("/admin/trusted-companies");
  revalidatePath("/about");
}

export async function toggleCompanyActive(formData: FormData) {
  await ensureAdmin();
  const id = String(formData.get("id"));
  const current = formData.get("is_active") === "true";
  await supabaseService()
    .from("trusted_companies")
    .update({ is_active: !current })
    .eq("id", id);
  revalidatePath("/admin/trusted-companies");
  revalidatePath("/about");
}

export async function reorderCompanies(formData: FormData) {
  await ensureAdmin();
  let order: { id: string; display_order: number }[] = [];
  try {
    order = JSON.parse(String(formData.get("order") || "[]"));
  } catch {
    throw new Error("Invalid order payload");
  }
  const sb = supabaseService();
  await Promise.all(
    order.map(({ id, display_order }) =>
      sb.from("trusted_companies").update({ display_order }).eq("id", id)
    )
  );
  revalidatePath("/admin/trusted-companies");
  revalidatePath("/about");
}

export async function updateTrustMode(formData: FormData) {
  await ensureAdmin();
  const mode = String(formData.get("mode") || "marquee");
  const sb = supabaseService();
  const { error } = await sb
    .from("site_settings")
    .upsert({ key: "about_trust_mode", value: mode }, { onConflict: "key" });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/trusted-companies");
  revalidatePath("/about");
}

