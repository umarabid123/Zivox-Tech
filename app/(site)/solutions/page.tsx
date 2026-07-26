import type { Metadata } from "next";
import SolutionsSection from "@/components/sections/Solutions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Featured Projects • Zivoxtech",
  description: "A curated selection of products we've designed and built end-to-end — across web, mobile, AI and SaaS.",
};

export default function Page() {
  return <SolutionsSection />;
}
