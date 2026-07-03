import Link from "next/link";
import { Plus, Download, Search, SlidersHorizontal, Eye } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";
import styles from "@/components/ui/data-table.module.css";

type InsuredStatus = "active" | "pending" | "suspended";

const STATUS_LABEL: Record<InsuredStatus, string> = {
  active: "Active",
  pending: "Pending",
  suspended: "Suspended",
};

const STATUS_CLASS: Record<InsuredStatus, string> = {
  active: styles.pillGreen,
  pending: styles.pillTeal,
  suspended: styles.pillRed,
};

interface InsuredRow {
  id: string;
  company: string;
  agency: string;
  dot: string;
  mc: string;
  state: string;
  entity: string;
  policies: number;
  premium: string;
  premiumMuted?: boolean;
  status: InsuredStatus;
}

const INSUREDS: InsuredRow[] = [
  { id: "1", company: "EAST 2 WEST EXPRESS INC", agency: "Prime Underwriting", dot: "DOT 4421982", mc: "MC 987123", state: "Texas", entity: "LLC", policies: 2, premium: "$52,184", status: "active" },
  { id: "2", company: "JS TRANZ LLC", agency: "Prime Underwriting", dot: "DOT 3318847", mc: "MC 661452", state: "Florida", entity: "LLC", policies: 1, premium: "$66,858", status: "active" },
  { id: "3", company: "BUTERA TRUCKING LLC", agency: "Prime Underwriting", dot: "DOT 2219934", mc: "MC 441990", state: "California", entity: "LLC", policies: 1, premium: "$25,565", status: "active" },
  { id: "4", company: "MACKZY LOGISTICS LLC", agency: "Prime Underwriting", dot: "DOT 1876543", mc: "MC 332201", state: "Illinois", entity: "LLC", policies: 1, premium: "$18,394", status: "active" },
  { id: "5", company: "NM CARRIER INC", agency: "Prime Underwriting", dot: "DOT 9910221", mc: "MC 558812", state: "New Mexico", entity: "Corporation", policies: 0, premium: "Pending", premiumMuted: true, status: "pending" },
  { id: "6", company: "SATURN EXPRESS INC", agency: "Prime Underwriting", dot: "DOT 6643002", mc: "MC 778234", state: "Georgia", entity: "Corporation", policies: 0, premium: "Lapsed", premiumMuted: true, status: "suspended" },
];

export default function InsuredsPage() {
  return (
    <div>
      <DashboardHeader
        title="Insureds"
        subtitle="148 insured entities on record"
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

      <div className={styles.panel}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>All Insureds</div>
            <div className={styles.subtitle}>148 insured companies</div>
          </div>
          <div className={styles.controls}>
            <div className={styles.search}>
              <Search />
              <input placeholder="Search insureds…" aria-label="Search insureds" />
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
                <th>Company</th>
                <th>DOT / MC</th>
                <th>State</th>
                <th>Entity</th>
                <th>Policies</th>
                <th>Total Premium</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {INSUREDS.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className={styles.tdMain}>{row.company}</div>
                    <div className={styles.tdSub}>{row.agency}</div>
                  </td>
                  <td>
                    <div className={styles.tdMono}>{row.dot}</div>
                    <div className={styles.tdSub}>{row.mc}</div>
                  </td>
                  <td>{row.state}</td>
                  <td>
                    <span style={{ fontSize: 11, color: "var(--vayga-text-3)" }}>{row.entity}</span>
                  </td>
                  <td>
                    <div className={styles.tdMono}>{row.policies}</div>
                  </td>
                  <td>
                    <div
                      className={styles.tdAmt}
                      style={row.premiumMuted ? { color: "var(--vayga-text-3)" } : undefined}
                    >
                      {row.premium}
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.pill} ${STATUS_CLASS[row.status]}`}>
                      <span className={styles.pillDot} />
                      {STATUS_LABEL[row.status]}
                    </span>
                  </td>
                  <td>
                    <Link href={`/insureds/${row.id}`} className={styles.actBtn}>
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
          <div className={styles.footInfo}>Showing 6 of 148 insureds</div>
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
