"use client";

import { ArrowRight, ShieldCheck, Zap, Timer } from "lucide-react";
import styles from "../GetQuoteForm.module.css";

interface StartFormProps {
  dotNumber: string;
  setDotNumber: (v: string) => void;
  onStart: () => void;
}

export default function StartForm({ dotNumber, setDotNumber, onStart }: StartFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.heroBadge}>
        <span className={styles.heroBadgeDot} />
        Instant Quote · No Commitment
      </div>
      <div className={styles.heroTitle}>
        Instant Trucking Insurance
        <br />
        Quote Online
      </div>
      <div className={styles.heroSub}>
        New ventures and new CDL drivers welcome. Get an accurate estimate in minutes.
      </div>
      <div className={styles.heroBanner}>
        We understand privacy matters. No commitment, no spam — fill in the form below and get a live quote in
        minutes.
      </div>
      <div className={styles.field} style={{ maxWidth: 360, marginBottom: 22 }}>
        <label>DOT Number (optional)</label>
        <input placeholder="Enter your DOT Number to pre-fill…" onChange={(e) => setDotNumber(e.target.value)} value={dotNumber} />
      </div>
      <div className={styles.btnRow}>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={onStart}>
          Start Quote <ArrowRight size={15} />
        </button>
      </div>
      <div className={styles.heroTrust}>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>
            <ShieldCheck size={15} />
          </span>
          SSL Encrypted
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>
            <Zap size={15} />
          </span>
          Instant Results
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>
            <Timer size={15} />
          </span>
          5-Minute Form
        </div>
      </div>
      <div className={styles.callRow}>
        Prefer to speak with us? Call{" "}
        <a className={styles.phoneLink} href="tel:5555554444">
          (555) 555-4444
        </a>
      </div>
    </div>
  );
}
