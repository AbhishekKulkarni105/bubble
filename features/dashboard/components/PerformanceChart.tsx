"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  type ChartData,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./PerformanceChart.module.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface PerformanceChartProps {
  generated: number[];
  approved: number[];
}

const CHART_OPTIONS: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 900 },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "rgba(255,255,255,0.97)",
      borderColor: "rgba(12,30,51,0.10)",
      borderWidth: 1,
      titleColor: "#33475B",
      bodyColor: "#0C1E33",
      padding: 10,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(12,30,51,0.06)" },
      ticks: { color: "#647688", font: { size: 10 } },
    },
    y: {
      grid: { color: "rgba(12,30,51,0.06)" },
      ticks: { color: "#647688", font: { size: 10 } },
      min: 0,
    },
  },
};

export function PerformanceChart({ generated, approved }: PerformanceChartProps) {
  const data: ChartData<"line"> = {
    labels: MONTHS,
    datasets: [
      {
        label: "Generated",
        data: generated,
        borderColor: "#ffdd33",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#ffdd33",
        tension: 0.4,
        fill: true,
        backgroundColor: (ctx: ScriptableContext<"line">) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(255,212,0,0.22)");
          gradient.addColorStop(1, "rgba(255,212,0,0)");
          return gradient;
        },
      },
      {
        label: "Approved",
        data: approved,
        borderColor: "#22C55E",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#22C55E",
        tension: 0.4,
        fill: true,
        backgroundColor: (ctx: ScriptableContext<"line">) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220);
          gradient.addColorStop(0, "rgba(34,197,94,0.12)");
          gradient.addColorStop(1, "rgba(34,197,94,0)");
          return gradient;
        },
      },
    ],
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Quote Volume Trend</div>
          <div className={styles.subtitle}>Monthly · 2026</div>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#ffdd33" }} />
            Generated
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: "#22C55E" }} />
            Approved
          </span>
        </div>
      </div>
      <div className={styles.chartWrap}>
        <Line data={data} options={CHART_OPTIONS} />
      </div>
    </div>
  );
}
