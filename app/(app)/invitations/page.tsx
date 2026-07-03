import Link from "next/link";
import { Mail, Clock, CheckCircle2, Plus, Check } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { KPICards } from "@/features/dashboard/components/KPICards";
import type { KPIStat } from "@/features/dashboard/types/dashboard.types";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";
import tableStyles from "@/components/ui/data-table.module.css";
import styles from "./invitations.module.css";

const KPI_STATS: KPIStat[] = [
  { id: "sent", label: "Total Sent", value: "28", delta: "Last 30 days", trend: "up", barPercent: 60, accent: "purple", icon: Mail },
  { id: "pending", label: "Pending", value: "11", delta: "Awaiting response", trend: "flat", barPercent: 45, accent: "gold", icon: Clock },
  { id: "accepted", label: "Accepted", value: "17", delta: "60.7% accept rate", trend: "up", barPercent: 61, accent: "green", icon: CheckCircle2 },
];

const PENDING = [
  { id: "1", name: "Maria Kowalski", email: "maria.k@apexgroup.com", role: "Agent", agency: "Apex General Group", sent: "Sent Jun 30, 2026", expiry: "Expires in 2 days", from: "#8B5CF6", to: "#7C3AED" },
  { id: "2", name: "Thomas Nguyen", email: "t.nguyen@morpheus.com", role: "Agent", agency: "Morpheus Ins", sent: "Sent Jun 29, 2026", expiry: "Expires in 3 days", from: "#06B6D4", to: "#0284C7" },
  { id: "3", name: "Rachel Park", email: "r.park@primeuw.com", role: "Agency Admin", agency: "Prime Underwriting", sent: "Sent Jun 28, 2026", expiry: "Expires in 4 days", from: "#22C55E", to: "#16A34A" },
  { id: "4", name: "James Bradford", email: "j.bradford@transshield.com", role: "Agent", agency: "TransShield Risk", sent: "Sent Jun 27, 2026", expiry: "Expires in 5 days", from: "#F5C400", to: "#E4B000" },
  { id: "5", name: "Casey Liu", email: "casey@highway-partners.com", role: "Agent", agency: "Highway Partners LLC", sent: "Sent Jun 25, 2026", expiry: "Expires TODAY", from: "#DC2626", to: "#B91C1C", urgent: true },
];

const ACCEPTED = [
  { id: "a1", name: "Priya Sharma", email: "p.sharma@primeuw.com", role: "Agent", agency: "Prime Underwriting", date: "Accepted Jun 24, 2026" },
  { id: "a2", name: "Ben O'Reilly", email: "ben@morpheus.com", role: "Agency Admin", agency: "Morpheus Ins", date: "Accepted Jun 22, 2026" },
];

export default function InvitationsPage() {
  return (
    <div>
      <DashboardHeader
        title="Invitations"
        subtitle="11 pending invitations"
        actions={
          <Link href="/invite-user" className={headerStyles.btnPrimary}>
            <Plus />
            New Invitation
          </Link>
        }
      />

      <KPICards stats={KPI_STATS} />

      <div className={tableStyles.panel}>
        <div className={tableStyles.header}>
          <div>
            <div className={tableStyles.title}>Pending Invitations</div>
            <div className={tableStyles.subtitle}>Sorted by expiry date · Expire after 7 days</div>
          </div>
        </div>

        <div style={{ padding: "12px 20px" }}>
          {PENDING.map((inv) => (
            <div className={styles.card} key={inv.id}>
              <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${inv.from}, ${inv.to})` }}>
                {inv.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{inv.name}</div>
                <div className={styles.email}>
                  {inv.email} · {inv.role} · {inv.agency}
                </div>
              </div>
              <div className={styles.meta}>
                <div className={styles.date}>{inv.sent}</div>
                <div className={`${styles.expiry} ${inv.urgent ? styles.expiryUrgent : ""}`}>{inv.expiry}</div>
              </div>
              <button type="button" className={styles.resendBtn}>
                Resend
              </button>
            </div>
          ))}
        </div>

        <div style={{ padding: "10px 20px", borderTop: "1px solid var(--vayga-border)" }}>
          <div className={styles.sectionLabel}>Accepted (Recent)</div>
          {ACCEPTED.map((inv) => (
            <div className={`${styles.card} ${styles.accepted}`} key={inv.id}>
              <div className={styles.avatar} style={{ background: "var(--vayga-green-dim)", color: "var(--vayga-green)" }}>
                <Check size={16} />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{inv.name}</div>
                <div className={styles.email}>
                  {inv.email} · {inv.role} · {inv.agency}
                </div>
              </div>
              <div className={styles.meta}>
                <div className={styles.date}>{inv.date}</div>
                <div className={styles.joined}>Joined</div>
              </div>
            </div>
          ))}
        </div>

        <div className={tableStyles.foot}>
          <div className={tableStyles.footInfo}>Showing 5 pending · 2 recently accepted</div>
          <div className={tableStyles.pagi}>
            <div className={tableStyles.pg}>‹</div>
            <div className={`${tableStyles.pg} ${tableStyles.pgOn}`}>1</div>
            <div className={tableStyles.pg}>2</div>
            <div className={tableStyles.pg}>›</div>
          </div>
        </div>
      </div>
    </div>
  );
}
