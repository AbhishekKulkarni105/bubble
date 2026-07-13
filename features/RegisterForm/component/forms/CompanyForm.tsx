"use client";

import { ArrowRight } from "lucide-react";
import styles from "../GetQuoteForm.module.css";

interface CompanyFormProps {
  companyName: string;
  setCompanyName: (v: string) => void;
  dba: string;
  setDba: (v: string) => void;
  dotNumber: string;
  setDotNumber: (v: string) => void;
  mcNumber: string;
  setMcNumber: (v: string) => void;
  legalEntity: string;
  setLegalEntity: (v: string) => void;
  truckingType: string;
  setTruckingType: (v: string) => void;
  duiViolations: string;
  setDuiViolations: (v: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CompanyForm({
  companyName,
  setCompanyName,
  dba,
  setDba,
  dotNumber,
  setDotNumber,
  mcNumber,
  setMcNumber,
  legalEntity,
  setLegalEntity,
  truckingType,
  setTruckingType,
  duiViolations,
  setDuiViolations,
  onPrev,
  onNext,
}: CompanyFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Insured Information</div>
      <div className={styles.cardSub}>Basic company and regulatory details</div>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>
            Company Name <span className={styles.req}>*</span>
          </label>
          <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
        </div>
        <div className={styles.field}>
          <label>DBA</label>
          <input value={dba} onChange={(e) => setDba(e.target.value)} placeholder="Doing Business As" />
        </div>
        <div className={styles.field}>
          <label>DOT Number</label>
          <input value={dotNumber} onChange={(e) => setDotNumber(e.target.value)} placeholder="DOT Number" />
        </div>
        <div className={styles.field}>
          <label>MC Number</label>
          <input value={mcNumber} onChange={(e) => setMcNumber(e.target.value)} placeholder="MC Number" />
        </div>
        <div className={styles.field}>
          <label>Legal Entity</label>
          <select value={legalEntity} onChange={(e) => setLegalEntity(e.target.value)}>
            <option value="llc">LLC</option>
            <option value="sole">Sole Proprietor</option>
            <option value="individual">Individual</option>
            <option value="partnership">Partnership</option>
            <option value="corporation">Corporation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Trucking Company Type</label>
          <select value={truckingType} onChange={(e) => setTruckingType(e.target.value)}>
            <option value="common">Common</option>
            <option value="contract">Contract</option>
            <option value="moving">Moving</option>
            <option value="non-trucking">Non-Trucking</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className={`${styles.field} ${styles.span3}`}>
          <label>
            Out-of-service violations due to DUI or drug-related? <span className={styles.req}>*</span>
          </label>
          <select value={duiViolations} onChange={(e) => setDuiViolations(e.target.value)} style={{ maxWidth: 220 }}>
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
