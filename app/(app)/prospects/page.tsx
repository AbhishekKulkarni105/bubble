import { Plus, Download } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { KanbanBoard } from "@/features/dashboard/components/KanbanBoard";
import type { PipelineColumn } from "@/features/dashboard/types/dashboard.types";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";

const COLUMNS: PipelineColumn[] = [
  {
    id: "new-leads",
    title: "New Leads",
    accent: "teal",
    cards: [
      { id: "l1", name: "Ramirez Freight LLC", subtitle: "Owner-Operator · Texas", estValueLabel: "~$18K", dateLabel: "Added Jun 28" },
      { id: "l2", name: "Delta Carriers Inc", subtitle: "Common Carrier · Ohio", estValueLabel: "~$32K", dateLabel: "Added Jun 25" },
      { id: "l3", name: "BlueSky Transport", subtitle: "Contract · California", estValueLabel: "~$55K", dateLabel: "Added Jun 22" },
      { id: "l4", name: "Lone Star Hauling", subtitle: "Private Fleet · Texas", estValueLabel: "~$14K", dateLabel: "Added Jun 20" },
    ],
  },
  {
    id: "in-discussion",
    title: "In Discussion",
    accent: "gold",
    cards: [
      { id: "d1", name: "Midwest Cold Chain", subtitle: "Refrigerated · Illinois", estValueLabel: "~$41K", dateLabel: "Follow-up Jul 3" },
      { id: "d2", name: "Pacific Route Logistics", subtitle: "Intermodal · Oregon", estValueLabel: "~$67K", dateLabel: "Follow-up Jul 5" },
      { id: "d3", name: "Iron Horse Trucking", subtitle: "Heavy Haul · Montana", estValueLabel: "~$29K", dateLabel: "Follow-up Jul 8" },
      { id: "d4", name: "Sunshine Distribution", subtitle: "Dry Van · Florida", estValueLabel: "~$23K", dateLabel: "Follow-up Jul 10" },
    ],
  },
  {
    id: "quote-requested",
    title: "Quote Requested",
    accent: "purple",
    cards: [
      { id: "q1", name: "Sterling Express Co", subtitle: "Long-Haul · Nevada", estValueLabel: "~$48K", dateLabel: "Quoted Jun 30" },
      { id: "q2", name: "Granite State Moving", subtitle: "Household Goods · NH", estValueLabel: "~$19K", dateLabel: "Quoted Jun 29" },
      { id: "q3", name: "Rio Grande Freight", subtitle: "Common Carrier · NM", estValueLabel: "~$35K", dateLabel: "Quoted Jun 27" },
    ],
  },
];

export default function ProspectsPage() {
  const total = COLUMNS.reduce((sum, col) => sum + col.cards.length, 0);

  return (
    <div>
      <DashboardHeader
        title="Prospects"
        subtitle={`${total} active prospects in pipeline`}
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

      <KanbanBoard columns={COLUMNS} />
    </div>
  );
}
