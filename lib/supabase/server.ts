import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Server-side Supabase client using the service role key.
 * Bypasses RLS — only import from server components / route handlers.
 */
let _serviceClient: SupabaseClient | null = null;
export function supabaseService(): SupabaseClient {
  if (_serviceClient) return _serviceClient;
  _serviceClient = createClient(env.supabaseUrl(), env.supabaseServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _serviceClient;
}

/**
 * Server-side Supabase client using the anon key.
 * Use for public reads from Server Components (respects RLS published policies).
 */
let _anonClient: SupabaseClient | null = null;
export function supabaseAnon(): SupabaseClient {
  if (_anonClient) return _anonClient;
  _anonClient = createClient(env.supabaseUrl(), env.supabaseAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return _anonClient;
}
