import { QuoteDetail } from "@/features/quotes/components/QuoteDetail";
import { getQuote } from "@/features/quotes/types/quote";

// Replaces quote_detail_spa
export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuoteDetail quote={getQuote(id)} />;
}
