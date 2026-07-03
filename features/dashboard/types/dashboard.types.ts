import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export type TrendDirection = "up" | "down" | "flat";

export interface KPIStat {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: TrendDirection;
  barPercent: number;
  accent: "gold" | "teal" | "green" | "purple" | "red";
  icon: LucideIcon;
}

export type QuoteStatus = "generated" | "approved" | "pending" | "review";

export interface QuoteRow {
  id: string;
  quoteNumber: string;
  proposalNumber: string;
  insuredName: string;
  agencyName: string;
  amount: number;
  createdAt: string;
  status: QuoteStatus;
}

export type PolicyStatus = "active" | "expiring" | "cancelled";

export interface PolicyRow {
  id: string;
  insuredName: string;
  policyNumber: string;
  coverageLabel: string;
  progressPercent: number;
  expiresAt: string;
  daysLeftLabel: string;
  amount: number;
  status: PolicyStatus;
}

export interface AgencySummary {
  id: string;
  name: string;
  typeLabel: string;
  quotes: number;
  policies: number;
  revenueLabel: string;
  active: boolean;
  initials: string;
  accentFrom: string;
  accentTo: string;
}

export interface PipelineCard {
  id: string;
  name: string;
  subtitle: string;
  estValueLabel: string;
  dateLabel: string;
}

export interface PipelineColumn {
  id: string;
  title: string;
  accent: "teal" | "gold" | "purple";
  cards: PipelineCard[];
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  read: boolean;
}
