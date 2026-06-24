import type { Metadata } from "next";
import BlogSection from "@/components/sections/Blog";

export const metadata: Metadata = { title: "Blog — Zivox Tech" };

export default function Page() {
  return <BlogSection />;
}
