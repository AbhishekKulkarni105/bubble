import Link from "next/link";
import { Plus, Download } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { QuotesTab } from "@/features/AgenciesForm/components/QuotesTab";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";

export function QuotesPage() {
  return (
    <div>
      <DashboardHeader
        title="Quotes"
        subtitle="519 quotes · Updated just now"
        actions={
          <>
            <button type="button" className={headerStyles.btnGhost}>
              <Download />
              Export
            </button>
            <Link href="/quotes/new" className={headerStyles.btnPrimary}>
              <Plus />
              New Quote
            </Link>
          </>
        }
      />

      <QuotesTab />
    </div>
  );
}
