import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../styles/site.css";
import Navbar from "@/components/layout/Navbar";
import MobileDrawer from "@/components/layout/MobileDrawer";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/layout/Chatbot";
import SiteInteractions from "@/components/SiteInteractions";

export const metadata: Metadata = {
  title: {
    default: "Nexvora Tech — Modern digital solutions",
    template: "%s",
  },
  description:
    "Nexvora Tech builds premium websites, mobile apps, AI assistants, and custom business systems.",
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
      <body>
        <Navbar />
        <MobileDrawer />
        <main>{children}</main>
        <Footer />
        <Chatbot />
        <SiteInteractions />
      </body>
    </html>
  );
}
