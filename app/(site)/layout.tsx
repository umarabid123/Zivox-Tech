import "../../styles/site.css";
import Navbar from "@/components/layout/Navbar";
import MobileDrawer from "@/components/layout/MobileDrawer";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/layout/Chatbot";
import SiteInteractions from "@/components/SiteInteractions";

/**
 * Public-site layout. Wraps every page under the (site) route group with
 * the navbar/footer/chatbot/global interactions. Admin pages bypass this.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <MobileDrawer />
      <main>{children}</main>
      <Footer />
      <Chatbot />
      <SiteInteractions />
    </>
  );
}
