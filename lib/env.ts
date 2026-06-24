/** Typed environment access with friendly errors at runtime. */

function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required env var: ${name}`);
  return v;
}

function opt(name: string, fallback = ""): string {
  return process.env[name] ?? fallback;
}

export const env = {
  supabaseUrl: () => req("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: () => req("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  supabaseServiceRoleKey: () => req("SUPABASE_SERVICE_ROLE_KEY"),
  storageBucket: () => opt("SUPABASE_STORAGE_BUCKET", "nexvora-media"),

  adminEmail: () => req("ADMIN_EMAIL"),
  adminPassword: () => req("ADMIN_PASSWORD"),
  adminJwtSecret: () => req("ADMIN_JWT_SECRET"),

  smtpHost: () => req("SMTP_HOST"),
  smtpPort: () => Number(opt("SMTP_PORT", "587")),
  smtpUser: () => req("SMTP_USER"),
  smtpPass: () => req("SMTP_PASS"),
  smtpFrom: () => opt("SMTP_FROM", opt("SMTP_USER", "no-reply@zivox.tech")),
  contactToEmail: () => req("CONTACT_TO_EMAIL"),
};
