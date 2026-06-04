import type { ReactNode } from "react";

export interface SectionSubProps {
  children: ReactNode;
  className?: string;
}

/** Sub-heading paragraph below a SectionTitle. */
export default function SectionSub({ children, className = "" }: SectionSubProps) {
  return <p className={["section-sub", className].filter(Boolean).join(" ")}>{children}</p>;
}
