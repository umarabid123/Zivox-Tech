import type { Metadata } from "next";
import TermsSection from "@/components/sections/Terms";

export const metadata: Metadata = { title: "Terms & Conditions — Zivox Tech" };

export default function Page() {
  return <TermsSection />;
}
