import { Plus, Download } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { PoliciesTab } from "@/features/AgenciesForm/components/PoliciesTab";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";

export function PoliciesPage() {
  return (
    <div>
      <DashboardHeader
        title="Policies"
        subtitle="27 policies · Updated just now"
        actions={
          <>
            <button type="button" className={headerStyles.btnGhost}>
              <Download />
              Export
            </button>
            <button type="button" className={headerStyles.btnPrimary}>
              <Plus />
              Bind Policy
            </button>
          </>
        }
      />

      <PoliciesTab />
    </div>
  );
}
