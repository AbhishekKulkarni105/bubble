import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/quotes — list quotes (RLS scopes to the caller's agencies)
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// POST /api/quotes — create a quote (see quotes.service for orchestration)
export async function POST(request: Request) {
  const body = await request.json();
  const supabase = await createClient();
  const { data, error } = await supabase.from("quotes").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data }, { status: 201 });
}
