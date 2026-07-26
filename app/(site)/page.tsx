import type { Metadata } from "next";
import HomeSection from "@/components/sections/Home";
import { supabaseAnon } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Zivoxtech • Builds Together" };

async function getFeaturedProjects() {
  try {
    const { data } = await supabaseAnon()
      .from("portfolio_items")
      .select(
        "id,title,slug,short_description,description,poster_url,cover_image,technologies,tags,project_url,link,github_url,featured,status,display_order"
      )
      .or("status.eq.published,published.eq.true")
      .order("featured", { ascending: false })
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(6);
    return (data ?? []) as Parameters<typeof HomeSection>[0]["featuredProjects"];
  } catch {
    return [];
  }
}

export default async function Page() {
  const featuredProjects = await getFeaturedProjects();
  return <HomeSection featuredProjects={featuredProjects} />;
}
