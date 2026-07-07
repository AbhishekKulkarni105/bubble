"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdvancedSearch } from "@/features/AgenciesForm/components/AdvancedSearch";
import styles from "./DriversTab.module.css";

export function DriversTab() {
  const [mode, setMode] = useState<"list" | "form">("list");

  if (mode === "form") {
    return (
      <div>
        <div className={styles.actions}>
          <button type="button" className={styles.btnPrimary} onClick={() => setMode("list")}>
            Save
          </button>
          <button type="button" className={styles.btnGhost} onClick={() => setMode("list")}>
            Close
          </button>
        </div>

        <div className={styles.twoCol}>
          <div className={styles.panel}>
            <div className={styles.formRow}>
              <label className={styles.label}>Prefix</label>
              <select className={styles.sel} defaultValue="">
                <option value="">Prefix</option>
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
                <option>Miss</option>
                <option>Dr.</option>
                <option>Prof.</option>
                <option>Rev.</option>
                <option>Hon.</option>
                <option>Capt.</option>
                <option>Lt.</option>
                <option>Cmdr.</option>
                <option>Col.</option>
                <option>Maj.</option>
                <option>Gen.</option>
                <option>Sgt.</option>
                <option>Chief</option>
                <option>Adm.</option>
                <option>Judge</option>
                <option>Sir</option>
                <option>Dame</option>
                <option>Officer</option>
              </select>
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>First Name</label>
              <input className={styles.inp} placeholder="First Name" />
            </div>
            <div className={styles.formRow}>
              <label className={styles.label}>Middle Name</label>
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
                <option>Jr.</option>
                <option>Sr.</option>
                <option>II</option>
                <option>III</option>
                <option>IV</option>
                <option>V</option>
                <option>Ph.D.</option>
                <option>M.D.</option>
                <option>Esq.</option>
                <option>CPA</option>
                <option>DDS</option>
                <option>Ret.</option>
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
                <option>All</option>
                <option>Commercial</option>
                <option>Non Commercial</option>
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
                <option>Office</option>
                <option>Fax</option>
                <option>Home</option>
                <option>Mobile/Cell</option>
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
                <option>Office</option>
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
            <div className={styles.emptyNote}>No active policy</div>
          </div>
          <div className={styles.panel}>
            <div className={styles.emptyNote}>No active quote</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.listTop}>
        <button type="button" className={styles.btnPrimary} onClick={() => setMode("form")}>
          <Plus />
          Add
        </button>
      </div>

      <AdvancedSearch label="Filters">
        <div className={styles.filterGrid}>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>Driver</span>
            <input className={styles.inp} placeholder="search by Names" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>License #</span>
            <input className={styles.inp} placeholder="search by License number" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>Date of Birth</span>
            <input className={styles.inp} type="date" aria-label="Date of birth" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>SSN</span>
            <input className={styles.inp} placeholder="search by SSN" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>License State</span>
            <select className={styles.sel} defaultValue="">
              <option value="">select License state</option>
              <option>AL</option>
              <option>AZ</option>
              <option>CO</option>
            </select>
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>License date</span>
            <input className={styles.inp} type="date" aria-label="License date" />
          </div>
        </div>
      </AdvancedSearch>

      <div className={styles.panel}>
        <div className={styles.tblWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Date of Birth</th>
                <th>DL Number</th>
                <th>DL State</th>
                <th>DL Date</th>
                <th>SSN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className={styles.emptyCell}>
                  No drivers added yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
