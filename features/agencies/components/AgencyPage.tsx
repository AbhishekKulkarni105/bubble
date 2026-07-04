"use client";

import { useState } from "react";
import { AlignLeft, FileText } from "lucide-react";
import { handleCardMove, handleCardLeave } from "@/features/AgenciesForm/lib/cardTilt";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { PoliciesTab } from "@/features/AgenciesForm/components/PoliciesTab";
import { QuotesTab } from "@/features/AgenciesForm/components/QuotesTab";
import { InsuredsTab } from "@/features/AgenciesForm/components/InsuredsTab";
import { ProspectsTab } from "@/features/AgenciesForm/components/ProspectsTab";
import { MembersTab } from "@/features/AgenciesForm/components/MembersTab";
import { InvitationsTab } from "@/features/AgenciesForm/components/InvitationsTab";
import styles from "./AgencyPage.module.css";

const TABS = [
  "General",
  "Policies",
  "Quotes",
  "Insureds",
  "Prospects",
  "Members",
  "Invitations",
] as const;

interface Metric {
  id: string;
  label: string;
  count: string;
  icon: typeof AlignLeft;
  iconBg: string;
  iconColor: string;
  bar: string;
  fill: string;
  fillPercent: number;
}

const METRICS: Metric[] = [
  {
    id: "quotes",
    label: "Quotes",
    count: "284 quotes created",
    icon: AlignLeft,
    iconBg: "var(--vayga-gold-dim)",
    iconColor: "#b8860b",
    bar: "linear-gradient(90deg, #f5c400, #b8860b)",
    fill: "#f5c400",
    fillPercent: 72,
  },
  {
    id: "policies",
    label: "Policies",
    count: "47 policies created",
    icon: AlignLeft,
    iconBg: "var(--vayga-green-dim)",
    iconColor: "var(--vayga-green)",
    bar: "linear-gradient(90deg, #16a34a, #15803d)",
    fill: "var(--vayga-green)",
    fillPercent: 48,
  },
  {
    id: "prospects",
    label: "Prospects",
    count: "63 prospects created",
    icon: FileText,
    iconBg: "var(--vayga-teal-dim)",
    iconColor: "var(--vayga-teal)",
    bar: "linear-gradient(90deg, #0891b2, #0e7490)",
    fill: "var(--vayga-teal)",
    fillPercent: 58,
  },
  {
    id: "insureds",
    label: "Insureds",
    count: "38 insureds created",
    icon: FileText,
    iconBg: "var(--vayga-purple-dim)",
    iconColor: "var(--vayga-purple)",
    bar: "linear-gradient(90deg, #7c3aed, #6d28d9)",
    fill: "var(--vayga-purple)",
    fillPercent: 35,
  },
];

export function AgencyPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("General");

  return (
    <div>
      <nav className={styles.tabs} aria-label="Agency workspace">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
            aria-current={activeTab === tab ? "page" : undefined}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <DashboardHeader title="All Capital Insurance Inc" subtitle="Agency workspace · MTM ID 239" />

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>All Capital Insurance Inc</div>
          <div className={styles.infoLabel}>Create Date</div>
          <div className={styles.infoValue}>9/18/2025</div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoTitle}>Creator</div>
          <div className={styles.infoLabel}>Admin</div>
          <div className={styles.infoValue}>Admin</div>
        </div>
      </div>

      {activeTab === "General" ? (
        <div className={styles.metricGrid}>
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                className={styles.metricCard}
                key={metric.id}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
              >
                <div className={styles.metricIcon} style={{ background: metric.iconBg, color: metric.iconColor }}>
                  <Icon />
                </div>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricBar} style={{ background: metric.bar }} />
                <div className={styles.metricCount}>{metric.count}</div>
                <div className={styles.metricTrack}>
                  <div
                    className={styles.metricFill}
                    style={{ width: `${metric.fillPercent}%`, background: metric.fill }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {activeTab === "Policies" ? <PoliciesTab /> : null}
      {activeTab === "Quotes" ? <QuotesTab /> : null}
      {activeTab === "Insureds" ? <InsuredsTab /> : null}
      {activeTab === "Prospects" ? <ProspectsTab /> : null}
      {activeTab === "Members" ? <MembersTab /> : null}
      {activeTab === "Invitations" ? <InvitationsTab /> : null}
    </div>
  );
}
