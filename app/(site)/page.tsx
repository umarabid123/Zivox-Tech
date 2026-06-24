import type { Metadata } from "next";
import HomeSection from "@/components/sections/Home";

export const metadata: Metadata = { title: "Zivox Tech — Modern digital solutions" };

export default function Page() {
  return <HomeSection />;
}
