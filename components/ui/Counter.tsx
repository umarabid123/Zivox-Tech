export interface CounterProps {
  /** Target number the counter animates up to (data-counter). */
  value: number | string;
  className?: string;
}

/** Animated number. The animation is wired up globally in SiteInteractions. */
export default function Counter({ value, className = "" }: CounterProps) {
  return (
    <span className={["counter", className].filter(Boolean).join(" ")} data-counter={String(value)}>
      0
    </span>
  );
}
