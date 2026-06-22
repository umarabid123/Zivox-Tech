import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

const COOKIE = "nx_admin";
const ALG = "HS256";

function secret(): Uint8Array {
  return new TextEncoder().encode(env.adminJwtSecret());
}

export type Session = { email: string; iat: number; exp: number };

export async function signSession(email: string): Promise<string> {
  return await new SignJWT({ email })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(token: string | undefined | null): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    if (typeof payload.email !== "string") return null;
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

/** Read the current admin session (Server Components / Route Handlers). */
export async function getAdminSession(): Promise<Session | null> {
  const c = await cookies();
  return verifySession(c.get(COOKIE)?.value);
}

export async function setAdminCookie(token: string) {
  const c = await cookies();
  c.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie() {
  const c = await cookies();
  c.delete(COOKIE);
}

export const ADMIN_COOKIE = COOKIE;
