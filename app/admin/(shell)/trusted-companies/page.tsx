import { supabaseService } from "@/lib/supabase/server";
import TrustedCompaniesClient from "@/components/admin/TrustedCompaniesClient";
import type { Company } from "@/components/admin/TrustedCompaniesClient";

export const dynamic = "force-dynamic";

async function fetchCompanies(): Promise<Company[]> {
  try {
    const { data, error } = await supabaseService()
      .from("trusted_companies")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Company[];
  } catch {
    return [];
  }
}

async function fetchTrustMode(): Promise<string> {
  try {
    const { data } = await supabaseService()
      .from("site_settings")
      .select("value")
      .eq("key", "about_trust_mode")
      .maybeSingle();
    return data?.value ?? "marquee";
  } catch {
    return "marquee";
  }
}

export default async function TrustedCompaniesPage() {
  const [companies, trustMode] = await Promise.all([fetchCompanies(), fetchTrustMode()]);

  return (
    <TrustedCompaniesClient companies={companies} trustMode={trustMode} />
  );
}
