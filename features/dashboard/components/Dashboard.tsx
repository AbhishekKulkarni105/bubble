import { FileText, Clock, CheckCircle2, TrendingUp, Plus, Download } from "lucide-react";
import { DashboardHeader } from "./DashboardHeader";
import { KPICards } from "./KPICards";
import { PerformanceChart } from "./PerformanceChart";
import { AgencyCards } from "./AgencyCards";
import { RecentQuotes } from "./RecentQuotes";
import { RecentPolicies } from "./RecentPolicies";
import { PipelineBoard } from "./PipelineBoard";
import type {
  AgencySummary,
  KPIStat,
  PipelineColumn,
  PolicyRow,
  QuoteRow,
} from "../types/dashboard.types";
import styles from "./Dashboard.module.css";
import headerStyles from "./DashboardHeader.module.css";

const KPI_STATS: KPIStat[] = [
  {
    id: "total-quotes",
    label: "Total Quotes",
    value: "519",
    delta: "+12.4% this month",
    trend: "up",
    barPercent: 72,
    accent: "gold",
    icon: FileText,
  },
  {
    id: "pending-review",
    label: "Pending Review",
    value: "84",
    delta: "3 need attention",
    trend: "flat",
    barPercent: 45,
    accent: "teal",
    icon: Clock,
  },
  {
    id: "approved",
    label: "Approved",
    value: "312",
    delta: "60.1% approval rate",
    trend: "up",
    barPercent: 60,
    accent: "green",
    icon: CheckCircle2,
  },
  {
    id: "revenue",
    label: "Generated Revenue",
    value: "$2.14M",
    delta: "+$184K last month",
    trend: "up",
    barPercent: 85,
    accent: "purple",
    icon: TrendingUp,
  },
];

const GENERATED_SERIES = [38, 44, 51, 48, 62, 71, 68, 78, 82, 87, 91, 88];
const APPROVED_SERIES = [22, 28, 34, 31, 40, 48, 52, 60, 64, 70, 74, 78];

const AGENCIES: AgencySummary[] = [
  {
    id: "prime",
    name: "Prime Underwriting Agency",
    typeLabel: "Commercial Trucking · Multi-State",
    quotes: 284,
    policies: 47,
    revenueLabel: "$2.1M",
    active: true,
    initials: "PU",
    accentFrom: "#ffdd33",
    accentTo: "#ffd400",
  },
  {
    id: "morpheus",
    name: "Morpheus Ins",
    typeLabel: "Commercial · Regional",
    quotes: 119,
    policies: 22,
    revenueLabel: "$940K",
    active: true,
    initials: "MI",
    accentFrom: "#06B6D4",
    accentTo: "#0284C7",
  },
  {
    id: "apex",
    name: "Apex General Group",
    typeLabel: "Fleet & Cargo · Nationwide",
    quotes: 67,
    policies: 14,
    revenueLabel: "$610K",
    active: true,
    initials: "AG",
    accentFrom: "#22C55E",
    accentTo: "#16A34A",
  },
];

const RECENT_QUOTES: QuoteRow[] = [
  {
    id: "q1",
    quoteNumber: "14109990080",
    proposalNumber: "PCA0000045710",
    insuredName: "DOVO TRUCKING",
    agencyName: "Prime Underwriting",
    amount: 19202.61,
    createdAt: "Jun 8, 2026",
    status: "generated",
  },
  {
    id: "q2",
    quoteNumber: "14054325202",
    proposalNumber: "PCA0000044942",
    insuredName: "BUTERA TRUCKING LLC",
    agencyName: "Prime Underwriting",
    amount: 25565.42,
    createdAt: "May 26, 2026",
    status: "approved",
  },
  {
    id: "q3",
    quoteNumber: "14024848003",
    proposalNumber: "PCA0000044649",
    insuredName: "NM CARRIER INC",
    agencyName: "Prime Underwriting",
    amount: 20315.65,
    createdAt: "May 19, 2026",
    status: "pending",
  },
  {
    id: "q4",
    quoteNumber: "14020979127",
    proposalNumber: "PCA0000044582",
    insuredName: "EAST 2 WEST EXPRESS INC",
    agencyName: "Prime Underwriting",
    amount: 52184.37,
    createdAt: "May 18, 2026",
    status: "approved",
  },
  {
    id: "q5",
    quoteNumber: "14005309100",
    proposalNumber: "PCA0000044355",
    insuredName: "SATURN EXPRESS INC",
    agencyName: "Prime Underwriting",
    amount: 23636.96,
    createdAt: "May 14, 2026",
    status: "review",
  },
];

