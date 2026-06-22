import type { Metadata } from "next";
import CaseStudiesSection from "@/components/sections/CaseStudies";

export const metadata: Metadata = { title: "Case Studies — Nexvora Tech" };

export default function Page() {
  return <CaseStudiesSection />;
}
