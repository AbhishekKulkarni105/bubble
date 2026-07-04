"use client";

import { useState, type ReactNode } from "react";
import { ChevronUp } from "lucide-react";
import styles from "./AdvancedSearch.module.css";

interface AdvancedSearchProps {
  /** Optional node shown to the right of the header (e.g. "Quotes found: 53"). */
  aside?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** Collapsible "Advanced search" panel shared by the agency workspace tabs. */
export function AdvancedSearch({ aside, children, defaultOpen = true }: AdvancedSearchProps) {
  const [open, setOpen] = useState(defaultOpen);

  const header = (
    <button type="button" className={styles.advHead} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
      <span className={`${styles.chev} ${open ? "" : styles.chevClosed}`}>
        <ChevronUp size={20} strokeWidth={2.4} />
      </span>
      Advanced search
    </button>
  );

  return (
    <div className={`${styles.panel} ${styles.searchPanel}`}>
      {aside ? (
        <div className={styles.headerRow}>
          {header}
          {aside}
        </div>
      ) : (
        header
      )}
      {open ? <div className={styles.advBody}>{children}</div> : null}
    </div>
  );
}
