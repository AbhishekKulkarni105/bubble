import { z } from "zod";

export const quoteSchema = z.object({
  insuredId: z.string().uuid().optional(),
  prospectId: z.string().uuid().optional(),
  agencyId: z.string().uuid(),
  status: z.string().default("draft"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
