import type { QuoteDetail } from "../types/quote";
import styles from "./DriversTab.module.css";

export function DriversTab({ quote }: { quote: QuoteDetail }) {
  return (
    <div className={styles.panel}>
      <div className={styles.filterStrip}>
        <div className={styles.filterCell}>
          <label>License class shown in result:</label>
          <select className={styles.sel} defaultValue="All">
            <option>All</option>
            <option>Commercial</option>
            <option>Regular</option>
          </select>
        </div>
        <div className={styles.filterCell}>
          <label>Driver&apos;s violations:</label>
          <select className={styles.sel} defaultValue="All">
            <option>All</option>
            <option>With violations</option>
            <option>Without violations</option>
          </select>
        </div>
        <div className={styles.filterCell}>
          <label>Sort drivers by:</label>
          <select className={styles.sel} defaultValue="Default (date created)">
            <option>Default (date created)</option>
            <option>Age</option>
            <option>Name</option>
          </select>
        </div>
      </div>

      <div className={styles.listHead}>List of Drivers ({quote.drivers.length})</div>

      {quote.drivers.map((driver, i) => (
        <div key={`${driver.licenseNumber}-${i}`} className={styles.driverCard}>
          <div className={styles.cardIndex}>{i + 1}.</div>
          <div className={styles.kvGrid}>
            <b>Driver Names</b>
            <span>{driver.names}</span>
            <b>Age</b>
            <span>{driver.age}</span>
            <b>State</b>
            <span>{driver.state}</span>
            <b>License Number</b>
            <span>{driver.licenseNumber}</span>
            <b>License Class</b>
            <span>{driver.licenseClass}</span>
            <b>License issue date</b>
            <span>{driver.licenseIssueDate}</span>
            <b>Number of violations</b>
            <span>{driver.violations}</span>
            <b>Owner</b>
            <span>{driver.owner}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
