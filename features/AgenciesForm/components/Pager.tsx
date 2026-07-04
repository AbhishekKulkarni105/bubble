import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import styles from "./Pager.module.css";

interface PagerProps {
  /** Active page label, e.g. "1" or "2". */
  current: string;
  /** Total label, e.g. "from 28" or "3". */
  total: string;
  /** Both page markers rendered solid (matches the agencies-list pager). */
  solidTotal?: boolean;
  /** "Showing: 1 to 10 from 30" — when present, the spread layout with rows-per-page is used. */
  info?: string;
  rowsPerPage?: boolean;
}

function Buttons({ current, total, solidTotal }: Pick<PagerProps, "current" | "total" | "solidTotal">) {
  return (
    <div className={styles.pgGroup}>
      <button type="button" className={styles.pgBtn} aria-label="First page">
        <ChevronsLeft />
      </button>
      <button type="button" className={styles.pgBtn} aria-label="Previous page">
        <ChevronLeft />
      </button>
      <span className={`${styles.pgBtn} ${styles.solid}`}>{current}</span>
      <span className={`${styles.pgBtn} ${solidTotal ? styles.solid : ""}`}>{total}</span>
      <button type="button" className={styles.pgBtn} aria-label="Next page">
        <ChevronRight />
      </button>
      <button type="button" className={styles.pgBtn} aria-label="Last page">
        <ChevronsRight />
      </button>
    </div>
  );
}

/** Pagination — centered by default, or a spread layout with row-count + rows-per-page. */
export function Pager({ current, total, solidTotal, info, rowsPerPage }: PagerProps) {
  if (info) {
    return (
      <div className={styles.pagerSpread}>
        <div className={styles.pagerInfo}>{info}</div>
        <Buttons current={current} total={total} solidTotal={solidTotal} />
        {rowsPerPage ? (
          <div className={styles.rowsSel}>
            <select defaultValue="10" aria-label="Rows per page">
              <option>10</option>
              <option>25</option>
            </select>
            rows per page
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.pager}>
      <Buttons current={current} total={total} solidTotal={solidTotal} />
    </div>
  );
}
