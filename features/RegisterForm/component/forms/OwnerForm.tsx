"use client";

import { ArrowRight } from "lucide-react";
import styles from "../GetQuoteForm.module.css";

interface OwnerFormProps {
  ownerFirst: string;
  setOwnerFirst: (v: string) => void;
  ownerLast: string;
  setOwnerLast: (v: string) => void;
  ownerEmail: string;
  setOwnerEmail: (v: string) => void;
  ownerPhone: string;
  setOwnerPhone: (v: string) => void;
  bizYear: string;
  setBizYear: (v: string) => void;
  ownerExp: string;
  setOwnerExp: (v: string) => void;
  ownerDob: string;
  setOwnerDob: (v: string) => void;
  ownerIsDriver: string;
  setOwnerIsDriver: (v: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function OwnerForm({
  ownerFirst,
  setOwnerFirst,
  ownerLast,
  setOwnerLast,
  ownerEmail,
  setOwnerEmail,
  ownerPhone,
  setOwnerPhone,
  bizYear,
  setBizYear,
  ownerExp,
  setOwnerExp,
  ownerDob,
  setOwnerDob,
  ownerIsDriver,
  setOwnerIsDriver,
  onPrev,
  onNext,
}: OwnerFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Owner Information</div>
      <div className={styles.cardSub}>Principal owner and business history</div>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>
            First Name <span className={styles.req}>*</span>
          </label>
          <input value={ownerFirst} onChange={(e) => setOwnerFirst(e.target.value)} placeholder="First Name" />
        </div>
        <div className={styles.field}>
          <label>
            Last Name <span className={styles.req}>*</span>
          </label>
          <input value={ownerLast} onChange={(e) => setOwnerLast(e.target.value)} placeholder="Last Name" />
        </div>
        <div className={styles.field}>
          <label>
            Email <span className={styles.req}>*</span>
          </label>
          <input type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="Email" />
        </div>
        <div className={styles.field}>
          <label>
            Phone <span className={styles.req}>*</span>
          </label>
          <input type="tel" value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="Phone" />
        </div>
        <div className={styles.field}>
          <label>Year Business Established</label>
          <input type="number" value={bizYear} onChange={(e) => setBizYear(e.target.value)} placeholder="Year" min={1900} max={2026} />
        </div>
        <div className={styles.field}>
          <label>Years of Owner Experience</label>
          <input type="number" value={ownerExp} onChange={(e) => setOwnerExp(e.target.value)} placeholder="Years" min={0} max={60} />
        </div>
        <div className={styles.field}>
          <label>Owner Birth Date</label>
          <input type="date" value={ownerDob} onChange={(e) => setOwnerDob(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Owner is a Driver?</label>
          <select value={ownerIsDriver} onChange={(e) => setOwnerIsDriver(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      <div className={styles.btnRow}>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={onPrev}>
          ← Previous
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={onNext}>
          Next Step <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
