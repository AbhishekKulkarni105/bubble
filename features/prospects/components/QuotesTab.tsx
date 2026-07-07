import { FileText, Search } from "lucide-react";
import { AdvancedSearch } from "@/features/AgenciesForm/components/AdvancedSearch";
import styles from "./QuotesTab.module.css";

export function QuotesTab() {
  return (
    <div>
      <AdvancedSearch aside={<span className={styles.quotesFound}>Quotes found: 0</span>}>
        <div className={styles.searchTop}>
          <div className={styles.searchInput}>
            <input className={styles.inp} placeholder="MTM ID, proposal # or Insured name" />
            <Search className={styles.mag} />
          </div>
        </div>
        <div className={styles.qGrid}>
          <div className={styles.qCell}>
            <label>AMT from</label>
            <input className={styles.inp} placeholder="0" />
          </div>
          <div className={styles.qCell}>
            <label>AMT to</label>
            <input className={styles.inp} placeholder="0" />
          </div>
          <div className={styles.qCell}>
            <label>Eff. from</label>
            <input className={styles.inp} type="date" aria-label="Effective from" />
          </div>
          <div className={styles.qCell}>
            <label>Eff. to</label>
            <input className={styles.inp} type="date" aria-label="Effective to" />
          </div>
          <div className={styles.qCell}>
            <label>Status</label>
            <select className={styles.sel} defaultValue="All active">
              <option>All active</option>
              <option>Generated</option>
              <option>Sent to customer</option>
              <option>In progress</option>
              <option>Waiting on broker</option>
              <option>Underwriting</option>
              <option>Bound</option>
              <option>Follow up</option>
              <option>Declined by DiamondBack</option>
              <option>Declined by MTM</option>
              <option>Deleted (hidden)</option>
            </select>
          </div>
          <div className={styles.qCell}>
            <label>Files</label>
            <select className={styles.sel} defaultValue="All (uploaded files)">
              <option>All (uploaded files)</option>
              <option>Has Upload Files</option>
              <option>No Upload Files</option>
            </select>
          </div>
          <div className={styles.qCell}>
            <label>Exp. from</label>
            <input className={styles.inp} type="date" aria-label="Expiration from" />
          </div>
          <div className={styles.qCell}>
            <label>Exp. to</label>
            <input className={styles.inp} type="date" aria-label="Expiration to" />
          </div>
          <div className={styles.qCell}>
            <label>Crtd. from</label>
            <input className={styles.inp} type="date" aria-label="Created from" />
          </div>
          <div className={styles.qCell}>
            <label>Crtd. to</label>
            <input className={styles.inp} type="date" aria-label="Created to" />
          </div>
        </div>
      </AdvancedSearch>

      <div className={`${styles.panel} ${styles.emptyPanel}`}>
        <span className={styles.emptyIcon}>
          <FileText />
        </span>
        No Quotes
      </div>
    </div>
  );
}
