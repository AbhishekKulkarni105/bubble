"use client";

import { ArrowRight } from "lucide-react";
import styles from "../GetQuoteForm.module.css";

interface CargoFormProps {
  needCargo: string;
  setNeedCargo: (v: string) => void;
  cargoValue: string;
  setCargoValue: (v: string) => void;
  cargoDeductible: string;
  setCargoDeductible: (v: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function CargoForm({
  needCargo,
  setNeedCargo,
  cargoValue,
  setCargoValue,
  cargoDeductible,
  setCargoDeductible,
  onPrev,
  onNext,
}: CargoFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Cargo Coverage</div>
      <div className={styles.cardSub}>Optional inland marine / cargo protection</div>
      <div className={`${styles.formGrid} ${styles.formGridCol1}`} style={{ maxWidth: 340 }}>
        <div className={styles.field}>
          <label>
            Do you need cargo coverage? <span className={styles.req}>*</span>
          </label>
          <select value={needCargo} onChange={(e) => setNeedCargo(e.target.value)}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      {needCargo === "yes" ? (
        <div style={{ marginTop: 20 }}>
          <div className={`${styles.formGrid} ${styles.formGridCol2}`} style={{ maxWidth: 560 }}>
            <div className={styles.field}>
              <label>Cargo Value ($)</label>
              <input type="number" value={cargoValue} onChange={(e) => setCargoValue(e.target.value)} placeholder="e.g. 100000" min={0} />
            </div>
            <div className={styles.field}>
              <label>Cargo Deductible</label>
              <select value={cargoDeductible} onChange={(e) => setCargoDeductible(e.target.value)}>
                <option value="1000">$1,000</option>
                <option value="2500">$2,500</option>
                <option value="5000">$5,000</option>
              </select>
            </div>
          </div>
        </div>
      ) : null}
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
