"use client";

import { Send, Printer } from "lucide-react";
import { formatCurrency, type Vehicle, type Driver } from "../constants";
import styles from "../GetQuoteForm.module.css";

interface QuoteTotals {
  base: number;
  vPremium: number;
  dPremium: number;
  cargoPremium: number;
  total: number;
}

interface BreakdownFormProps {
  quote: QuoteTotals;
  companyName: string;
  state: string;
  vehicles: Vehicle[];
  drivers: Driver[];
  effectiveDate: string;
  expirationDate: string;
  liabilityLimit: string;
  submitted: boolean;
  onSubmit: () => void;
  onEdit: () => void;
}

export default function BreakdownForm({
  quote,
  companyName,
  state,
  vehicles,
  drivers,
  effectiveDate,
  expirationDate,
  liabilityLimit,
  submitted,
  onSubmit,
  onEdit,
}: BreakdownFormProps) {
  return (
    <div className={styles.card}>
      <div className={styles.resultHero}>
        <div className={styles.resultIcon}>🎉</div>
        <div className={styles.resultTitle}>Your Quote is Ready!</div>
        <p style={{ fontSize: 13, color: "var(--vayga-text-3)", marginTop: 4 }}>Based on your provided information</p>
        <div className={styles.priceAmount}>{formatCurrency(quote.total)}</div>
        <div className={styles.priceLabel}>Estimated Annual Premium</div>
      </div>

      <table className={styles.breakdownTbl}>
        <thead>
          <tr>
            <th>Coverage</th>
            <th>Details</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Covered Autos Liability</td>
            <td style={{ color: "var(--vayga-text-3)" }}>Limit: {liabilityLimit || "—"}</td>
            <td>{formatCurrency(quote.base)}</td>
          </tr>
          <tr>
            <td>Vehicle Premiums</td>
            <td style={{ color: "var(--vayga-text-3)" }}>{vehicles.length} vehicle(s)</td>
            <td>{formatCurrency(quote.vPremium)}</td>
          </tr>
          <tr>
            <td>Driver Premiums</td>
            <td style={{ color: "var(--vayga-text-3)" }}>{drivers.length} driver(s)</td>
            <td>{formatCurrency(quote.dPremium)}</td>
          </tr>
          {quote.cargoPremium ? (
            <tr>
              <td>Cargo Coverage</td>
              <td style={{ color: "var(--vayga-text-3)" }}>Selected</td>
              <td>{formatCurrency(quote.cargoPremium)}</td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <div className={styles.totalRow}>
        <span className={styles.totalLabel}>Total Annual Premium</span>
        <span className={styles.totalValue}>{formatCurrency(quote.total)}</span>
      </div>

      <div className={styles.summaryBox}>
        <div className={styles.summaryBoxTitle}>Quote Summary</div>
        <div className={styles.summaryGrid}>
          {[
            ["Company", companyName || "—"],
            ["State", state || "—"],
            ["Vehicles", `${vehicles.length} unit(s)`],
            ["Drivers", `${drivers.length} driver(s)`],
            ["Effective", effectiveDate || "—"],
            ["Expiration", expirationDate || "—"],
          ].map(([k, v]) => (
            <div className={styles.summaryItem} key={k}>
              <div className={styles.summaryKey}>{k}</div>
              <div className={styles.summaryValue}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.btnRow} style={{ marginTop: 24 }}>
        <button type="button" className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`} onClick={onEdit}>
          ← Edit Quote
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={onSubmit}>
          Submit &amp; Get Policy <Send size={15} />
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnTeal} ${styles.btnSm}`} onClick={() => window.print()}>
          <Printer size={14} /> Print
        </button>
      </div>
      {submitted ? (
        <p style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: "var(--vayga-green)" }}>
          Quote submitted! An agent from Vayga will contact you soon.
        </p>
      ) : null}
    </div>
  );
}
