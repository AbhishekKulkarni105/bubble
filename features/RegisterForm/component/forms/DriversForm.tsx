"use client";

import { ArrowRight, Plus } from "lucide-react";
import { US_STATES, VIOLATION_OPTIONS, type Driver } from "../constants";
import styles from "../GetQuoteForm.module.css";

interface DriversFormProps {
  drivers: Driver[];
  driverDraft: Driver;
  setDriverDraft: (fn: (p: Driver) => Driver) => void;
  resetDriverDraft: () => void;
  violationPick: string;
  addViolationToDraft: (value: string) => void;
  removeViolationFromDraft: (i: number) => void;
  saveDriver: () => void;
  removeDriver: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function DriversForm({
  drivers,
  driverDraft,
  setDriverDraft,
  resetDriverDraft,
  violationPick,
  addViolationToDraft,
  removeViolationFromDraft,
  saveDriver,
  removeDriver,
  onPrev,
  onNext,
}: DriversFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Driver Info</div>
      <div className={styles.cardSub}>Add all licensed drivers operating your vehicles</div>

      {drivers.map((d, i) => (
        <div className={styles.itemCard} key={i}>
          <div>
            <div className={styles.icTitle}>
              {d.first} {d.last}
            </div>
            <div className={styles.icMeta}>
              License: {d.license || "N/A"} · Class: {d.licenseClass} · {d.violations.length} violation(s)
            </div>
          </div>
          <button type="button" className={styles.removeBtn} onClick={() => removeDriver(i)}>
            ✕ Remove
          </button>
        </div>
      ))}
      {drivers.length > 0 ? <hr className={styles.sectionSep} /> : null}

      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>
            First Name <span className={styles.req}>*</span>
          </label>
          <input value={driverDraft.first} onChange={(e) => setDriverDraft((p) => ({ ...p, first: e.target.value }))} placeholder="First Name" />
        </div>
        <div className={styles.field}>
          <label>
            Last Name <span className={styles.req}>*</span>
          </label>
          <input value={driverDraft.last} onChange={(e) => setDriverDraft((p) => ({ ...p, last: e.target.value }))} placeholder="Last Name" />
        </div>
        <div className={styles.field}>
          <label>Date of Birth</label>
          <input type="date" value={driverDraft.dob} onChange={(e) => setDriverDraft((p) => ({ ...p, dob: e.target.value }))} />
        </div>
        <div className={styles.field}>
          <label>State</label>
          <select value={driverDraft.state} onChange={(e) => setDriverDraft((p) => ({ ...p, state: e.target.value }))}>
            <option value="">Select State…</option>
            {US_STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label>License Number</label>
          <input value={driverDraft.license} onChange={(e) => setDriverDraft((p) => ({ ...p, license: e.target.value }))} placeholder="License Number" />
        </div>
        <div className={styles.field}>
          <label>License Class</label>
          <select value={driverDraft.licenseClass} onChange={(e) => setDriverDraft((p) => ({ ...p, licenseClass: e.target.value }))}>
            <option value="commercial">Commercial</option>
            <option value="cdl-a">CDL-A</option>
            <option value="cdl-b">CDL-B</option>
            <option value="cdl-c">CDL-C</option>
            <option value="non-cdl">Non-CDL</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>License Issue Date</label>
          <input type="date" value={driverDraft.licenseDate} onChange={(e) => setDriverDraft((p) => ({ ...p, licenseDate: e.target.value }))} />
        </div>
        <div className={styles.field}>
          <label>Valid License</label>
          <select value={driverDraft.valid} onChange={(e) => setDriverDraft((p) => ({ ...p, valid: e.target.value }))}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>

      <hr className={styles.sectionSep} style={{ margin: "20px 0 16px" }} />
      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--vayga-text-3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>
        Violations in the past 3 years
      </p>
      <div className={styles.field} style={{ maxWidth: 340 }}>
        <label>Add Violation</label>
        <select value={violationPick} onChange={(e) => addViolationToDraft(e.target.value)}>
          <option value="">Select violation…</option>
          {VIOLATION_OPTIONS.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
      </div>
      <div style={{ maxWidth: 500, marginTop: 4 }}>
        {driverDraft.violations.map((v, i) => (
          <span className={styles.violationPill} key={`${v}-${i}`}>
            ⚠ {v}
            <button type="button" className={styles.violationRemove} onClick={() => removeViolationFromDraft(i)}>
              ✕
            </button>
          </span>
        ))}
      </div>

      <div className={styles.btnRow} style={{ marginTop: 18, justifyContent: "flex-start" }}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnOutline} ${styles.btnSm}`}
          onClick={resetDriverDraft}
        >
          Clear Driver
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnTeal} ${styles.btnSm}`} onClick={saveDriver}>
          <Plus size={15} />
          Add Driver
        </button>
      </div>

      <div className={styles.btnRow}>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={onPrev}>
          ← Previous
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={onNext}>
          Generate Quote <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
