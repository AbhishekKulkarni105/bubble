import type { PolicyDetail } from "../types/policy";
import styles from "./InsuredTab.module.css";

export function InsuredTab({ policy }: { policy: PolicyDetail }) {
  const { insured } = policy;

  const details = [
    { label: "DOT #", value: insured.dot },
    { label: "State", value: insured.state },
    { label: "Line of Business", value: insured.lineOfBusiness },
    { label: "Owner", value: insured.owner },
  ];

  return (
    <div className={styles.twoCol}>
      <div className={styles.panel}>
        <div className={styles.blockTitle}>Insured</div>
        <div className={styles.lines}>
          {insured.name}
          <br />
          {insured.state}
          <br />
          {insured.phone}
          <br />
          {insured.email}
        </div>
      </div>
      <div className={styles.panel}>
        <div className={styles.blockTitle}>Details</div>
        {details.map((d, i) => (
          <div key={d.label} className={`${styles.row} ${i === details.length - 1 ? styles.last : ""}`}>
            <span className={styles.label}>{d.label}</span>
            <span className={styles.value}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
