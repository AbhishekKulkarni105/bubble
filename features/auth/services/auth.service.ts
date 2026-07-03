"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, type LoginInput } from "../schemas/login.schema";

/**
 * Authenticate with email & password via Supabase Auth (`signInWithPassword`).
 * On success the session is persisted to cookies by the server client and the
 * user is redirected to the agencies page. On failure a user-friendly message
 * is returned to the caller for display.
 */
export async function login(input: LoginInput): Promise<{ error: string } | void> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? "Invalid credentials" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "Invalid email or password" };
  }

  redirect("/agency");
}

/** Clear the Supabase session and return to the login page. */
export async function logout(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
