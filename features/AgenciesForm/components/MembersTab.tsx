import { Pencil } from "lucide-react";
import { AdvancedSearch } from "./AdvancedSearch";
import { Pager } from "./Pager";
import styles from "./MembersTab.module.css";

interface MemberRow {
  name: string;
  email: string;
  role: string;
  created: string;
}

const MEMBERS: MemberRow[] = [
  { name: "Abhishek Kulkarni", email: "abhishek.kulkarni@arieotech.com", role: "Insured", created: "6/19/26" },
  { name: "Goro Gor", email: "boyanov81gg+2@gmail.com", role: "Agent", created: "4/10/25" },
  { name: "Goro Gor", email: "boyanov81gg+2@gmail.com", role: "Agent", created: "5/15/25" },
  { name: "John Doe", email: "milen.marinov@nowcerts.com", role: "Agency Admin", created: "4/10/25" },
];

export function MembersTab() {
  return (
    <div>
      <AdvancedSearch>
        <div className={styles.fieldRow}>
          <div className={styles.fieldLbl}>Member name</div>
          <input className={`${styles.inp} ${styles.inpWide}`} placeholder="search by member name" />
          <button type="button" className={styles.iconBtn} aria-label="Search members">
            <Pencil />
          </button>
        </div>
      </AdvancedSearch>

      <div className={styles.panel}>
        <div className={styles.tblWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th className={styles.right} />
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((row, i) => (
                <tr key={`${row.email}-${i}`}>
                  <td>
                    <span className={styles.cellStrong}>{row.name}</span>
                  </td>
                  <td>{row.email}</td>
                  <td>
                    <span className={styles.pillRole}>{row.role}</span>
                  </td>
                  <td>{row.created}</td>
                  <td>
                    <div className={styles.pencilCell}>
                      <button type="button" className={styles.editPencil} aria-label="Edit member">
                        <Pencil />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager current="1" total="from 1" solidTotal />
      </div>
    </div>
  );
}
