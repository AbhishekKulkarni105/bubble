import { Building2, CheckCircle2, Users, TrendingUp, Plus, Download } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { KPICards } from "@/features/dashboard/components/KPICards";
import { AgencyCards } from "@/features/dashboard/components/AgencyCards";
import type { AgencySummary, KPIStat } from "@/features/dashboard/types/dashboard.types";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";

const KPI_STATS: KPIStat[] = [
  { id: "total-agencies", label: "Total Agencies", value: "6", delta: "2 added this quarter", trend: "up", barPercent: 60, accent: "gold", icon: Building2 },
  { id: "active", label: "Active", value: "5", delta: "83% active rate", trend: "up", barPercent: 83, accent: "green", icon: CheckCircle2 },
  { id: "agents", label: "Total Agents", value: "47", delta: "+6 this month", trend: "up", barPercent: 55, accent: "teal", icon: Users },
  { id: "revenue", label: "Combined Revenue", value: "$8.7M", delta: "+18% YoY", trend: "up", barPercent: 78, accent: "purple", icon: TrendingUp },
];

const AGENCIES: AgencySummary[] = [
  { id: "prime", name: "Prime Underwriting Agency", typeLabel: "Commercial Trucking · Multi-State", quotes: 284, policies: 47, revenueLabel: "$2.1M", active: true, initials: "PU", accentFrom: "#F5C400", accentTo: "#E4B000" },
  { id: "morpheus", name: "Morpheus Ins", typeLabel: "Commercial · Regional", quotes: 119, policies: 22, revenueLabel: "$940K", active: true, initials: "MI", accentFrom: "#06B6D4", accentTo: "#0284C7" },
  { id: "apex", name: "Apex General Group", typeLabel: "Fleet & Cargo · Nationwide", quotes: 67, policies: 14, revenueLabel: "$610K", active: true, initials: "AG", accentFrom: "#22C55E", accentTo: "#16A34A" },
  { id: "transshield", name: "TransShield Risk", typeLabel: "Specialty Trucking · Southwest", quotes: 31, policies: 9, revenueLabel: "$280K", active: true, initials: "TR", accentFrom: "#8B5CF6", accentTo: "#7C3AED" },
  { id: "highway", name: "Highway Partners LLC", typeLabel: "Owner-Operator Specialists", quotes: 14, policies: 3, revenueLabel: "$95K", active: true, initials: "HW", accentFrom: "#F97316", accentTo: "#EA580C" },
  { id: "northlane", name: "NorthLane Insurance", typeLabel: "Long-Haul · Midwest", quotes: 4, policies: 0, revenueLabel: "—", active: false, initials: "NL", accentFrom: "#64748B", accentTo: "#475569" },
];

export default function AgencyPage() {
  return (
    <div>
      <DashboardHeader
        title="Agencies"
        subtitle="6 active agencies · All regions"
        actions={
          <>
            <button type="button" className={headerStyles.btnGhost}>
              <Download />
              Export
            </button>
            <button type="button" className={headerStyles.btnPrimary}>
              <Plus />
              Add Agency
            </button>
          </>
        }
      />

      <KPICards stats={KPI_STATS} />

      <AgencyCards agencies={AGENCIES} />
    </div>
  );
}
