"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AdvancedSearch } from "@/features/AgenciesForm/components/AdvancedSearch";
import styles from "./VehiclesTab.module.css";

export function VehiclesTab() {
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
            <span className={styles.fieldLbl}>Make</span>
            <input className={styles.inp} placeholder="search by Make" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>VIN</span>
            <input className={styles.inp} placeholder="search by VIN" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>Value</span>
            <input className={`${styles.inp} ${styles.rangeInp}`} placeholder="value from" />
            <span className={styles.rangeSep}>to</span>
            <input className={`${styles.inp} ${styles.rangeInp}`} placeholder="value to" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>Model</span>
            <input className={styles.inp} placeholder="search by Model" />
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>Vehicle type</span>
            <select className={styles.sel} defaultValue="">
              <option value="">select Type</option>
              <option>Truck Tractor</option>
              <option>Trailer</option>
            </select>
          </div>
          <div className={styles.filterLine}>
            <span className={styles.fieldLbl}>Year</span>
            <input className={`${styles.inp} ${styles.rangeInp}`} placeholder="year from" />
            <span className={styles.rangeSep}>to</span>
            <input className={`${styles.inp} ${styles.rangeInp}`} placeholder="year to" />
          </div>
        </div>
      </AdvancedSearch>

      <div className={styles.panel}>
        <div className={styles.tblWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mark</th>
                <th>Model</th>
                <th>Year</th>
                <th>VIN</th>
                <th>Value</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  No vehicles added yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
