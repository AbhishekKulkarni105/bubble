import Link from "next/link";
import { UserPlus, Download, Search, SlidersHorizontal, Pencil } from "lucide-react";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import headerStyles from "@/features/dashboard/components/DashboardHeader.module.css";
import styles from "@/components/ui/data-table.module.css";

type UserStatus = "active" | "inactive";
type UserRole = "Master Admin" | "Agency Admin" | "Agent";

const ROLE_CLASS: Record<UserRole, string> = {
  "Master Admin": styles.pillGreen,
  "Agency Admin": styles.pillTeal,
  Agent: styles.pillAccent,
};

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agency: string;
  lastLogin: string;
  lastLoginRelative: string;
  quotes: string;
  status: UserStatus;
  avatarFrom: string;
  avatarTo: string;
}

const USERS: UserRow[] = [
  { id: "1", name: "Vladimir Vladimirov", email: "vladimir@vayga.com", role: "Master Admin", agency: "All Agencies", lastLogin: "Jul 2, 2026", lastLoginRelative: "Just now", quotes: "—", status: "active", avatarFrom: "#14375C", avatarTo: "#1C4E80" },
  { id: "2", name: "Abhishek Kulkarni", email: "abhishek@morpheus.com", role: "Agency Admin", agency: "Morpheus Ins", lastLogin: "Jul 2, 2026", lastLoginRelative: "2 hours ago", quotes: "47", status: "active", avatarFrom: "#06B6D4", avatarTo: "#0284C7" },
  { id: "3", name: "Sara Reyes", email: "sara@primeuw.com", role: "Agent", agency: "Prime Underwriting", lastLogin: "Jul 1, 2026", lastLoginRelative: "Yesterday", quotes: "119", status: "active", avatarFrom: "#22C55E", avatarTo: "#16A34A" },
  { id: "4", name: "Diego Martinez", email: "diego@primeuw.com", role: "Agent", agency: "Prime Underwriting", lastLogin: "Jun 29, 2026", lastLoginRelative: "3 days ago", quotes: "84", status: "active", avatarFrom: "#8B5CF6", avatarTo: "#7C3AED" },
  { id: "5", name: "Jordan Lee", email: "jordan@apexgroup.com", role: "Agent", agency: "Apex General Group", lastLogin: "Jun 15, 2026", lastLoginRelative: "17 days ago", quotes: "31", status: "inactive", avatarFrom: "#94A3B8", avatarTo: "#64748B" },
];

export function UsersPage() {
  return (
    <div>
      <DashboardHeader
        title="Users"
        subtitle="23 platform users · 3 roles"
        actions={
          <Link href="/invite-user" className={headerStyles.btnPrimary}>
            <UserPlus />
            Invite User
          </Link>
        }
      />

      <div className={styles.panel}>
        <div className={styles.header}>
          <div>
            <div className={styles.title}>All Users</div>
            <div className={styles.subtitle}>23 accounts across all agencies</div>
          </div>
          <div className={styles.controls}>
            <div className={styles.search}>
              <Search />
              <input placeholder="Search users…" aria-label="Search users" />
            </div>
            <button type="button" className={styles.fltBtn}>
              <SlidersHorizontal />
              Filter by role
            </button>
          </div>
        </div>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Agency</th>
                <th>Last Login</th>
                <th>Quotes</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {USERS.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.rowFlex}>
                      <div
                        className={styles.avatar}
                        style={{ background: `linear-gradient(135deg, ${user.avatarFrom}, ${user.avatarTo})` }}
                      >
                        {user.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <div className={styles.tdMain}>{user.name}</div>
                        <div className={styles.tdSub}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.pill} ${ROLE_CLASS[user.role]}`}>
                      <span className={styles.pillDot} />
                      {user.role}
                    </span>
                  </td>
                  <td>{user.agency}</td>
                  <td>
                    <div>{user.lastLogin}</div>
                    <div className={styles.tdSub}>{user.lastLoginRelative}</div>
                  </td>
                  <td>
                    <div className={styles.tdMono}>{user.quotes}</div>
                  </td>
                  <td>
                    <span className={`${styles.pill} ${user.status === "active" ? styles.pillGreen : styles.pillMuted}`}>
                      <span className={styles.pillDot} />
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button type="button" className={styles.actBtn}>
                      <Pencil />
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.foot}>
          <div className={styles.footInfo}>Showing 5 of 23 users</div>
          <div className={styles.pagi}>
            <div className={styles.pg}>‹</div>
            <div className={`${styles.pg} ${styles.pgOn}`}>1</div>
            <div className={styles.pg}>2</div>
            <div className={styles.pg}>3</div>
            <div className={styles.pg}>›</div>
          </div>
        </div>
      </div>
    </div>
  );
}
