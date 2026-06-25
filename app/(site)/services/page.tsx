import type { Metadata } from "next";
import ServicesSection from "@/components/sections/Services";

export const metadata: Metadata = { title: "Services • Zivoxtech" };

export default function Page() {
  return <ServicesSection />;
}
