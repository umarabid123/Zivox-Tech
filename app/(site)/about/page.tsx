import type { Metadata } from "next";
import AboutSection from "@/components/sections/About";

export const metadata: Metadata = { title: "About — Zivoxtech" };

export default function Page() {
  return <AboutSection />;
}
