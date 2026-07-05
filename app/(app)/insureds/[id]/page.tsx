import { InsuredDetail } from "@/features/insureds/components/InsuredDetail";
import { getInsured } from "@/features/insureds/types/insured";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InsuredDetail insured={getInsured(id)} />;
}
