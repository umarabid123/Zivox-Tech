import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in — Admin" };

export default function LoginPage() {
  return (
    <div className="a-login">
      <div className="a-login-card">
        <h1>Admin sign-in</h1>
        <div className="sub">Zivoxtech • content management</div>
        <Suspense fallback={<div className="a-msg">Loading login form...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
