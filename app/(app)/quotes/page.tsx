import Link from "next/link";
import { FileText, Clock, CheckCircle2, TrendingUp, Plus, Download, Search, SlidersHorizontal, Eye } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { KPICards } from "@/features/dashboard/components/KPICards";
import type { KPIStat, QuoteStatus } from "@/features/dashboard/types/dashboard.types";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";
import styles from "@/components/ui/data-table.module.css";

const KPI_STATS: KPIStat[] = [
  { id: "total-quotes", label: "Total Quotes", value: "519", delta: "+12.4% this month", trend: "up", barPercent: 72, accent: "gold", icon: FileText },
  { id: "pending-review", label: "Pending Review", value: "84", delta: "3 need attention", trend: "flat", barPercent: 45, accent: "teal", icon: Clock },
  { id: "approved", label: "Approved", value: "312", delta: "60.1% approval rate", trend: "up", barPercent: 60, accent: "green", icon: CheckCircle2 },
  { id: "revenue", label: "Generated Revenue", value: "$2.14M", delta: "+$184K last month", trend: "up", barPercent: 85, accent: "purple", icon: TrendingUp },
];

const STATUS_LABEL: Record<QuoteStatus, string> = {
  generated: "Generated",
  approved: "Approved",
  pending: "Pending",
  review: "Needs Review",
};

const STATUS_CLASS: Record<QuoteStatus, string> = {
  generated: styles.pillAccent,
  approved: styles.pillGreen,
  pending: styles.pillTeal,
  review: styles.pillRed,
};

interface QuoteListRow {
  id: string;
  quoteNumber: string;
  proposalNumber: string;
  insuredName: string;
  agencyName: string;
  amount: number;
  createdAt: string;
  daysAgo: string;
  status: QuoteStatus;
}

const QUOTES: QuoteListRow[] = [
  { id: "1", quoteNumber: "14109990080", proposalNumber: "PCA0000045710", insuredName: "DOVO TRUCKING", agencyName: "Prime Underwriting", amount: 19202.61, createdAt: "Jun 8, 2026", daysAgo: "24 days ago", status: "generated" },
  { id: "2", quoteNumber: "14054325202", proposalNumber: "PCA0000044942", insuredName: "BUTERA TRUCKING LLC", agencyName: "Prime Underwriting", amount: 25565.42, createdAt: "May 26, 2026", daysAgo: "37 days ago", status: "approved" },
  { id: "3", quoteNumber: "14027921157", proposalNumber: "PCA0000044711", insuredName: "MACKZY LOGISTICS LLC", agencyName: "Prime Underwriting", amount: 18394.08, createdAt: "May 20, 2026", daysAgo: "43 days ago", status: "generated" },
  { id: "4", quoteNumber: "14024848003", proposalNumber: "PCA0000044649", insuredName: "NM CARRIER INC", agencyName: "Prime Underwriting", amount: 20315.65, createdAt: "May 19, 2026", daysAgo: "44 days ago", status: "pending" },
  { id: "5", quoteNumber: "14020979127", proposalNumber: "PCA0000044582", insuredName: "EAST 2 WEST EXPRESS INC", agencyName: "Prime Underwriting", amount: 52184.37, createdAt: "May 18, 2026", daysAgo: "45 days ago", status: "approved" },
  { id: "6", quoteNumber: "14005309100", proposalNumber: "PCA0000044355", insuredName: "SATURN EXPRESS INC", agencyName: "Prime Underwriting", amount: 23636.96, createdAt: "May 14, 2026", daysAgo: "49 days ago", status: "review" },
  { id: "7", quoteNumber: "13994444006", proposalNumber: "PCA0000044172", insuredName: "PASTANA TRANSPORT LLC", agencyName: "Prime Underwriting", amount: 20315.65, createdAt: "May 12, 2026", daysAgo: "52 days ago", status: "generated" },
  { id: "8", quoteNumber: "13994416081", proposalNumber: "PCA0000044170", insuredName: "JS TRANZ LLC", agencyName: "Prime Underwriting", amount: 66858.18, createdAt: "May 12, 2026", daysAgo: "52 days ago", status: "generated" },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function QuotesPage() {
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

      <KPICards stats={KPI_STATS} />

      <div className={styles.panel}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>All Quotes</div>
            <div className={styles.subtitle}>Showing 1–8 of 519</div>
          </div>
          <div className={styles.controls}>
            <div className={styles.search}>
              <Search />
              <input placeholder="Search quotes…" aria-label="Search quotes" />
            </div>
            <button type="button" className={styles.fltBtn}>
              <SlidersHorizontal />
              Filters
            </button>
            <button type="button" className={styles.expBtn}>
              <Download />
              Export
            </button>
          </div>
        </div>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Quote ID / Proposal</th>
                <th>Insured Name</th>
                <th>Agency</th>
                <th>Amount</th>
                <th>Date Created ↓</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {QUOTES.map((quote) => (
                <tr key={quote.id}>
                  <td>
                    <div className={styles.tdMono}>{quote.quoteNumber}</div>
                    <div className={styles.tdSub}>{quote.proposalNumber}</div>
                  </td>
                  <td>
                    <div className={styles.tdMain}>{quote.insuredName}</div>
                  </td>
                  <td>{quote.agencyName}</td>
                  <td>
                    <div className={`${styles.tdAmt} ${quote.amount >= 40000 ? styles.tdAmtHi : ""}`}>
                      {formatCurrency(quote.amount)}
                    </div>
                  </td>
                  <td>
                    <div>{quote.createdAt}</div>
                    <div className={styles.tdSub}>{quote.daysAgo}</div>
                  </td>
                  <td>
                    <span className={`${styles.pill} ${STATUS_CLASS[quote.status]}`}>
                      <span className={styles.pillDot} />
                      {STATUS_LABEL[quote.status]}
                    </span>
                  </td>
                  <td>
                    <Link href={`/quotes/${quote.id}`} className={styles.actBtn}>
                      <Eye />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.foot}>
          <div className={styles.footInfo}>Showing 1–8 of 519 quotes</div>
          <div className={styles.pagi}>
            <div className={styles.pg}>‹</div>
            <div className={`${styles.pg} ${styles.pgOn}`}>1</div>
            <div className={styles.pg}>2</div>
            <div className={styles.pg}>3</div>
            <div className={styles.pg}>›</div>
          </div>
        </div>
      </div>
    </div>
  );
}
