import { PolicyDetail } from "@/features/policies/components/PolicyDetail";
import { getPolicy } from "@/features/policies/types/policy";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PolicyDetail policy={getPolicy(id)} />;
}
