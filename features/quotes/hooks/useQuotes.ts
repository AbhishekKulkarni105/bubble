"use client";

import { useQuery } from "@tanstack/react-query";

export function useQuotes() {
  return useQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      const res = await fetch("/api/quotes");
      if (!res.ok) throw new Error("Failed to load quotes");
      return (await res.json()).data;
    },
  });
}
