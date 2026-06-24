import type { Metadata } from "next";
import PrivacySection from "@/components/sections/Privacy";

export const metadata: Metadata = { title: "Privacy Policy — Zivox Tech" };

export default function Page() {
  return <PrivacySection />;
}
