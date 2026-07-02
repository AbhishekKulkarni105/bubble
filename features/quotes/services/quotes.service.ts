import { createClient } from "@/lib/supabase/server";
import type { QuoteInput } from "../schemas/quote.schema";

export async function listQuotes() {
  const supabase = await createClient();
  return supabase.from("quotes").select("*").order("created_at", { ascending: false });
}

export async function createQuote(input: QuoteInput) {
  const supabase = await createClient();
  return supabase.from("quotes").insert(input).select().single();
}
