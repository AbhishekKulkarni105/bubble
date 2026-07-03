import Link from "next/link";
import type { Route } from "next";
import type { PipelineColumn } from "../types/dashboard.types";
import { KanbanBoard } from "./KanbanBoard";
import styles from "./PipelineBoard.module.css";

interface PipelineBoardProps {
  columns: PipelineColumn[];
}

export function PipelineBoard({ columns }: PipelineBoardProps) {
  const totalCards = columns.reduce((sum, col) => sum + col.cards.length, 0);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Prospect Pipeline</div>
          <div className={styles.subtitle}>{totalCards} active prospects</div>
        </div>
        <Link href={"/prospects" as Route} className={styles.viewAll}>
          View all →
        </Link>
      </div>
      <KanbanBoard columns={columns} />
    </div>
  );
}
