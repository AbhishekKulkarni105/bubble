/**
 * Hand-authored domain types that join the merged main/detail tables.
 * `types/database.ts` is generated from Supabase via `npm run db:types`.
 */
export type UUID = string;

export interface QuoteWithDetails {
  id: UUID;
  agencyId: UUID;
  status: string;
  // drivers, vehicles, coverages, premiums … joined from their tables
}
