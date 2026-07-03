import Link from "next/link";
import type { Route } from "next";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import type { PolicyRow, PolicyStatus } from "../types/dashboard.types";
import styles from "./RecentPolicies.module.css";

const STATUS_ICON_BG: Record<PolicyStatus, string> = {
  active: "rgba(34,197,94,0.12)",
  expiring: "rgba(255,212,0,0.14)",
  cancelled: "rgba(239,68,68,0.12)",
};

const STATUS_ICON_COLOR: Record<PolicyStatus, string> = {
  active: "#22C55E",
  expiring: "#ffdd33",
  cancelled: "#EF4444",
};

const STATUS_BAR: Record<PolicyStatus, string> = {
  active: "linear-gradient(90deg,#22C55E,#86EFAC)",
  expiring: "linear-gradient(90deg,#ffdd33,#93c5fd)",
  cancelled: "linear-gradient(90deg,#B91C1C,#EF4444)",
};

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

interface RecentPoliciesProps {
  policies: PolicyRow[];
}

export function RecentPolicies({ policies }: RecentPoliciesProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Recent Policies</div>
          <div className={styles.subtitle}>Sorted by expiration date</div>
        </div>
        <Link href={"/policies" as Route} className={styles.viewAll}>
          View all →
        </Link>
      </div>

      {policies.map((policy) => {
        const Icon = policy.status === "cancelled" ? ShieldAlert : ShieldCheck;
        return (
          <div
            className={`${styles.row} ${policy.status === "cancelled" ? styles.rowCancelled : ""}`}
            key={policy.id}
          >
            <div className={styles.icon} style={{ background: STATUS_ICON_BG[policy.status] }}>
              <Icon color={STATUS_ICON_COLOR[policy.status]} strokeWidth={2} />
            </div>
            <div className={styles.main}>
              <div className={styles.name}>{policy.insuredName}</div>
              <div className={styles.num}>
                {policy.policyNumber} · {policy.coverageLabel}
              </div>
              <div className={styles.progress}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${policy.progressPercent}%`, background: STATUS_BAR[policy.status] }}
                />
              </div>
            </div>
            <div className={styles.dates}>
              <div className={styles.exp}>{policy.expiresAt}</div>
              <div className={styles.daysLeft}>{policy.daysLeftLabel}</div>
            </div>
            <div className={styles.amount}>{formatCurrency(policy.amount)}</div>
          </div>
        );
      })}
    </div>
  );
}
