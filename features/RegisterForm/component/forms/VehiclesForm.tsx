"use client";

import { ArrowRight, Save } from "lucide-react";
import { VEHICLE_MAKES, type Vehicle } from "../constants";
import styles from "../GetQuoteForm.module.css";

interface VehiclesFormProps {
  vehicles: Vehicle[];
  vehicleDraft: Vehicle;
  setVehicleDraft: (fn: (p: Vehicle) => Vehicle) => void;
  saveVehicle: () => void;
  removeVehicle: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function VehiclesForm({
  vehicles,
  vehicleDraft,
  setVehicleDraft,
  saveVehicle,
  removeVehicle,
  onPrev,
  onNext,
}: VehiclesFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Vehicle Details</div>
      <div className={styles.cardSub}>Add each power unit in your fleet</div>

      {vehicles.map((v, i) => (
        <div className={styles.itemCard} key={i}>
          <div>
            <div className={styles.icTitle}>
              {v.year} {v.make || "—"} {v.type}
            </div>
            <div className={styles.icMeta}>VIN: {v.vin || "N/A"}</div>
            <span className={styles.icBadge}>{v.radius}</span>
          </div>
          <button type="button" className={styles.removeBtn} onClick={() => removeVehicle(i)}>
            ✕ Remove
          </button>
        </div>
      ))}
      {vehicles.length > 0 ? <hr className={styles.sectionSep} /> : null}

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>VIN</label>
          <input
            value={vehicleDraft.vin}
            onChange={(e) => setVehicleDraft((p) => ({ ...p, vin: e.target.value }))}
            placeholder="Vehicle Identification Number"
            maxLength={17}
          />
        </div>
        <div className={styles.field}>
          <label>
            Year <span className={styles.req}>*</span>
          </label>
          <input
            type="number"
            value={vehicleDraft.year}
            onChange={(e) => setVehicleDraft((p) => ({ ...p, year: e.target.value }))}
            placeholder="Year"
            min={1950}
            max={2027}
          />
        </div>
        <div className={styles.field}>
          <label>Operating Radius</label>
          <select
            value={vehicleDraft.radius}
            onChange={(e) => setVehicleDraft((p) => ({ ...p, radius: e.target.value }))}
          >
            <option value="long">Long Class (over 200 miles)</option>
            <option value="intermediate">Intermediate (51–200 mi.)</option>
            <option value="short">Short Class (under 50 miles)</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>
            Vehicle Type <span className={styles.req}>*</span>
          </label>
          <select value={vehicleDraft.type} onChange={(e) => setVehicleDraft((p) => ({ ...p, type: e.target.value }))}>
            <option value="truck-tractor">Truck Tractor</option>
            <option value="light-box">Light/Box Truck</option>
            <option value="trailer">Trailer</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Make</label>
          <select value={vehicleDraft.make} onChange={(e) => setVehicleDraft((p) => ({ ...p, make: e.target.value }))}>
            <option value="">Select make…</option>
            {VEHICLE_MAKES.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>Team Driver</label>
          <select value={vehicleDraft.team} onChange={(e) => setVehicleDraft((p) => ({ ...p, team: e.target.value }))}>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      <div className={styles.btnRow} style={{ marginTop: 14 }}>
        <button type="button" className={`${styles.btn} ${styles.btnTeal} ${styles.btnSm}`} onClick={saveVehicle}>
          <Save size={15} />
          Save Vehicle
        </button>
      </div>

      <div className={styles.btnRow}>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={onPrev}>
          ← Previous
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={onNext}>
          Next Step <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