const RECENT_POLICIES: PolicyRow[] = [
  {
    id: "p1",
    insuredName: "EAST 2 WEST EXPRESS INC",
    policyNumber: "POL-2026-00441",
    coverageLabel: "Covered Autos Liability",
    progressPercent: 88,
    expiresAt: "Expires Aug 18, 2026",
    daysLeftLabel: "47 days left",
    amount: 52184,
    status: "expiring",
  },
  {
    id: "p2",
    insuredName: "JS TRANZ LLC",
    policyNumber: "POL-2026-00440",
    coverageLabel: "Covered Autos + Cargo",
    progressPercent: 60,
    expiresAt: "Expires May 12, 2027",
    daysLeftLabel: "314 days left",
    amount: 66858,
    status: "active",
  },
  {
    id: "p3",
    insuredName: "SATURN EXPRESS INC",
    policyNumber: "POL-2025-00291",
    coverageLabel: "Cancelled — Non-Payment",
    progressPercent: 100,
    expiresAt: "Cancelled Apr 14, 2026",
    daysLeftLabel: "Lapsed",
    amount: 23636,
    status: "cancelled",
  },
];

const PIPELINE_COLUMNS: PipelineColumn[] = [
  {
    id: "new-leads",
    title: "New Leads",
    accent: "teal",
    cards: [
      { id: "l1", name: "Ramirez Freight LLC", subtitle: "Owner-Operator · Texas", estValueLabel: "~$18K", dateLabel: "Jun 28" },
      { id: "l2", name: "Delta Carriers Inc", subtitle: "Common Carrier · Ohio", estValueLabel: "~$32K", dateLabel: "Jun 25" },
    ],
  },
  {
    id: "in-discussion",
    title: "In Discussion",
    accent: "gold",
    cards: [
      { id: "d1", name: "Midwest Cold Chain", subtitle: "Refrigerated · Illinois", estValueLabel: "~$41K", dateLabel: "Jul 3" },
      { id: "d2", name: "Pacific Route Logistics", subtitle: "Intermodal · Oregon", estValueLabel: "~$67K", dateLabel: "Jul 5" },
    ],
  },
  {
    id: "quote-requested",
    title: "Quote Requested",
    accent: "purple",
    cards: [
      { id: "q1", name: "Sterling Express Co", subtitle: "Long-Haul · Nevada", estValueLabel: "~$48K", dateLabel: "Jun 30" },
    ],
  },
];

const ACTIVITY_FEED = [
  { id: "a1", color: "#ffdd33", text: "JS TRANZ LLC generated a quote — $66,858", time: "2m" },
  { id: "a2", color: "#22C55E", text: "EAST 2 WEST approved", time: "18m" },
  { id: "a3", color: "#06B6D4", text: "NM CARRIER pending docs", time: "1h" },
  { id: "a4", color: "#EF4444", text: "SATURN EXPRESS needs review", time: "3h" },
];

export function Dashboard() {
  return (
    <div className={styles.wrap}>
      <DashboardHeader
        title="Dashboard"
        subtitle="519 quotes · Updated just now"
        actions={
          <>
            <button type="button" className={headerStyles.btnGhost}>
              <Download />
              Export
            </button>
            <button type="button" className={headerStyles.btnPrimary}>
              <Plus />
              New Quote
            </button>
          </>
        }
      />

      <KPICards stats={KPI_STATS} />

      <div className={styles.secRow}>
        <PerformanceChart generated={GENERATED_SERIES} approved={APPROVED_SERIES} />
        <div className={styles.activityCard}>
          <div className={styles.activityTitle}>Recent Activity</div>
          <div className={styles.activitySubtitle}>Last 24 hours</div>
          <div className={styles.activityList}>
            {ACTIVITY_FEED.map((item) => (
              <div className={styles.activityItem} key={item.id}>
                <span className={styles.activityDot} style={{ background: item.color }} />
                <span className={styles.activityText}>{item.text}</span>
                <span className={styles.activityTime}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>Top Agencies</div>
      <AgencyCards agencies={AGENCIES} />

      <RecentQuotes quotes={RECENT_QUOTES} />
      <RecentPolicies policies={RECENT_POLICIES} />

      <PipelineBoard columns={PIPELINE_COLUMNS} />
    </div>
  );
}
