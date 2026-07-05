"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { POLICY_TABS, type PolicyDetail as PolicyDetailModel, type PolicyTab } from "../types/policy";
import { SummaryTab } from "./SummaryTab";
import { DriversTab } from "./DriversTab";
import { VehiclesTab } from "./VehiclesTab";
import { CoveragesTab } from "./CoveragesTab";
import { EndorsementsTab } from "./EndorsementsTab";
import styles from "./PolicyDetail.module.css";

export function PolicyDetail({ policy }: { policy: PolicyDetailModel }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PolicyTab>("Summary");

  // "Insured" jumps to the insured's own workspace (opens on its General tab)
  // instead of rendering an inline pane.
  const selectTab = (tab: PolicyTab) => {
    if (tab === "Insured") {
      router.push(`/insureds/${policy.insured.id}`);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div>
      <DashboardHeader
        title={`Policy ${policy.policyNo}`}
        subtitle={`${policy.lob} · ${policy.producer.agency}`}
        actions={
          <Link href="/policies" className={styles.backBtn}>
            <ArrowLeft />
            Back to Policies
          </Link>
        }
      />

      <nav className={styles.tabs} aria-label="Policy detail">
        {POLICY_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
            aria-current={activeTab === tab ? "page" : undefined}
            onClick={() => selectTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === "Summary" ? <SummaryTab policy={policy} /> : null}
      {activeTab === "Drivers" ? <DriversTab policy={policy} /> : null}
      {activeTab === "Vehicles" ? <VehiclesTab policy={policy} /> : null}
      {activeTab === "Coverages" ? <CoveragesTab policy={policy} /> : null}
      {activeTab === "Endorsements" ? <EndorsementsTab policy={policy} /> : null}
    </div>
  );
}
