import type { PolicyDetail } from "../types/policy";
import { PolicyMetaBar } from "./PolicyMetaBar";
import styles from "./EndorsementsTab.module.css";

export function EndorsementsTab({ policy }: { policy: PolicyDetail }) {
  const { money } = policy;

  const leftFigures = [
    { label: "Total Amount", value: money.totalAmount },
    { label: "Premium", value: money.premium },
    { label: "Installment Amount", value: money.installmentAmount },
  ];
  const rightFigures = [
    { label: "Taxes", value: money.taxes },
    { label: "Fees", value: money.fees },
    { label: "Commission", value: money.commission },
  ];

  return (
    <div>
      <PolicyMetaBar policy={policy} />

      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.figureRow}>
            {leftFigures.map((f) => (
              <div key={f.label} className={styles.figure}>
                <div className={styles.figureLabel}>{f.label}</div>
                <div className={styles.figureValue}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.figureRow}>
            {rightFigures.map((f) => (
              <div key={f.label} className={styles.figure}>
                <div className={styles.figureLabel}>{f.label}</div>
                <div className={styles.figureValue}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.tablePanel}>
        <div className={styles.tblWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Endorsement</th>
                <th>Total Amount</th>
                <th>Installment Date</th>
                <th>Installment Amount</th>
                <th>Agency Commission</th>
              </tr>
            </thead>
            <tbody>
              {policy.endorsements.map((e) => (
                <tr key={e.name}>
                  <td>{e.name}</td>
                  <td>{e.totalAmount}</td>
                  <td>{e.installmentDate}</td>
                  <td>{e.installmentAmount}</td>
                  <td>{e.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.breakdownGrid}>
        {policy.breakdowns.map((bd) => (
          <div key={bd.title} className={styles.panel}>
            <div className={styles.breakdownHead}>
              <span>{bd.title} :</span>
              <span>{bd.total}</span>
            </div>
            {bd.rows.map((row, i) => (
              <div
                key={row.label}
                className={`${styles.breakdownRow} ${i === bd.rows.length - 1 ? styles.last : ""}`}
              >
                <span className={styles.breakdownLabel}>{row.label}</span>
                <span className={styles.breakdownValue}>{row.value}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
