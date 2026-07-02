import { NextResponse } from "next/server";

// POST /api/quotes/[id]/rate — enqueue an async MTM rating job (replaces ScheduleAPIEvent).
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // TODO: enqueue job in the task queue; return a task id the client can poll (useTaskStatus).
  return NextResponse.json({ quoteId: id, status: "queued" });
}
