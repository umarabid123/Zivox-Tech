"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "./LoginForm";
import logo from "@/app/assets/images/zivoxtech.png";


export default function LoginPage() {
  return (
    <div className="a-login-shell">
      <div className="a-login-backdrop" aria-hidden="true" />
      <motion.div
        className="a-login-wrap"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="a-login-back-link" whileHover={{ x: -2 }} whileTap={{ scale: 0.98 }}>
          <Link href="/" aria-label="Back to previous page">
            <ArrowLeft size={16} />
            Back
          </Link>
        </motion.div>

        <div className="a-login-card premium">
          <div className="a-login-brand">
            <Image src={logo} alt="ZIVOXTech" priority />
          </div>
          <h1>Admin sign-in</h1>
          <div className="sub">ZIVOXTech • content management</div>
          <Suspense fallback={<div className="a-msg">Loading login form...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
