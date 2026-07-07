import type { PolicyDetail } from "../types/policy";
import { PolicyMetaBar } from "./PolicyMetaBar";
import styles from "./VehiclesTab.module.css";

export function VehiclesTab({ policy }: { policy: PolicyDetail }) {
  return (
    <div>
      <PolicyMetaBar policy={policy} />

      <div className={styles.actions}>
        <button type="button" className={styles.btnGhost}>
          Save
        </button>
        <button type="button" className={styles.btnGhost}>
          Close
        </button>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.formRow}>
            <label className={styles.label}>Make</label>
            <select className={styles.sel} defaultValue="">
              <option value="">Select make</option>
              <option>Custom</option>
              <option>Caterpillar</option>
              <option>Freightliner</option>
              <option>GMC</option>
              <option>Hino</option>
              <option>International</option>
              <option>Kenworth</option>
              <option>Mack</option>
              <option>Oshkosh Truck</option>
              <option>Peterbilt</option>
              <option>Volvo</option>
              <option>Western Star</option>
              <option>Nikola</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Model</label>
            <input className={styles.inp} placeholder="Model" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Vin</label>
            <input className={styles.inp} placeholder="VIN" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Year</label>
            <input className={styles.inp} placeholder="Year" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Type</label>
            <select className={styles.sel} defaultValue="Truck Tractor">
              <option>Truck Tractor</option>
              <option>Trailer</option>
              <option>Light/Box Truck</option>
            </select>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.formRow}>
            <label className={styles.label}>Value</label>
            <input className={styles.inp} placeholder="Value" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Deductible</label>
            <select className={styles.sel} defaultValue="">
              <option value="">Deductible</option>
              <option>$1,000</option>
              <option>$2,500</option>
              <option>$5,000</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Team driver</label>
            <select className={styles.sel} defaultValue="No">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Physical Damage</label>
            <select className={styles.sel} defaultValue="No">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={`${styles.label} ${styles.required}`}>Operating Radius</label>
            <select className={styles.sel} defaultValue="">
              <option value="">Radius</option>
              <option>Long Class (over 200 miles)</option>
              <option>Intermediate Class (51 to 200 mi.)</option>
              <option>Short Class (under 50 miles)</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>List vehicle to :</div>
      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Select Policy</div>
          <div className={styles.selectPolicyRow}>
            <span className={styles.strong}>{policy.policyNo}</span>
            <span>{policy.effDate}</span>
            <span>{policy.expireDate}</span>
            <input type="checkbox" aria-label={`List vehicle to ${policy.policyNo}`} />
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.emptyNote}>No active quote</div>
        </div>
      </div>
    </div>
  );
}
