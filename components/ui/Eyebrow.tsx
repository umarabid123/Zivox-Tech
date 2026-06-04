import type { ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  /** Show the leading dot (default true). */
  dot?: boolean;
  className?: string;
}

/** Small uppercase label used above section titles. */
export default function Eyebrow({ children, dot = true, className = "" }: EyebrowProps) {
  return (
    <span className={["eyebrow", className].filter(Boolean).join(" ")}>
      {dot && <span className="dot"></span>}
      {dot ? " " : null}
      {children}
    </span>
  );
}
