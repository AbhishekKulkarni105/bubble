import { createClient } from "@/lib/supabase/server";

/**
 * Invoke a Supabase Edge Function with the authenticated user's JWT access token.
 * The token is read from the current session and forwarded as `Authorization: Bearer <jwt>`,
 * so the Edge Function runs under the caller's identity and RLS. Reuse this from any
 * server-side service that needs to call an Edge Function (e.g. background/sync jobs).
 */
export async function invokeEdgeFunction<T = unknown>(
  name: string,
  body?: Record<string, unknown>
) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return supabase.functions.invoke<T>(name, {
    body,
    headers: session?.access_token
      ? { Authorization: `Bearer ${session.access_token}` }
      : undefined,
  });
}
