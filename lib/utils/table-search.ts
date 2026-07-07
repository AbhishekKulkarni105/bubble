import type { CSSProperties } from "react";

/**
 * Shared helpers for the client-side "search" bars that filter the workspace
 * list tables. The data is currently in-memory mock arrays, so filtering runs
 * on the client; swapping to a server query later only changes the data source.
 */

/** True when `query` is empty or appears (case-insensitively) in any field. */
export function matchesQuery(query: string, fields: Array<string | null | undefined>): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((field) => (field ?? "").toLowerCase().includes(q));
}

/** Styling for the "no results" row rendered inside a table body. */
export const EMPTY_CELL_STYLE: CSSProperties = {
  textAlign: "center",
  padding: "28px 16px",
  color: "var(--vayga-text-4)",
  fontSize: "13px",
};
