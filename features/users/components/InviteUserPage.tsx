"use client";

import { useState } from "react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import styles from "./InviteUserPage.module.css";

const AGENCY_NAME = "Morpheus Ins";
const QUOTE_LINK =
  "https://portal.mtmanagers.com/version-test/get_quote?agency_id=1744266062766×566569462860087300";

const DEFAULT_MESSAGE = `Hello,

We're here to simplify your trucking insurance process! 🚚

At ${AGENCY_NAME}, we specialize in tailored coverage for fleets like yours. Get your personalized quote using our streamlined tool – no account or registration required.

👉 Start Now:
${QUOTE_LINK}

Best Regards

Abhishek Kulkarni`;

export function InviteUserPage() {
  const [agentEmail, setAgentEmail] = useState("");
  const [insuredEmail, setInsuredEmail] = useState("");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);

  return (
    <div>
      <DashboardHeader title="Invite User" subtitle={`${AGENCY_NAME} · Agency Admin`} />

      <div className={styles.grid}>
        {/* Invite an agent */}
        <div className={styles.card}>
          <div className={styles.banner}>
            <div className={styles.bannerTitle}>
              You are inviting an Agent to:
              <span className={styles.bannerLink}>{AGENCY_NAME}</span>
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Invited user email</span>
            <input
              className={styles.input}
              type="email"
              placeholder="name@example.com"
              value={agentEmail}
              onChange={(e) => setAgentEmail(e.target.value)}
            />
          </div>

          <button type="button" className={styles.btnDisabled} disabled>
            Forbidden option
          </button>
        </div>

        {/* Send quote link to insured */}
        <div className={styles.card}>
          <div className={styles.banner}>
            <div className={styles.bannerTitle}>
              Send link to Insured :
              <span className={styles.bannerLink}>{QUOTE_LINK}</span>
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={styles.input}
              type="email"
              placeholder="name@example.com"
              value={insuredEmail}
              onChange={(e) => setInsuredEmail(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <textarea
              className={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="button"
            className={insuredEmail ? styles.btnPrimary : styles.btnDisabled}
            disabled={!insuredEmail}
          >
            Send Link
          </button>
        </div>
      </div>
    </div>
  );
}
