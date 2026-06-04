import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

export interface ButtonProps {
  children: ReactNode;
  /** If set, renders an anchor. Internal paths ("/...") use next/link. */
  href?: string;
  variant?: Variant;
  /** Large size (adds `btn-lg`). */
  large?: boolean;
  /** Adds the magnetic-hover behaviour hook (`magnetic`). */
  magnetic?: boolean;
  /** Appends a trailing arrow (→). */
  arrow?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  ariaLabel?: string;
  id?: string;
}

/** Reusable button/link. Every prop except `children` is optional. */
export default function Button({
  children,
  href,
  variant = "primary",
  large = false,
  magnetic = false,
  arrow = false,
  type = "button",
  className = "",
  ariaLabel,
  id,
}: ButtonProps) {
  const classes = [
    "btn",
    `btn-${variant}`,
    large ? "btn-lg" : "",
    magnetic ? "magnetic" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      {children}
      {arrow && (
        <span className="arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className={classes} aria-label={ariaLabel} id={id}>
          {inner}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} aria-label={ariaLabel} id={id}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} id={id}>
      {inner}
    </button>
  );
}
