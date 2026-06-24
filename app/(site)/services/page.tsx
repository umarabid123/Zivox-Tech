import type { Metadata } from "next";
import ServicesSection from "@/components/sections/Services";

export const metadata: Metadata = { title: "Services — Zivox Tech" };

export default function Page() {
  return <ServicesSection />;
}
