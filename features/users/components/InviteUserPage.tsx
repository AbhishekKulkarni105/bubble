"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import styles from "@/components/ui/form-card.module.css";

const ROLES = [
  { id: "agent", name: "Agent", desc: "Can create and manage quotes, view insureds and policies within their agency." },
  { id: "agency-admin", name: "Agency Admin", desc: "Full access to their agency including users, quotes, policies, and reporting." },
  { id: "master-admin", name: "Master Admin", desc: "Cross-agency access. Can manage all agencies, users, and platform settings." },
];

export function InviteUserPage() {
  const [role, setRole] = useState("agent");
  const [sent, setSent] = useState(false);

  return (
    <div>
      <DashboardHeader title="Invite User" subtitle="Send an invitation to join the Vayga platform" live={false} />

      <div className={styles.card}>
        <div className={styles.title}>User Details</div>
        <div className={styles.subtitle}>
          Fill in the new user&apos;s information below. They&apos;ll receive an email invitation with a secure sign-up link.
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label>First Name *</label>
            <input placeholder="First name" />
          </div>
          <div className={styles.field}>
            <label>Last Name *</label>
            <input placeholder="Last name" />
          </div>
          <div className={styles.field}>
            <label>Email Address *</label>
            <input type="email" placeholder="user@agency.com" />
          </div>
          <div className={styles.field}>
            <label>Phone Number</label>
            <input type="tel" placeholder="(555) 000-0000" />
          </div>
          <div className={styles.field}>
            <label>Agency</label>
            <select defaultValue="Prime Underwriting Agency Inc">
              <option>Prime Underwriting Agency Inc</option>
              <option>Morpheus Ins</option>
              <option>Apex General Group</option>
              <option>TransShield Risk</option>
              <option>Highway Partners LLC</option>
              <option>NorthLane Insurance</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Job Title</label>
            <input placeholder="e.g. Senior Agent" />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Assign Role</div>
          <div className={styles.roleGrid}>
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                className={`${styles.roleCard} ${role === r.id ? styles.roleCardSelected : ""}`}
                onClick={() => setRole(r.id)}
              >
                <div className={styles.roleName}>{r.name}</div>
                <div className={styles.roleDesc}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionLabel}>Additional Options</div>
          <div className={styles.checkboxRow}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" defaultChecked />
              Send welcome email with onboarding guide
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              Require 2-factor authentication on first login
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" />
              Copy account settings from existing user
            </label>
          </div>
        </div>

        <div className={styles.btnRow}>
          <button type="button" className={styles.btnSubmit} onClick={() => setSent(true)}>
            Send Invitation
          </button>
          <Link href="/users" className={styles.btnCancel}>
            Cancel
          </Link>
          {sent ? (
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--vayga-green)" }}>
              Invitation sent successfully!
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
