import Link from "next/link";
import type { QuoteRow, QuoteStatus } from "../types/dashboard.types";
import styles from "./RecentQuotes.module.css";

const STATUS_LABEL: Record<QuoteStatus, string> = {
  generated: "Generated",
  approved: "Approved",
  pending: "Pending",
  review: "Needs Review",
};

const STATUS_CLASS: Record<QuoteStatus, string> = {
  generated: styles.statusGenerated,
  approved: styles.statusApproved,
  pending: styles.statusPending,
  review: styles.statusReview,
};

function formatCurrency(amount: number) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

interface RecentQuotesProps {
  quotes: QuoteRow[];
}

export function RecentQuotes({ quotes }: RecentQuotesProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Recent Quotes</div>
          <div className={styles.subtitle}>Latest activity across all agencies</div>
        </div>
        <Link href="/quotes" className={styles.viewAll}>
          View all →
        </Link>
      </div>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Quote ID / Proposal</th>
              <th>Insured Name</th>
              <th>Agency</th>
              <th>Amount</th>
              <th>Date Created</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote) => (
              <tr key={quote.id}>
                <td>
                  <div className={styles.tdMono}>{quote.quoteNumber}</div>
                  <div className={styles.tdSub}>{quote.proposalNumber}</div>
                </td>
                <td>
                  <div className={styles.tdMain}>{quote.insuredName}</div>
                </td>
                <td>{quote.agencyName}</td>
                <td>
                  <div className={`${styles.tdAmt} ${quote.amount >= 40000 ? styles.tdAmtHi : ""}`}>
                    {formatCurrency(quote.amount)}
                  </div>
                </td>
                <td>{quote.createdAt}</td>
                <td>
                  <span className={`${styles.pill} ${STATUS_CLASS[quote.status]}`}>
                    <span className={styles.pillDot} />
                    {STATUS_LABEL[quote.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
