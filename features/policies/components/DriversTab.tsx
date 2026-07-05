import { Plus } from "lucide-react";
import type { PolicyDetail } from "../types/policy";
import { PolicyMetaBar } from "./PolicyMetaBar";
import styles from "./DriversTab.module.css";

export function DriversTab({ policy }: { policy: PolicyDetail }) {
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
            <label className={styles.label}>Prefix</label>
            <select className={styles.sel} defaultValue="">
              <option value="">Prefix</option>
              <option>Mr</option>
              <option>Ms</option>
              <option>Mrs</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>First Name</label>
            <input className={styles.inp} placeholder="First Name" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Middle...</label>
            <input className={styles.inp} placeholder="Middle Name" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Last Name</label>
            <input className={styles.inp} placeholder="Last Name" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Suffix</label>
            <select className={styles.sel} defaultValue="">
              <option value="">Suffix</option>
              <option>Jr</option>
              <option>Sr</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>DoB</label>
            <input className={styles.inp} type="date" aria-label="Date of birth" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>SSN</label>
            <input className={styles.inp} placeholder="SSN" />
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.blockTitle}>License</div>
          <div className={styles.formRow}>
            <label className={styles.label}>State</label>
            <select className={styles.sel} defaultValue="">
              <option value="">State</option>
              <option>AL</option>
              <option>AZ</option>
              <option>CO</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Issued</label>
            <input className={styles.inp} type="date" aria-label="License issued" />
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Number</label>
            <input className={styles.inp} placeholder="#" />
          </div>
          <div className={styles.formRow}>
            <label className={`${styles.label} ${styles.required}`}>Class *</label>
            <select className={styles.sel} defaultValue="">
              <option value="">Class</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Valid</label>
            <select className={styles.sel} defaultValue="No">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
          <div className={styles.formRow}>
            <label className={styles.label}>Have Violations</label>
            <select className={styles.sel} defaultValue="No">
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Phone :</div>
          <div className={styles.contactRow}>
            <input className={styles.inp} placeholder="Phone" />
            <select className={styles.sel} defaultValue="Insured primary">
              <option>Insured primary</option>
            </select>
            <button type="button" className={styles.addBtn} aria-label="Add phone">
              <Plus />
            </button>
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Email :</div>
          <div className={styles.contactRow}>
            <input className={styles.inp} placeholder="email" />
            <select className={styles.sel} defaultValue="Insured primary">
              <option>Insured primary</option>
            </select>
            <button type="button" className={styles.addBtn} aria-label="Add email">
              <Plus />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.sectionTitle}>List driver to :</div>
      <div className={styles.twoCol}>
        <div className={styles.panel}>
          <div className={styles.blockTitle}>Select Policy</div>
          <div className={styles.selectPolicyRow}>
            <span className={styles.strong}>{policy.policyNo}</span>
            <span>{policy.effDate}</span>
            <span>{policy.expireDate}</span>
            <input type="checkbox" aria-label={`List driver to ${policy.policyNo}`} />
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.emptyNote}>No active quote</div>
        </div>
      </div>
    </div>
  );
}
