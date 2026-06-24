import type { Metadata } from "next";
import AboutSection from "@/components/sections/About";

export const metadata: Metadata = { title: "About — Zivox Tech" };

export default function Page() {
  return <AboutSection />;
}
