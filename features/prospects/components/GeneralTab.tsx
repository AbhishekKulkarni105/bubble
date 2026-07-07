"use client";

import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import type { ProspectDetail } from "../types/prospect";
import styles from "./GeneralTab.module.css";

const DASH = "—";
const FALLBACK_EMAILS = ["dobrinski+t1@gmail.com"];

function show(value: string) {
  return value ? value : DASH;
}

export function GeneralTab({
  prospect,
  agencyName = "Morpheus Ins",
}: {
  prospect: ProspectDetail;
  agencyName?: string;
}) {
  const { owner } = prospect;

  const emailOptions = useMemo(() => {
    const all = [...prospect.companyEmails, ...prospect.ownerEmails]
      .map((e) => e.trim())
      .filter(Boolean);
    const unique = Array.from(new Set(all));
    return unique.length > 0 ? unique : FALLBACK_EMAILS;
  }, [prospect.companyEmails, prospect.ownerEmails]);

  const [emailOpen, setEmailOpen] = useState(false);
  const [useOther, setUseOther] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(emailOptions[0]);
  const [otherEmail, setOtherEmail] = useState("");
  const [sent, setSent] = useState(false);

  const recipient = useOther ? otherEmail.trim() : selectedEmail;

  function openEmail() {
    setSelectedEmail(emailOptions[0]);
    setUseOther(false);
    setOtherEmail("");
    setSent(false);
    setEmailOpen(true);
  }

  function closeEmail() {
    setEmailOpen(false);
  }

  function sendLink() {
    if (!recipient) return;
    setSent(true);
  }

  return (
    <div>
      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.infoGrid}>
            <span className={styles.key}>Company</span>
            <span className={styles.val}>{show(prospect.company)}</span>
            <span className={styles.key}>DBA</span>
            <span className={styles.val}>{show(prospect.dba)}</span>
            <span className={styles.key}>DOT #</span>
            <span className={styles.val}>{show(prospect.dot)}</span>
            <span className={styles.key}>MC #</span>
            <span className={styles.val}>{show(prospect.mc)}</span>
            <span className={styles.key}>Est.</span>
            <span className={styles.val}>{show(prospect.established)}</span>
            <span className={styles.key}>Legal Entity</span>
            <span className={styles.val}>{show(prospect.legalEntity)}</span>
            <span className={styles.key}>Carrier type</span>
            <span className={styles.val}>{show(prospect.carrierType)}</span>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.infoGrid}>
            <span className={styles.key}>First Name</span>
            <span className={styles.muted}>{show(owner.firstName)}</span>
            <span className={styles.key}>Middle Name</span>
            <span className={styles.muted}>{show(owner.middleName)}</span>
            <span className={styles.key}>Last Name</span>
            <span className={styles.muted}>{show(owner.lastName)}</span>
            <span className={styles.key}>SSN</span>
            <span className={styles.muted}>{show(owner.ssn)}</span>
            <span className={styles.key}>DoB</span>
            <span className={styles.muted}>{show(owner.dob)}</span>
          </div>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.actionPanel}`}>
        <button type="button" className={styles.btnGhost} onClick={openEmail}>
          <Mail />
          Email a link for new quote
        </button>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Company Address</div>
          <div className={styles.emptyNote}>{prospect.companyAddress || "No address on file"}</div>
        </div>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Owner Address</div>
          <div className={styles.emptyNote}>{prospect.ownerAddress || "No address on file"}</div>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.contactsGrid}>
          <div>
            <div className={styles.blockTitle}>Company Contacts</div>
            <div className={styles.contactCols}>
              <span className={styles.subKey}>Phones</span>
              <span className={styles.subKey}>Emails</span>
              <span className={styles.muted}>{prospect.companyPhones.join(", ") || DASH}</span>
              <span className={styles.muted}>{prospect.companyEmails.join(", ") || DASH}</span>
            </div>
          </div>
          <div>
            <div className={styles.blockTitle}>Owner Contacts</div>
            <div className={styles.contactCols}>
              <span className={styles.subKey}>Phones</span>
              <span className={styles.subKey}>Emails</span>
              <span className={styles.muted}>{prospect.ownerPhones.join(", ") || DASH}</span>
              <span className={styles.muted}>{prospect.ownerEmails.join(", ") || DASH}</span>
            </div>
          </div>
        </div>
      </div>

      {emailOpen ? (
        <div className={styles.modalOverlay} onClick={closeEmail}>
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-label="Send quote link"
            onClick={(e) => e.stopPropagation()}
          >
            {sent ? (
              <p className={styles.modalSent}>
                Quote link sent to <strong>{recipient}</strong>.
              </p>
            ) : (
              <>
                <div className={styles.modalTitle}>
                  Send quote link from {agencyName} to :
                </div>

                {useOther ? (
                  <input
                    type="email"
                    className={styles.modalInput}
                    placeholder="Email address"
                    value={otherEmail}
                    onChange={(e) => setOtherEmail(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <select
                    className={styles.modalSelect}
                    value={selectedEmail}
                    onChange={(e) => setSelectedEmail(e.target.value)}
                  >
                    {emailOptions.map((email) => (
                      <option key={email} value={email}>
                        {email}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  type="button"
                  className={styles.modalToggle}
                  onClick={() => setUseOther((v) => !v)}
                >
                  {useOther ? "Choose from list" : "Send to other email"}
                </button>
              </>
            )}

            <div className={styles.modalActions}>
              {sent ? (
                <button type="button" className={styles.modalSend} onClick={closeEmail}>
                  Close
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.modalSend}
                  onClick={sendLink}
                  disabled={!recipient}
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
