import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { KPIStat, TrendDirection } from "../types/dashboard.types";
import styles from "./KPICards.module.css";

const ACCENT_COLORS: Record<KPIStat["accent"], { icon: string; iconBg: string; bar: string }> = {
  gold: { icon: "#ffdd33", iconBg: "rgba(255,212,0,0.16)", bar: "linear-gradient(90deg,#ffd400,#ffdd33)" },
  teal: { icon: "#06B6D4", iconBg: "rgba(6,182,212,0.14)", bar: "linear-gradient(90deg,#0284C7,#06B6D4)" },
  green: { icon: "#22C55E", iconBg: "rgba(34,197,94,0.14)", bar: "linear-gradient(90deg,#16A34A,#22C55E)" },
  purple: { icon: "#8B5CF6", iconBg: "rgba(139,92,246,0.14)", bar: "linear-gradient(90deg,#7C3AED,#8B5CF6)" },
  red: { icon: "#EF4444", iconBg: "rgba(239,68,68,0.14)", bar: "linear-gradient(90deg,#B91C1C,#EF4444)" },
};

const TREND_CLASS: Record<TrendDirection, string> = {
  up: styles.trendUp,
  down: styles.trendDown,
  flat: styles.trendFlat,
};

const TREND_ICON: Record<TrendDirection, typeof ArrowUp> = {
  up: ArrowUp,
  down: ArrowDown,
  flat: Minus,
};

interface KPICardsProps {
  stats: KPIStat[];
}

export function KPICards({ stats }: KPICardsProps) {
  return (
    <div className={styles.grid}>
      {stats.map((stat) => {
        const colors = ACCENT_COLORS[stat.accent];
        const Icon = stat.icon;
        const TrendIcon = TREND_ICON[stat.trend];
        return (
          <div className={styles.card} key={stat.id}>
            <div className={styles.icon} style={{ background: colors.iconBg }}>
              <Icon color={colors.icon} strokeWidth={2} />
            </div>
            <div className={styles.label}>{stat.label}</div>
            <div className={styles.value} style={{ color: colors.icon }}>
              {stat.value}
            </div>
            <div className={`${styles.delta} ${TREND_CLASS[stat.trend]}`}>
              <TrendIcon strokeWidth={3} />
              {stat.delta}
            </div>
            <div className={styles.bar}>
              <div
                className={styles.barFill}
                style={{ width: `${stat.barPercent}%`, background: colors.bar }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
