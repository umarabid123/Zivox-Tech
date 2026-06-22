/** Date formatting helpers used in public sections. */

export function formatDate(d: string | Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function initials(name: string): string {
  return (name || "")
    .split(/\s+/)
    .map((s) => s[0] || "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Stable hash → palette index for avatar gradients. */
export function avatarStyle(name: string): React.CSSProperties {
  const palettes = [
    "linear-gradient(135deg, #f59e0b, #b45309)",
    "linear-gradient(135deg, #3B82F6, #1d4fb3)",
    "linear-gradient(135deg, #8b5cf6, #5b21b6)",
    "linear-gradient(135deg, #10b981, #047857)",
    "linear-gradient(135deg, #ef4444, #b91c1c)",
    "linear-gradient(135deg, #ec4899, #9d174d)",
  ];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return { background: palettes[h % palettes.length] };
}
