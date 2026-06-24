import type { Metadata } from "next";
import PortfolioSection from "@/components/sections/Portfolio";

export const metadata: Metadata = { title: "Portfolio — Zivox Tech" };

export default function Page() {
  return <PortfolioSection />;
}
