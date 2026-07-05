import type { QuoteDetail } from "../types/quote";
import styles from "./SummaryTab.module.css";

export function SummaryTab({ quote }: { quote: QuoteDetail }) {
  return (
    <div className={styles.panel}>
      <div className={styles.headStrip}>
        <div>
          <div className={styles.insuredName}>{quote.insured}</div>
          <div className={styles.quoteId}>Quote ID: {quote.quoteId}</div>
          <div className={styles.meta}>
            📍 {quote.state} &nbsp;&nbsp; 🕒 {quote.submittedAgo}
          </div>
        </div>
        <div className={styles.proposal}>Proposal #: {quote.proposal}</div>
      </div>

      <div className={styles.estimateBlock}>
        <div className={styles.estimateTitle}>Your Quote Estimate</div>
        <div className={styles.estimateValue}>{quote.estimate}</div>
      </div>

      <div className={styles.fieldsGrid}>
        {quote.summaryFields.map((field) => (
          <div key={field.label} className={styles.fieldPair}>
            <div className={styles.fieldLabel}>{field.label}</div>
            <div
              className={
                field.tone === "ok"
                  ? styles.ok
                  : field.tone === "bad"
                    ? styles.bad
                    : styles.fieldValue
              }
            >
              {field.value}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.premiums}>
        {quote.premiums.map((row) => (
          <div key={row.label} className={styles.premRow}>
            <span className={styles.fieldLabel}>{row.label}</span>
            <span className={styles.fieldValue}>{row.value}</span>
          </div>
        ))}
      </div>

      <div className={styles.totalStrip}>
        <div className={styles.chipStrong}>Total Amount: &nbsp;{quote.totalAmount}</div>
        <div className={styles.chip}>Down Payment: &nbsp;{quote.downPayment}</div>
        <div className={styles.chip}>9 payments: &nbsp;{quote.payments}</div>
      </div>

      <div className={styles.noteBlue}>
        This is a scheduled auto quote. All vehicles and drivers used in the insured&apos;s
        operations must be scheduled. Detection of unscheduled vehicles or drivers will result in
        immediate policy cancellation.
      </div>

      <div className={styles.noteGrey}>
        <span className={styles.bang}>!</span>
        <span>
          PLEASE NOTE THAT Processing Commercial Auto Quotes takes an average of 1 week to
          complete. Binding may take up to a week to confirm from the request date (provided all
          required documents have been submitted - such as signed Application, Loss runs, MVRs,
          etc). Please plan accordingly. We cannot &quot;RUSH&quot; submission through. If the
          prospect needs a policy bound in less than 1 week, please consider alternative insurance
          companies.
        </span>
        <span className={styles.bang}>!</span>
      </div>
    </div>
  );
}
