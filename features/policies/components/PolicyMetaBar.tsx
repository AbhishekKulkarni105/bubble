import type { PolicyDetail } from "../types/policy";
import styles from "./PolicyMetaBar.module.css";

/** Two-card strip (Policy # / LoB · Insured / Email) shown atop several policy tabs. */
export function PolicyMetaBar({ policy }: { policy: PolicyDetail }) {
  return (
    <div className={styles.metaBar}>
      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.key}>Policy #</span>
          <span className={styles.strong}>{policy.policyNo}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>LoB</span>
          <span>{policy.lob}</span>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.row}>
          <span className={styles.key}>Insured</span>
          <span className={styles.strong}>{policy.insured.name}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Email</span>
          <span>{policy.insured.email}</span>
        </div>
      </div>
    </div>
  );
}
