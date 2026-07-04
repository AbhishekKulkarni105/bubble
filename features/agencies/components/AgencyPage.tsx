"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Download,
  ChevronUp,
  Pencil,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import tableStyles from "@/components/ui/data-table.module.css";
import styles from "./AgencyPage.module.css";

interface AgencyRow {
  id: string;
  name: string;
  role: string;
  created: string;
}

const AGENCIES: AgencyRow[] = [
  { id: "1", name: "AAA Insurance Group", role: "Master Admin", created: "9/18/25" },
  { id: "2", name: "Acme Underwriters LLC", role: "Master Admin", created: "9/18/25" },
  { id: "3", name: "Advance Insurance Partners", role: "Master Admin", created: "9/18/25" },
  { id: "4", name: "Aegis Risk Advisors", role: "Master Admin", created: "9/18/25" },
  { id: "5", name: "Affinity Insurance Co", role: "Master Admin", created: "9/18/25" },
  { id: "6", name: "All Capital Insurance Inc", role: "Master Admin", created: "9/18/25" },
  { id: "7", name: "Allegiance Insurance Services LLC", role: "Master Admin", created: "9/18/25" },
  { id: "8", name: "Alliant Insurance Services", role: "Master Admin", created: "9/18/25" },
  { id: "9", name: "Allines Associates Inc", role: "Master Admin", created: "9/18/25" },
  { id: "10", name: "All-Star Insurance Inc", role: "Master Admin", created: "9/18/25" },
  { id: "11", name: "Allsure Insurance Brokerage Inc", role: "Master Admin", created: "9/18/25" },
  { id: "12", name: "Ally Insurance Brokers of Omaha", role: "Master Admin", created: "9/18/25" },
  { id: "13", name: "Alpha Direct Agency LLC", role: "Master Admin", created: "9/18/25" },
  { id: "14", name: "Alpha Insurance Agency Inc", role: "Master Admin", created: "9/18/25" },
  { id: "15", name: "Alpha Insurance Services LLC", role: "Master Admin", created: "9/18/25" },
  { id: "16", name: "Altamont Insurance Group, Llc", role: "Master Admin", created: "9/18/25" },
  { id: "17", name: "Alvarado Risk Services, LLC", role: "Master Admin", created: "9/18/25" },
  { id: "18", name: "Amac Insurance Center", role: "Master Admin", created: "9/18/25" },
  { id: "19", name: "Ambrose Inyang Insurance Agency", role: "Master Admin", created: "9/18/25" },
  { id: "20", name: "AMC Agents LLC", role: "Master Admin", created: "9/18/25" },
  { id: "21", name: "American Shield Insurance", role: "Master Admin", created: "9/18/25" },
  { id: "22", name: "Anchor Bay Underwriters", role: "Master Admin", created: "9/18/25" },
  { id: "23", name: "Apex General Group", role: "Master Admin", created: "9/18/25" },
  { id: "24", name: "Ardent Insurance Solutions", role: "Master Admin", created: "9/18/25" },
  { id: "25", name: "Ascend Risk Partners", role: "Master Admin", created: "9/18/25" },
  { id: "26", name: "Atlas Coverage Group", role: "Master Admin", created: "9/18/25" },
  { id: "27", name: "Avalon Insurance Brokers", role: "Master Admin", created: "9/18/25" },
  { id: "28", name: "Axiom Assurance LLC", role: "Master Admin", created: "9/18/25" },
];

const PAGE_SIZE = 14;

export function AgencyPage() {
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Record<string, boolean>>({ "7": true });

  const filtered = useMemo(() => {
    const query = nameFilter.trim().toLowerCase();
    if (!query) return AGENCIES;
    return AGENCIES.filter((a) => a.name.toLowerCase().includes(query));
  }, [nameFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const toggleSelected = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const goTo = (next: number) => setPage(Math.min(Math.max(1, next), totalPages));

  return (
    <div>
      <DashboardHeader
        title="Agencies"
        subtitle={`${filtered.length} agencies · All regions`}
        actions={
          <>
            <button type="button" className={tableStyles.fltBtn}>
              <Download />
              Export
            </button>
            <button type="button" className={tableStyles.expBtn}>
              <Plus />
              Add Agency
            </button>
          </>
        }
      />

      <div className={styles.advanced}>
        <button
          type="button"
          className={`${styles.advancedToggle} ${advancedOpen ? styles.advancedToggleOpen : ""}`}
          onClick={() => setAdvancedOpen((open) => !open)}
          aria-expanded={advancedOpen}
        >
          <ChevronUp />
          Advanced search
        </button>
        {advancedOpen ? (
          <div className={styles.advancedBody}>
            <label className={styles.fieldLabel} htmlFor="agency-name-filter">
              Agency name
            </label>
            <input
              id="agency-name-filter"
              className={styles.fieldInput}
              placeholder="Search by agency name…"
              value={nameFilter}
              onChange={(event) => {
                setNameFilter(event.target.value);
                setPage(1);
              }}
            />
            <button type="button" className={styles.iconBtn} aria-label="Edit search">
              <Pencil />
            </button>
          </div>
        ) : null}
      </div>

      <div className={tableStyles.panel}>
        <div className={tableStyles.scroll}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Agency Name</th>
                <th>My Role</th>
                <th>Created</th>
                <th className={styles.checkboxCell} aria-label="Select" />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((agency) => {
                const isSelected = Boolean(selected[agency.id]);
                return (
                  <tr key={agency.id} className={`${styles.row} ${isSelected ? styles.rowActive : ""}`}>
                    <td>
                      <button type="button" className={styles.agencyName}>
                        {agency.name}
                      </button>
                    </td>
                    <td>
                      <span className={`${tableStyles.pill} ${tableStyles.pillMuted} ${styles.roleBadge}`}>
                        <span className={tableStyles.pillDot} />
                        {agency.role}
                      </span>
                    </td>
                    <td>{agency.created}</td>
                    <td className={styles.checkboxCell}>
                      <button
                        type="button"
                        className={`${styles.selectToggle} ${isSelected ? styles.selectToggleOn : ""}`}
                        onClick={() => toggleSelected(agency.id)}
                        aria-label={isSelected ? "Deselect agency" : "Select agency"}
                        aria-pressed={isSelected}
                      >
                        {isSelected ? <Check /> : <X />}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "32px 16px", color: "var(--vayga-text-3)" }}>
                    No agencies match “{nameFilter}”.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className={tableStyles.foot}>
          <div className={tableStyles.footInfo}>
            Showing {pageRows.length} of {filtered.length} agencies
          </div>
          <div className={tableStyles.pagi}>
            <button type="button" className={tableStyles.pg} onClick={() => goTo(1)} aria-label="First page">
              <ChevronsLeft size={14} />
            </button>
            <button type="button" className={tableStyles.pg} onClick={() => goTo(currentPage - 1)} aria-label="Previous page">
              <ChevronLeft size={14} />
            </button>
            <span className={`${tableStyles.pg} ${tableStyles.pgOn}`}>{currentPage}</span>
            <span className={tableStyles.footInfo} style={{ alignSelf: "center", padding: "0 4px" }}>
              from {totalPages}
            </span>
            <button type="button" className={tableStyles.pg} onClick={() => goTo(currentPage + 1)} aria-label="Next page">
              <ChevronRight size={14} />
            </button>
            <button type="button" className={tableStyles.pg} onClick={() => goTo(totalPages)} aria-label="Last page">
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
