import type { PolicyDetail } from "../types/policy";
import styles from "./SummaryTab.module.css";

export function SummaryTab({ policy }: { policy: PolicyDetail }) {
  const { insured, producer, money } = policy;

  return (
    <div>
      <div className={styles.twoCol}>
        <div className={`${styles.panel} ${styles.lobPanel}`}>
          <div className={styles.lobName}>{policy.lob}</div>
          <div className={styles.muted}>{policy.carrierName}</div>
        </div>
        <div className={styles.panel}>
          <div className={styles.muted}>Expire Date</div>
          <div className={styles.dateValue}>{policy.expireDate}</div>
          <div className={styles.muted}>Bind Date</div>
        </div>
      </div>

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
          <div className={styles.blockTitle}>Producer</div>
          <div className={styles.producerGrid}>
            <div className={styles.lines}>
              {producer.agency}
              <br />
              {producer.address}
              <br />
              {producer.phone}
            </div>
            <div className={styles.lines}>
              {producer.contactName}
              <br />
              {producer.contactEmail}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.twoCol}>
        <div className={`${styles.panel} ${styles.moneyPanel}`}>
          <span className={styles.moneyKey}>Total Amount :</span>
          <b>{money.totalAmount}</b>
          <span className={styles.moneyKey}>Premium :</span>
          <b>{money.premium}</b>
        </div>
        <div className={`${styles.panel} ${styles.moneyPanel}`}>
          <span className={styles.moneyKey}>Taxes :</span>
          <b>{money.taxes}</b>
          <span className={styles.moneyKey}>Fees :</span>
          <b>{money.fees}</b>
        </div>
      </div>
    </div>
  );
}
