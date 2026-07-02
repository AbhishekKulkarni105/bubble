export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Replaces quote_detail_spa
  return <div>Quote {id}</div>;
}
