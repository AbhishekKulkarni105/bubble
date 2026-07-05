import { Mail } from "lucide-react";
import type { InsuredDetail } from "../types/insured";
import styles from "./GeneralTab.module.css";

const DASH = "—";

function show(value: string) {
  return value ? value : DASH;
}

export function GeneralTab({ insured }: { insured: InsuredDetail }) {
  const { owner } = insured;

  return (
    <div>
      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.infoGrid}>
            <span className={styles.key}>Company</span>
            <span className={styles.val}>{show(insured.company)}</span>
            <span className={styles.key}>DBA</span>
            <span className={styles.val}>{show(insured.dba)}</span>
            <span className={styles.key}>DOT #</span>
            <span className={styles.val}>{show(insured.dot)}</span>
            <span className={styles.key}>MC #</span>
            <span className={styles.val}>{show(insured.mc)}</span>
            <span className={styles.key}>Est.</span>
            <span className={styles.val}>{show(insured.established)}</span>
            <span className={styles.key}>Legal Entity</span>
            <span className={styles.val}>{show(insured.legalEntity)}</span>
            <span className={styles.key}>Carrier type</span>
            <span className={styles.val}>{show(insured.carrierType)}</span>
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
        <button type="button" className={styles.btnGhost}>
          <Mail />
          Email a link for new quote
        </button>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Company Address</div>
          <div className={styles.emptyNote}>{insured.companyAddress || "No address on file"}</div>
        </div>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Owner Address</div>
          <div className={styles.emptyNote}>{insured.ownerAddress || "No address on file"}</div>
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.contactsGrid}>
          <div>
            <div className={styles.blockTitle}>Company Contacts</div>
            <div className={styles.contactCols}>
              <span className={styles.subKey}>Phones</span>
              <span className={styles.subKey}>Emails</span>
              <span className={styles.muted}>{insured.companyPhones.join(", ") || DASH}</span>
              <span className={styles.muted}>{insured.companyEmails.join(", ") || DASH}</span>
            </div>
          </div>
          <div>
            <div className={styles.blockTitle}>Owner Contacts</div>
            <div className={styles.contactCols}>
              <span className={styles.subKey}>Phones</span>
              <span className={styles.subKey}>Emails</span>
              <span className={styles.muted}>{insured.ownerPhones.join(", ") || DASH}</span>
              <span className={styles.muted}>{insured.ownerEmails.join(", ") || DASH}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
