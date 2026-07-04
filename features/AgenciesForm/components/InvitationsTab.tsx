import { Pencil } from "lucide-react";
import { AdvancedSearch } from "./AdvancedSearch";
import { Pager } from "./Pager";
import styles from "./InvitationsTab.module.css";

interface InvitationRow {
  sender: string;
  sentTo: string;
  role: string;
  created: string;
}

const INVITATIONS: InvitationRow[] = [
  { sender: "Goro Gor", sentTo: "boyanov81gg+21@gmail.com", role: "Insured", created: "5/15/25" },
  { sender: "Goro Gor", sentTo: "boyanov81gg+22@gmail.com", role: "Agent", created: "5/15/25" },
  { sender: "Goro Gor", sentTo: "boyanov81gg+23@gmail.com", role: "Insured", created: "5/15/25" },
  { sender: "Gororast Jivovlyak", sentTo: "test3@test.test", role: "Insured", created: "7/11/25" },
];

export function InvitationsTab() {
  return (
    <div>
      <AdvancedSearch>
        <div className={styles.fieldRow}>
          <div className={styles.fieldLbl}>Member name</div>
          <input className={`${styles.inp} ${styles.inpWide}`} placeholder="search by member name" />
          <button type="button" className={styles.iconBtn} aria-label="Search invitations">
            <Pencil />
          </button>
        </div>
      </AdvancedSearch>

      <div className={styles.panel}>
        <div className={styles.tblWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Sent To</th>
                <th>Role</th>
                <th>Created</th>
                <th className={styles.right} />
              </tr>
            </thead>
            <tbody>
              {INVITATIONS.map((row, i) => (
                <tr key={`${row.sentTo}-${i}`}>
                  <td>
                    <span className={styles.cellStrong}>{row.sender}</span>
                  </td>
                  <td>{row.sentTo}</td>
                  <td>
                    <span className={styles.pillRole}>{row.role}</span>
                  </td>
                  <td>{row.created}</td>
                  <td>
                    <div className={styles.pencilCell}>
                      <button type="button" className={styles.editPencil} aria-label="Edit invitation">
                        <Pencil />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager info="Showing: 1 to 4 from 4" current="1" total="from 1" rowsPerPage />
      </div>
    </div>
  );
}
