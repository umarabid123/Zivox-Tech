import type { Metadata } from "next";
import BlogSection from "@/components/sections/Blog";

export const metadata: Metadata = { title: "Blog — Zivoxtech" };

export default function Page() {
  return <BlogSection />;
}
