import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/features/dashboard/components/Topbar";

/** VAYGA app shell topbar; replaces Bubble header reusable. */
export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <Topbar userEmail={user?.email} />;
}
