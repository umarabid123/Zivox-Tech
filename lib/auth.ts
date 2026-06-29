import "server-only";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { env } from "@/lib/env";
import { supabaseService } from "@/lib/supabase/server";

const COOKIE = "nx_admin";
const ALG = "HS256";
const ADMIN_TABLE = "admin_users";

export type AdminUser = {
  email: string;
  full_name: string;
  role: string;
  avatar_url: string | null;
  status: string | null;
  password_hash: string;
  created_at?: string;
  updated_at?: string;
};

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

export async function getAdminUserByEmail(email: string): Promise<AdminUser | null> {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  const { data, error } = await supabaseService()
    .from(ADMIN_TABLE)
    .select("email, full_name, role, avatar_url, status, password_hash, created_at, updated_at")
    .eq("email", normalized)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data as AdminUser | null) ?? null;
}

export async function ensureAdminUser(): Promise<AdminUser> {
  const email = env.adminEmail().trim().toLowerCase();
  const existing = await getAdminUserByEmail(email);
  if (existing) return existing;

  const passwordHash = await bcrypt.hash(env.adminPassword(), 12);
  const row = {
    email,
    full_name: "ZIVOXTech Admin",
    role: "Admin",
    avatar_url: null,
    status: "Active",
    password_hash: passwordHash,
  };

  const { data, error } = await supabaseService()
    .from(ADMIN_TABLE)
    .insert(row)
    .select("email, full_name, role, avatar_url, status, password_hash, created_at, updated_at")
    .single();
  if (error) throw new Error(error.message);
  return data as AdminUser;
}

export async function verifyAdminPassword(email: string, password: string): Promise<AdminUser | null> {
  await ensureAdminUser();
  const user = await getAdminUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  return ok ? user : null;
}

export async function updateAdminPassword(email: string, nextPassword: string): Promise<void> {
  const normalized = email.trim().toLowerCase();
  const password_hash = await bcrypt.hash(nextPassword, 12);
  const { error } = await supabaseService().from(ADMIN_TABLE).update({ password_hash }).eq("email", normalized);
  if (error) throw new Error(error.message);
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
