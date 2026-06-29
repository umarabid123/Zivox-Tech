import type { Metadata } from "next";
import CaseStudiesSection from "@/components/sections/CaseStudies";

export const metadata: Metadata = { title: "Case Studies • Zivoxtech" };

export default function Page() {
  return <CaseStudiesSection />;
}
