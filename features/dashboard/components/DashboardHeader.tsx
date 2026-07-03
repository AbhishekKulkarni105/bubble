import type { ReactNode } from "react";
import styles from "./DashboardHeader.module.css";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  live?: boolean;
  actions?: ReactNode;
}

export function DashboardHeader({ title, subtitle, live = true, actions }: DashboardHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.titleBlock}>
        <div className={styles.title}>{title}</div>
        {subtitle ? (
          <div className={styles.subtitle}>
            {live ? <span className={styles.liveDot} /> : null}
            {subtitle}
          </div>
        ) : null}
      </div>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>
  );
}
