import Link from "next/link";
import { Pencil, Search, MoreHorizontal } from "lucide-react";
import { AdvancedSearch } from "./AdvancedSearch";
import { Pager } from "./Pager";
import styles from "./QuotesTab.module.css";

interface QuoteRow {
  quoteId: string;
  proposal: string;
  insured: string;
  agency: string;
  amount: string;
  created: string;
  createdAgo: string;
  status: string;
}

const QUOTES: QuoteRow[] = [
  { quoteId: "41792150009", proposal: "PCA0000034787", insured: "Vlad test", agency: "Morpheus Ins", amount: "$22,004.05", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "41786210002", proposal: "PCA0000034786", insured: "Vlad test", agency: "Morpheus Ins", amount: "$18,109.60", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "41783660264", proposal: "PCA0000034783", insured: "Vlad test", agency: "Morpheus Ins", amount: "$48,739.12", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "41670410166", proposal: "PCA0000034751", insured: "Company Name", agency: "Morpheus Ins", amount: "$17,031.20", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "41670420063", proposal: "PCA0000034750", insured: "Company Name", agency: "Morpheus Ins", amount: "$17,031.20", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "9667001276", proposal: "PCA0000032034", insured: "Company Name", agency: "Morpheus Ins", amount: "$16,308.95", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "11193407206", proposal: "PCA0000033646", insured: "Not Logged", agency: "Morpheus Ins", amount: "$51,742.46", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "11211908662", proposal: "PCA0000033738", insured: "Del3", agency: "Morpheus Ins", amount: "$36,485.00", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "11195077356", proposal: "PCA0000033659", insured: "Vlad test", agency: "Morpheus Ins", amount: "$18,675.44", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
  { quoteId: "11196550427", proposal: "PCA0000033662", insured: "Test2287255", agency: "Morpheus Ins", amount: "$21,369.70", created: "May 28, 2026", createdAgo: "Created 38 days ago", status: "More than a year since last change" },
];

export function QuotesTab() {
  return (
    <div>
      <AdvancedSearch aside={<div className={styles.quotesFound}>Quotes found: 53</div>}>
        <div className={styles.qSearchTop}>
          <button type="button" className={styles.iconBtn} aria-label="Search quotes">
            <Pencil />
          </button>
          <div className={styles.qSearchInput}>
            <input className={styles.inp} placeholder="MTM ID, proposal # or Insured name" />
            <Search className={styles.mag} />
          </div>
          <div className={styles.qCell}>
            <label>Eff. from:</label>
            <input className={styles.inp} type="date" />
          </div>
          <div className={styles.qCell}>
            <label>Eff to:</label>
            <input className={styles.inp} type="date" />
          </div>
        </div>
        <div className={styles.qGrid}>
          <div className={styles.qCell}>
            <label>AMT from:</label>
            <input className={styles.inp} />
          </div>
          <div className={styles.qCell}>
            <label>AMT to:</label>
            <input className={styles.inp} />
          </div>
          <div className={styles.qCell}>
            <label>Exp. from:</label>
            <input className={styles.inp} type="date" />
          </div>
          <div className={styles.qCell}>
            <label>Exp. to:</label>
            <input className={styles.inp} type="date" />
          </div>
          <div className={styles.qCell}>
            <select className={styles.sel} defaultValue="All active">
              <option>All active</option>
              <option>Generated</option>
              <option>Sent to customer</option>
              <option>In progress</option>
              <option>Waiting on broker</option>
              <option>Underwriting</option>
              <option>Bound</option>
              <option>Follow up</option>
              <option>Declined by DiamondBack</option>
              <option>Declined by MTM</option>
              <option>Deleted (hidden)</option>
            </select>
          </div>
          <div className={styles.qCell}>
            <select className={styles.sel} defaultValue="All (uploaded files)">
              <option>All (uploaded files)</option>
              <option>Has Upload file</option>
              <option>No Upload Files</option>
            </select>
          </div>
          <div className={styles.qCell}>
            <label>Crtd. from:</label>
            <input className={styles.inp} type="date" />
          </div>
          <div className={styles.qCell}>
            <label>Crtd. to:</label>
            <input className={styles.inp} type="date" />
          </div>
        </div>
      </AdvancedSearch>

      <div className={styles.panel}>
        <div className={styles.tblWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>MTM Quote ID / Proposal #</th>
                <th>Insured Name</th>
                <th>Agency Name</th>
                <th>Amount Quote</th>
                <th>Date Created ↓</th>
                <th>Status</th>
                <th className={styles.right}>More</th>
              </tr>
            </thead>
            <tbody>
              {QUOTES.map((row, i) => (
                <tr key={`${row.quoteId}-${i}`}>
                  <td>
                    <Link href={`/quotes/${row.quoteId}`} className={styles.cellLink}>
                      {row.quoteId}
                    </Link>
                    <div className={styles.cellSub}>{row.proposal}</div>
                  </td>
                  <td>{row.insured}</td>
                  <td>{row.agency}</td>
                  <td>{row.amount}</td>
                  <td>
                    <div>{row.created}</div>
                    <div className={styles.cellSub}>{row.createdAgo}</div>
                  </td>
                  <td>
                    <span className={styles.cellSub}>{row.status}</span>
                  </td>
                  <td>
                    <div className={styles.moreCell}>
                      <MoreHorizontal size={18} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager info="Showing: 1 to 10 from 53" current="1" total="from 6" rowsPerPage />
      </div>
    </div>
  );
}
