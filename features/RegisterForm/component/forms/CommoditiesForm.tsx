"use client";

import { ArrowRight } from "lucide-react";
import { COMMODITIES } from "../constants";
import styles from "../GetQuoteForm.module.css";

interface CommoditiesFormProps {
  commodities: Set<string>;
  toggleCommodity: (name: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CommoditiesForm({ commodities, toggleCommodity, onPrev, onNext }: CommoditiesFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Commodities List</div>
      <div className={styles.cardSub}>Select all commodities your fleet hauls</div>
      <div className={styles.commGrid}>
        {COMMODITIES.map((name) => (
          <div
            key={name}
            className={`${styles.commItem} ${commodities.has(name) ? styles.commItemChecked : ""}`}
            onClick={() => toggleCommodity(name)}
          >
            <input type="checkbox" checked={commodities.has(name)} readOnly />
            <label>{name}</label>
          </div>
        ))}
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
