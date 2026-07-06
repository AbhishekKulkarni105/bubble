"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { downloadQuotePdf } from "../lib/quotePdf";
import { QUOTE_TABS, type QuoteDetail as QuoteDetailModel, type QuoteTab } from "../types/quote";
import { SummaryTab } from "./SummaryTab";
import { DriversTab } from "./DriversTab";
import { VehiclesTab } from "./VehiclesTab";
import { UploadFilesTab } from "./UploadFilesTab";
import { ApplicationFormTab } from "./ApplicationFormTab";
import { JsonTab } from "./JsonTab";
import styles from "./QuoteDetail.module.css";

export function QuoteDetail({ quote }: { quote: QuoteDetailModel }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<QuoteTab>("Summary");
  const [emailOpen, setEmailOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  function sendEmail() {
    if (!email.trim()) return;
    setEmailSent(true);
  }

  function closeEmail() {
    setEmailOpen(false);
    setEmailSent(false);
    setEmail("");
  }

  return (
    <div>
      <DashboardHeader
        title={`Quote ${quote.quoteId}`}
        subtitle={`${quote.insured} · ${quote.state} · ${quote.agency}`}
        actions={
          <Link href="/quotes" className={styles.backBtn}>
            <ArrowLeft />
            Back to Quotes
          </Link>
        }
      />

      <nav className={styles.tabs} aria-label="Quote detail">
        {QUOTE_TABS.map((tab) => (
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

      {activeTab === "Summary" ? <SummaryTab quote={quote} /> : null}
      {activeTab === "Drivers" ? <DriversTab quote={quote} /> : null}
      {activeTab === "Vehicles" ? <VehiclesTab quote={quote} /> : null}
      {activeTab === "Upload Files" ? <UploadFilesTab /> : null}
      {activeTab === "Application Form" ? (
        <ApplicationFormTab quote={quote} onClose={() => setActiveTab("Summary")} />
      ) : null}
      {activeTab === "Json" ? <JsonTab quote={quote} /> : null}

      {activeTab !== "Application Form" ? (
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.qbtn} ${styles.qbtnOrange}`}
            onClick={() => setEmailOpen(true)}
          >
            Email me quote
          </button>
          <button
            type="button"
            className={`${styles.qbtn} ${styles.qbtnTeal}`}
            onClick={() => downloadQuotePdf(quote)}
          >
            Download quote
          </button>
          <button
            type="button"
            className={`${styles.qbtn} ${styles.qbtnYellow}`}
            onClick={() => router.push(`/quotes/new?edit=${quote.quoteId}`)}
          >
            Edit quote
          </button>
          <Link href="/quotes/new" className={`${styles.qbtn} ${styles.qbtnBlue}`}>
            Start new quote
          </Link>
        </div>
      ) : null}

      {emailOpen ? (
        <div className={styles.modalOverlay} onClick={closeEmail}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {emailSent ? (
              <p className={styles.modalSent}>
                Quote sent to <strong>{email}</strong>.
              </p>
            ) : (
              <input
                type="email"
                className={styles.modalInput}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            )}
            <div className={styles.modalActions}>
              <button type="button" className={styles.modalClose} onClick={closeEmail}>
                Close
              </button>
              {!emailSent ? (
                <button
                  type="button"
                  className={styles.modalSend}
                  onClick={sendEmail}
                  disabled={!email.trim()}
                >
                  Send
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.callNote}>
        Prefer to speak with us directly?
        <br />
        Call (555) 555-4444 for an immediate quote over the phone.
      </div>
    </div>
  );
}
