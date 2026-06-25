import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zivoxtech • Builds Together",
    template: "%s",
  },
  description:
    "Zivoxtech builds premium websites, mobile apps, AI assistants, and custom business systems.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Set the theme before first paint to avoid a flash of the wrong theme.
const themeInit = `(function(){try{var k='nexvora-theme';var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:((window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
