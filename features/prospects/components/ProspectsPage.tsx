import { Plus, Download } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { ProspectsTab } from "@/features/AgenciesForm/components/ProspectsTab";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";

export function ProspectsPage() {
  return (
    <div>
      <DashboardHeader
        title="Prospects"
        subtitle="68 prospects · Updated just now"
        actions={
          <>
            <button type="button" className={headerStyles.btnGhost}>
              <Download />
              Export
            </button>
            <button type="button" className={headerStyles.btnPrimary}>
              <Plus />
              Add Prospect
            </button>
          </>
        }
      />

      <ProspectsTab />
    </div>
  );
}
