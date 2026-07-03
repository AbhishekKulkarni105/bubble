"use client";

import type { PipelineColumn } from "../types/dashboard.types";
import styles from "./KanbanBoard.module.css";

const ACCENT_CLASS: Record<PipelineColumn["accent"], string> = {
  teal: styles.accentTeal,
  gold: styles.accentGold,
  purple: styles.accentPurple,
};

interface KanbanBoardProps {
  columns: PipelineColumn[];
  onCardClick?: (cardId: string) => void;
}

export function KanbanBoard({ columns, onCardClick }: KanbanBoardProps) {
  return (
    <div className={styles.board}>
      {columns.map((column) => (
        <div className={styles.column} key={column.id}>
          <div className={styles.columnHeader}>
            <div className={styles.columnTitle}>{column.title}</div>
            <span className={`${styles.count} ${ACCENT_CLASS[column.accent]}`}>
              {column.cards.length}
            </span>
          </div>

          {column.cards.length === 0 ? (
            <div className={styles.empty}>No items</div>
          ) : (
            column.cards.map((card) => (
              <div
                className={styles.card}
                key={card.id}
                role={onCardClick ? "button" : undefined}
                tabIndex={onCardClick ? 0 : undefined}
                onClick={() => onCardClick?.(card.id)}
              >
                <div className={styles.cardName}>{card.name}</div>
                <div className={styles.cardSubtitle}>{card.subtitle}</div>
                <div className={styles.cardMeta}>
                  <span className={styles.cardValue}>{card.estValueLabel}</span>
                  <span className={styles.cardDate}>{card.dateLabel}</span>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
}
