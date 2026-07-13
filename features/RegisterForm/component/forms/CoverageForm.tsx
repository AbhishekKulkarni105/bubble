"use client";

import { ArrowRight } from "lucide-react";
import styles from "../GetQuoteForm.module.css";

interface CoverageFormProps {
  liabilityLimit: string;
  setLiabilityLimit: (v: string) => void;
  effectiveDate: string;
  setEffectiveDate: (v: string) => void;
  expirationDate: string;
  setExpirationDate: (v: string) => void;
  anyDriverOos: boolean;
  setAnyDriverOos: (fn: (v: boolean) => boolean) => void;
  coverages: Record<string, boolean>;
  toggleCoverage: (key: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CoverageForm({
  liabilityLimit,
  setLiabilityLimit,
  effectiveDate,
  setEffectiveDate,
  expirationDate,
  setExpirationDate,
  anyDriverOos,
  setAnyDriverOos,
  coverages,
  toggleCoverage,
  onPrev,
  onNext,
}: CoverageFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Coverage Information</div>
      <div className={styles.cardSub}>Select your liability limits and required coverages</div>
      <div className={`${styles.formGrid} ${styles.formGridCol2}`} style={{ marginBottom: 20 }}>
        <div className={styles.field}>
          <label>
            Liability Limit <span className={styles.req}>*</span>
          </label>
          <select value={liabilityLimit} onChange={(e) => setLiabilityLimit(e.target.value)}>
            <option value="">Choose…</option>
            <option value="750k">$750,000</option>
            <option value="1m">$1,000,000</option>
            <option value="2m">$2,000,000</option>
            <option value="5m">$5,000,000</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Effective Date</label>
          <input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
        </div>
        <div className={styles.field}>
          <label>Expiration Date</label>
          <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
        </div>
        <div className={styles.field} style={{ justifyContent: "flex-end", paddingTop: 18 }}>
          <div
            className={`${styles.covItem} ${anyDriverOos ? styles.covItemChecked : ""}`}
            onClick={() => setAnyDriverOos((v) => !v)}
          >
            <input type="checkbox" checked={anyDriverOos} readOnly />
            <label style={{ textTransform: "none", fontSize: 12, letterSpacing: 0 }}>
              Any driver out-of-service past year?
            </label>
          </div>
        </div>
      </div>
      <div className={styles.coverageBox}>
        <div className={styles.coverageBoxTitle}>Coverage Name</div>
        <div className={styles.covGrid}>
          <div
            className={`${styles.covItem} ${coverages.autos ? styles.covItemChecked : ""}`}
            onClick={() => toggleCoverage("autos")}
          >
            <input type="checkbox" checked={coverages.autos} readOnly />
            <label>Covered Autos Liability</label>
          </div>
          <div
            className={`${styles.covItem} ${coverages.general ? styles.covItemChecked : ""}`}
            onClick={() => toggleCoverage("general")}
          >
            <input type="checkbox" checked={coverages.general} readOnly />
            <label>General Liability</label>
          </div>
          <div className={`${styles.covItem} ${styles.covItemNa}`}>
            <input type="checkbox" disabled />
            <label>Personal Injury Protection</label>
          </div>
          <div className={`${styles.covItem} ${styles.covItemNa}`}>
            <input type="checkbox" disabled />
            <label>Auto Medical Payments</label>
          </div>
          <div className={`${styles.covItem} ${styles.covItemNa}`}>
            <input type="checkbox" disabled />
            <label>Uninsured Motorists</label>
          </div>
          <div
            className={`${styles.covItem} ${coverages.uiia ? styles.covItemChecked : ""}`}
            onClick={() => toggleCoverage("uiia")}
          >
            <input type="checkbox" checked={coverages.uiia} readOnly />
            <label>UIIA</label>
          </div>
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
