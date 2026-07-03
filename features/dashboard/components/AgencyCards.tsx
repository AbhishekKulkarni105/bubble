import Link from "next/link";
import type { AgencySummary } from "../types/dashboard.types";
import styles from "./AgencyCards.module.css";

interface AgencyCardsProps {
  agencies: AgencySummary[];
}

export function AgencyCards({ agencies }: AgencyCardsProps) {
  return (
    <div className={styles.grid}>
      {agencies.map((agency) => (
        <Link href="/agency" className={styles.card} key={agency.id}>
          <div
            className={styles.logo}
            style={{ background: `linear-gradient(135deg, ${agency.accentFrom}, ${agency.accentTo})` }}
          >
            {agency.initials}
          </div>
          <div className={styles.name}>{agency.name}</div>
          <div className={styles.type}>{agency.typeLabel}</div>
          <div className={styles.stats}>
            <div>
              <div className={styles.statN}>{agency.quotes}</div>
              <div className={styles.statL}>Quotes</div>
            </div>
            <div>
              <div className={styles.statN}>{agency.policies}</div>
              <div className={styles.statL}>Policies</div>
            </div>
            <div>
              <div className={styles.statN}>{agency.revenueLabel}</div>
              <div className={styles.statL}>Revenue</div>
            </div>
          </div>
          <div className={styles.footer}>
            <span className={`${styles.pill} ${agency.active ? styles.pillActive : styles.pillInactive}`}>
              <span className={styles.pillDot} />
              {agency.active ? "Active" : "Inactive"}
            </span>
            <span className={styles.viewLink}>View Agency →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
