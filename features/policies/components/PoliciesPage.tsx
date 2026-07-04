import Link from "next/link";
import { ShieldCheck, ShieldAlert, Clock, DollarSign, AlertTriangle, Plus, Download, Search, SlidersHorizontal } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { KPICards } from "@/features/dashboard/components/KPICards";
import type { KPIStat, PolicyStatus } from "@/features/dashboard/types/dashboard.types";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";
import policyStyles from "@/features/dashboard/components/RecentPolicies.module.css";
import tableStyles from "@/components/ui/data-table.module.css";

const KPI_STATS: KPIStat[] = [
  { id: "active", label: "Active Policies", value: "95", delta: "+7 this month", trend: "up", barPercent: 74, accent: "green", icon: ShieldCheck },
  { id: "expiring", label: "Expiring (90 days)", value: "12", delta: "Action required", trend: "flat", barPercent: 35, accent: "gold", icon: Clock },
  { id: "premium", label: "Total Premium", value: "$6.2M", delta: "+$420K in force", trend: "up", barPercent: 80, accent: "purple", icon: DollarSign },
  { id: "lapsed", label: "Lapsed / Cancelled", value: "3", delta: "Review needed", trend: "down", barPercent: 10, accent: "red", icon: AlertTriangle },
];

const STATUS_ICON_BG: Record<PolicyStatus, string> = {
  active: "rgba(22,163,74,0.12)",
  expiring: "rgba(245,196,0,0.16)",
  cancelled: "rgba(220,38,38,0.12)",
};

const STATUS_ICON_COLOR: Record<PolicyStatus, string> = {
  active: "#16A34A",
  expiring: "#E4B000",
  cancelled: "#DC2626",
};

const STATUS_BAR: Record<PolicyStatus, string> = {
  active: "linear-gradient(90deg,#16A34A,#22C55E)",
  expiring: "linear-gradient(90deg,#F5C400,#93c5fd)",
  cancelled: "linear-gradient(90deg,#B91C1C,#DC2626)",
};

interface PolicyListRow {
  id: string;
  insuredName: string;
  policyNumber: string;
  coverageLabel: string;
  progressPercent: number;
  expiresAt: string;
  daysLeftLabel: string;
  amount: number;
  status: PolicyStatus;
}

const POLICIES: PolicyListRow[] = [
  { id: "p1", insuredName: "EAST 2 WEST EXPRESS INC", policyNumber: "POL-2026-00441", coverageLabel: "Covered Autos Liability", progressPercent: 88, expiresAt: "Expires Aug 18, 2026", daysLeftLabel: "47 days left", amount: 52184, status: "expiring" },
  { id: "p2", insuredName: "JS TRANZ LLC", policyNumber: "POL-2026-00440", coverageLabel: "Covered Autos + Cargo", progressPercent: 60, expiresAt: "Expires May 12, 2027", daysLeftLabel: "314 days left", amount: 66858, status: "active" },
  { id: "p3", insuredName: "BUTERA TRUCKING LLC", policyNumber: "POL-2026-00438", coverageLabel: "Covered Autos Liability", progressPercent: 72, expiresAt: "Expires May 26, 2027", daysLeftLabel: "328 days left", amount: 25565, status: "active" },
  { id: "p4", insuredName: "MACKZY LOGISTICS LLC", policyNumber: "POL-2026-00435", coverageLabel: "Covered Autos + UIIA", progressPercent: 65, expiresAt: "Expires May 20, 2027", daysLeftLabel: "322 days left", amount: 18394, status: "active" },
  { id: "p5", insuredName: "SATURN EXPRESS INC", policyNumber: "POL-2025-00291", coverageLabel: "Cancelled — Non-Payment", progressPercent: 100, expiresAt: "Cancelled Apr 14, 2026", daysLeftLabel: "Lapsed", amount: 23636, status: "cancelled" },
];

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function PoliciesPage() {
  return (
    <div>
      <DashboardHeader
        title="Policies"
        subtitle="95 active policies · $6.2M in force"
        actions={
          <>
            <button type="button" className={headerStyles.btnGhost}>
              <Download />
              Export
            </button>
            <button type="button" className={headerStyles.btnPrimary}>
              <Plus />
              Bind Policy
            </button>
          </>
        }
      />

      <KPICards stats={KPI_STATS} />

      <div className={tableStyles.panel}>
        <div className={tableStyles.header}>
          <div>
            <div className={tableStyles.title}>All Policies</div>
            <div className={tableStyles.subtitle}>Sorted by expiration date</div>
          </div>
          <div className={tableStyles.controls}>
            <div className={tableStyles.search}>
              <Search />
              <input placeholder="Search policies…" aria-label="Search policies" />
            </div>
            <button type="button" className={tableStyles.fltBtn}>
              <SlidersHorizontal />
              Filters
            </button>
            <button type="button" className={tableStyles.expBtn}>
              <Download />
              Export
            </button>
          </div>
        </div>

        <div style={{ padding: "12px 20px" }}>
          {POLICIES.map((policy) => {
            const Icon = policy.status === "cancelled" ? ShieldAlert : ShieldCheck;
            return (
              <div
                className={`${policyStyles.row} ${policy.status === "cancelled" ? policyStyles.rowCancelled : ""}`}
                key={policy.id}
              >
                <div className={policyStyles.icon} style={{ background: STATUS_ICON_BG[policy.status] }}>
                  <Icon color={STATUS_ICON_COLOR[policy.status]} strokeWidth={2} />
                </div>
                <div className={policyStyles.main}>
                  <div className={policyStyles.name}>{policy.insuredName}</div>
                  <div className={policyStyles.num}>
                    {policy.policyNumber} · {policy.coverageLabel}
                  </div>
                  <div className={policyStyles.progress}>
                    <div
                      className={policyStyles.progressFill}
                      style={{ width: `${policy.progressPercent}%`, background: STATUS_BAR[policy.status] }}
                    />
                  </div>
                </div>
                <div className={policyStyles.dates}>
                  <div className={policyStyles.exp}>{policy.expiresAt}</div>
                  <div className={policyStyles.daysLeft}>{policy.daysLeftLabel}</div>
                </div>
                <div className={policyStyles.amount}>{formatCurrency(policy.amount)}</div>
                <Link href={`/policies/${policy.id}`} className={tableStyles.actBtn} style={{ marginLeft: 8 }}>
                  View →
                </Link>
              </div>
            );
          })}
        </div>

        <div className={tableStyles.foot}>
          <div className={tableStyles.footInfo}>Showing 5 of 95 policies</div>
          <div className={tableStyles.pagi}>
            <div className={tableStyles.pg}>‹</div>
            <div className={`${tableStyles.pg} ${tableStyles.pgOn}`}>1</div>
            <div className={tableStyles.pg}>2</div>
            <div className={tableStyles.pg}>3</div>
            <div className={tableStyles.pg}>›</div>
          </div>
        </div>
      </div>
    </div>
  );
}
