import { Download } from "lucide-react";
import type { QuoteDetail } from "../types/quote";
import styles from "./JsonTab.module.css";

export function JsonTab({ quote }: { quote: QuoteDetail }) {
  return (
    <div className={styles.panel}>
      <div className={styles.metaGrid}>
        <div>
          <b>Company:</b> {quote.insured}
        </div>
        <div>
          <b>MTM ID:</b> {quote.quoteId}
        </div>
        <div>
          <b>Date created:</b> {quote.json.dateCreated}
        </div>
        <div>
          <b>Proposal #:</b> {quote.proposal}
        </div>
        <div>
          <b>State:</b> {quote.state}
        </div>
        <div>
          <b>Quote ID:</b> {quote.json.internalQuoteId}
        </div>
      </div>

      <div className={styles.codeBox}>
        <pre className={styles.code}>{quote.json.payload}</pre>
        <button type="button" className={styles.downloadBtn} title="Download JSON">
          <Download />
        </button>
      </div>
    </div>
  );
}
