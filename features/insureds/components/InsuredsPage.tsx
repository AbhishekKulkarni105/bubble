import { Plus, Download } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { InsuredsTab } from "@/features/AgenciesForm/components/InsuredsTab";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";

export function InsuredsPage() {
  return (
    <div>
      <DashboardHeader
        title="Insureds"
        subtitle="31 insureds · Updated just now"
        actions={
          <>
            <button type="button" className={headerStyles.btnGhost}>
              <Download />
              Export
            </button>
            <button type="button" className={headerStyles.btnPrimary}>
              <Plus />
              Add Insured
            </button>
          </>
        }
      />

      <InsuredsTab />
    </div>
  );
}
