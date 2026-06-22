import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Protects /admin routes (except /admin/login).
 *
 * Note: Next.js 16 renamed middleware -> proxy. Runtime is Node.js.
 * Edge runtime is NOT supported in proxy.
 */
export const config = {
  matcher: ["/admin/:path*"],
};

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

async function isValid(token: string | undefined, secret: string): Promise<boolean> {
  if (!token || !secret) return false;
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return typeof payload.email === "string";
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page through
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    return NextResponse.next();
  }

  const secret = process.env.ADMIN_JWT_SECRET || "";
  const token = req.cookies.get("nx_admin")?.value;
  const ok = await isValid(token, secret);

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
