import type { Metadata } from "next";
import ContactSection from "@/components/sections/Contact";

export const metadata: Metadata = { title: "Contact • Zivoxtech" };

export default function Page() {
  return <ContactSection />;
}
