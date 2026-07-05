"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { INSURED_TABS, type InsuredDetail as InsuredDetailModel, type InsuredTab } from "../types/insured";
import { GeneralTab } from "./GeneralTab";
import { DriversTab } from "./DriversTab";
import { VehiclesTab } from "./VehiclesTab";
import { QuotesTab } from "./QuotesTab";
import { PoliciesTab } from "./PoliciesTab";
import styles from "./InsuredDetail.module.css";

export function InsuredDetail({ insured }: { insured: InsuredDetailModel }) {
  const [activeTab, setActiveTab] = useState<InsuredTab>("General");

  return (
    <div>
      <DashboardHeader
        title={insured.company}
        subtitle={`Insured · ${insured.lineOfBusiness}`}
        actions={
          <Link href="/insureds" className={styles.backBtn}>
            <ArrowLeft />
            Back to Insureds
          </Link>
        }
      />

      <nav className={styles.tabs} aria-label="Insured detail">
        {INSURED_TABS.map((tab) => (
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

      {activeTab === "General" ? <GeneralTab insured={insured} /> : null}
      {activeTab === "Drivers" ? <DriversTab /> : null}
      {activeTab === "Vehicles" ? <VehiclesTab /> : null}
      {activeTab === "Quotes" ? <QuotesTab /> : null}
      {activeTab === "Policies" ? <PoliciesTab /> : null}
    </div>
  );
}
