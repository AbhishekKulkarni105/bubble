/**
 * Fine-grained authorization guard.
 * Implements the object x verb permission matrix seeded from Default_Permissions_opt
 * (see Documentation/10_User_Roles.md). Every Server Action / Route Handler that mutates
 * data must call this after the RLS-backed Supabase query.
 */
export type Verb = "read" | "write" | "edit" | "delete" | "undo";
export type ObjectType =
  | "quote"
  | "policy"
  | "insured"
  | "prospect"
  | "agency"
  | "user"
  | "driver"
  | "vehicle"
  | "coverage";

export interface Actor {
  userId: string;
  role: string; // Role_opt value: owner | standard | agency_admin | agent | insured
  agencyIds: string[];
}

// TODO: load from the seeded permissions lookup table; stub returns true for owner/admin.
export function can(
  actor: Actor,
  _verb: Verb,
  _object: ObjectType,
  _record?: { agencyId?: string }
): boolean {
  return actor.role === "owner" || actor.role === "agency_admin";
}
