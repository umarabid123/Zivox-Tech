import type { Config } from "tailwindcss";

const config: Config = {
  // Scan all source files for Tailwind class usage
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  // IMPORTANT: preflight is disabled so Tailwind's CSS reset does NOT
  // override the original hand-written design CSS. This keeps the clone
  // pixel-perfect while still letting us use Tailwind utilities.
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};

export default config;
