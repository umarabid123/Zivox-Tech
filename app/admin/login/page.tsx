import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Sign in — Admin" };

export default function LoginPage() {
  return (
    <div className="a-login">
      <div className="a-login-card">
        <h1>Admin sign-in</h1>
        <div className="sub">Nexvora Tech — content management</div>
        <LoginForm />
      </div>
    </div>
  );
}
