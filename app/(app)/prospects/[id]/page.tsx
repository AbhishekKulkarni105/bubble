import { ProspectDetail } from "@/features/prospects/components/ProspectDetail";
import { getProspect } from "@/features/prospects/types/prospect";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProspectDetail prospect={getProspect(id)} />;
}
