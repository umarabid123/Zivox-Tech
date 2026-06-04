import type { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Max-width content wrapper (`container`). */
export default function Container({ children, className = "" }: ContainerProps) {
  return <div className={["container", className].filter(Boolean).join(" ")}>{children}</div>;
}
