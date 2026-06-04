import type { Metadata } from "next";
import PortfolioSection from "@/components/sections/Portfolio";

export const metadata: Metadata = { title: "Portfolio — Nexvora Tech" };

export default function Page() {
  return <PortfolioSection />;
}
