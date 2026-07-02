"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { logout } from "../services/auth.service";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      className="bg-transparent px-2 text-black hover:underline"
      disabled={isPending}
      onClick={() => startTransition(() => logout())}
    >
      {isPending ? "Signing out…" : "Sign out"}
    </Button>
  );
}
