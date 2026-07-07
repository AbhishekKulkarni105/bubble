import { Shield } from "lucide-react";
import { AdvancedSearch } from "@/features/AgenciesForm/components/AdvancedSearch";
import styles from "./PoliciesTab.module.css";

export function PoliciesTab() {
  return (
    <div>
      <AdvancedSearch>
        <div className={styles.asGrid}>
          <div className={styles.asLine}>
            <span className={styles.fieldLbl}>Policy #</span>
            <input className={styles.inp} placeholder="policy number" />
          </div>
          <div className={styles.asCol}>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Eff. Date</span>
              <input className={styles.inp} type="date" aria-label="Effective date" />
            </div>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Expire Date</span>
              <input className={styles.inp} type="date" aria-label="Expire date" />
            </div>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Bind Date</span>
              <input className={styles.inp} type="date" aria-label="Bind date" />
            </div>
          </div>
          <div className={styles.asCol}>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Status</span>
              <select className={styles.sel} defaultValue="">
                <option value="">Choose an option…</option>
                <option>Active</option>
                <option>Expired</option>
                <option>Renew</option>
                <option>Canceled</option>
              </select>
            </div>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Line of Business</span>
              <select className={styles.sel} defaultValue="">
                <option value="">Choose an option…</option>
                <option>Comm Auto</option>
                <option>Personal Auot</option>
              </select>
            </div>
          </div>
        </div>
      </AdvancedSearch>

      <div className={`${styles.panel} ${styles.emptyPanel}`}>
        <span className={styles.emptyIcon}>
          <Shield />
        </span>
        No Policies
      </div>
    </div>
  );
}
