import type { Metadata } from "next";
import ContactSection from "@/components/sections/Contact";

export const metadata: Metadata = { title: "Contact — Nexvora Tech" };

export default function Page() {
  return <ContactSection />;
}
