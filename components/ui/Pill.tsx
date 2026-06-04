import type { ReactNode } from "react";

export interface PillProps {
  children: ReactNode;
  className?: string;
}

/** Small rounded tag/label. */
export default function Pill({ children, className = "" }: PillProps) {
  return <span className={["pill", className].filter(Boolean).join(" ")}>{children}</span>;
}
