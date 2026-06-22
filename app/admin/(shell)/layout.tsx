import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import TopBar from "@/components/admin/TopBar";
import { getAdminSession } from "@/lib/auth";

/** Shell with sidebar — used for every admin page except /admin/login. */
export default async function ShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="a-shell">
      <Sidebar />
      <div className="a-main">
        <TopBar title="Admin" email={session.email} />
        {children}
      </div>
    </div>
  );
}
