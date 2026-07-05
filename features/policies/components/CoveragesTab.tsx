import type { PolicyDetail } from "../types/policy";
import { PolicyMetaBar } from "./PolicyMetaBar";
import styles from "./CoveragesTab.module.css";

export function CoveragesTab({ policy }: { policy: PolicyDetail }) {
  return (
    <div>
      <PolicyMetaBar policy={policy} />

      <div className={styles.grid}>
        {policy.coverages.map((coverage) => (
          <div key={coverage.title} className={styles.panel}>
            <div className={styles.head}>{coverage.title}</div>
            <div className={styles.body}>
              <span className={styles.label}>{coverage.label}</span>
              <span className={styles.value}>{coverage.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
