import type { Metadata } from "next";
import AboutSection from "@/components/sections/About";

export const metadata: Metadata = { title: "About — Nexvora Tech" };

export default function Page() {
  return <AboutSection />;
}
