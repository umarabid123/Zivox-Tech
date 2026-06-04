import type { ElementType, ReactNode } from "react";

export interface SectionTitleProps {
  children: ReactNode;
  /** Heading level/tag (default h2). */
  as?: ElementType;
  className?: string;
}

/** Section heading using the site's `section-title` style. */
export default function SectionTitle({ children, as: Tag = "h2", className = "" }: SectionTitleProps) {
  return <Tag className={["section-title", className].filter(Boolean).join(" ")}>{children}</Tag>;
}
