import type { Metadata } from "next";
import TermsSection from "@/components/sections/Terms";

export const metadata: Metadata = { title: "Terms & Conditions — Nexvora Tech" };

export default function Page() {
  return <TermsSection />;
}
