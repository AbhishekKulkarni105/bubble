"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { PROSPECT_TABS, type ProspectDetail as ProspectDetailModel, type ProspectTab } from "../types/prospect";
import { GeneralTab } from "./GeneralTab";
import { DriversTab } from "./DriversTab";
import { VehiclesTab } from "./VehiclesTab";
import { QuotesTab } from "./QuotesTab";
import { PoliciesTab } from "./PoliciesTab";
import styles from "./ProspectDetail.module.css";

export function ProspectDetail({ prospect }: { prospect: ProspectDetailModel }) {
  const [activeTab, setActiveTab] = useState<ProspectTab>("General");

  return (
    <div>
      <DashboardHeader
        title={prospect.company}
        subtitle={`Prospect · ${prospect.lineOfBusiness}`}
        actions={
          <Link href="/prospects" className={styles.backBtn}>
            <ArrowLeft />
            Back to Prospects
          </Link>
        }
      />

      <nav className={styles.tabs} aria-label="Prospect detail">
        {PROSPECT_TABS.map((tab) => (
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

      {activeTab === "General" ? <GeneralTab prospect={prospect} /> : null}
      {activeTab === "Drivers" ? <DriversTab /> : null}
      {activeTab === "Vehicles" ? <VehiclesTab /> : null}
      {activeTab === "Quotes" ? <QuotesTab /> : null}
      {activeTab === "Policies" ? <PoliciesTab /> : null}
    </div>
  );
}
