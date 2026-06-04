import type { Metadata } from "next";
import BookSection from "@/components/sections/Book";
import BookingScript from "@/components/BookingScript";

export const metadata: Metadata = { title: "Book a Consultation — Nexvora Tech" };

export default function Page() {
  return (
    <>
      <BookSection />
      <BookingScript />
    </>
  );
}
