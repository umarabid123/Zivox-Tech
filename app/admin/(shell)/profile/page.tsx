import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { getAdminSession, getAdminUserByEmail } from "@/lib/auth";
import { avatarStyle, initials } from "@/lib/formatters";
import logo from "@/app/assets/images/zivoxtech.png";
import ProfilePasswordForm from "./profile-password-form";

export const metadata: Metadata = { title: "My Profile" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const user = await getAdminUserByEmail(session.email);
  if (!user) redirect("/admin/login");

  const displayName = user.full_name || "Admin";

  return (
    <motion.div
      className="a-profile-page"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="a-card a-profile-hero">
        <div className="a-profile-head">
          <div className="a-profile-avatar" style={user.avatar_url ? undefined : avatarStyle(displayName)}>
            {user.avatar_url ? (
              <Image src={user.avatar_url} alt={displayName} width={88} height={88} className="a-profile-avatar-img" />
            ) : (
              <span>{initials(displayName || user.email)}</span>
            )}
          </div>
          <div>
            <p className="a-kicker">Administrator</p>
            <h2 className="a-profile-name">{displayName}</h2>
            <p className="a-profile-email">{user.email}</p>
            <div className="a-profile-badges">
              <span className="a-pill live">{user.role || "Admin"}</span>
              <span className="a-pill live">{user.status || "Active"}</span>
            </div>
          </div>
        </div>

        <div className="a-profile-brand">
          <Image src={logo} alt="ZIVOXTech" priority />
        </div>
      </div>

      <div className="a-card a-profile-card">
        <h3>Change Password</h3>
        <p>Update your admin password securely. You will remain signed in after a successful change.</p>
        <ProfilePasswordForm />
      </div>
    </motion.div>
  );
}