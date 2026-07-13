"use client";

import { ArrowRight } from "lucide-react";
import { US_STATES } from "../constants";
import styles from "../GetQuoteForm.module.css";

interface AddressFormProps {
  address: string;
  setAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  county: string;
  setCounty: (v: string) => void;
  zip: string;
  setZip: (v: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function AddressForm({
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  county,
  setCounty,
  zip,
  setZip,
  onPrev,
  onNext,
}: AddressFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Insured Address</div>
      <div className={styles.cardSub}>Principal place of business</div>
      <div className={styles.formGrid}>
        <div className={`${styles.field} ${styles.span2}`}>
          <label>Street Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street Address" />
        </div>
        <div className={styles.field}>
          <label>City</label>
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
        </div>
        <div className={styles.field}>
          <label>
            State <span className={styles.req}>*</span>
          </label>
          <select value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Select State…</option>
            {US_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>County</label>
          <input value={county} onChange={(e) => setCounty(e.target.value)} placeholder="County" />
        </div>
        <div className={styles.field}>
          <label>ZIP Code</label>
          <input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP Code" maxLength={10} />
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
