"use client";

import { ArrowRight, AlertCircle } from "lucide-react";
import styles from "../GetQuoteForm.module.css";

interface LimitsFormProps {
  coverages: Record<string, boolean>;
  onPrev: () => void;
  onNext: () => void;
}

export default function LimitsForm({ coverages, onPrev, onNext }: LimitsFormProps) {
  const noneSelected = !coverages.autos && !coverages.general && !coverages.uiia;

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Coverage Limits</div>
      <div className={styles.cardSub}>Specific limits and sublimits per coverage</div>
      {noneSelected ? (
        <div className={styles.alertInfo}>
          <AlertCircle size={16} />
          Select one or more coverages in the previous step to configure limits here.
        </div>
      ) : (
        <div className={`${styles.formGrid} ${styles.formGridCol2}`}>
          {coverages.autos ? (
            <div className={styles.field}>
              <label>Covered Autos Liability Limit</label>
              <select defaultValue="$1,000,000">
                <option>$1,000,000</option>
                <option>$2,000,000</option>
                <option>$5,000,000</option>
              </select>
            </div>
          ) : null}
          {coverages.general ? (
            <div className={styles.field}>
              <label>General Liability Limit</label>
              <select defaultValue="$1,000,000">
                <option>$1,000,000</option>
                <option>$2,000,000</option>
              </select>
            </div>
          ) : null}
        </div>
      )}
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
