import type { Metadata } from "next";
import HomeSection from "@/components/sections/Home";

export const metadata: Metadata = { title: "Zivoxtech • Builds Together" };

export default function Page() {
  return <HomeSection />;
}
