import { AdvancedSearch } from "./AdvancedSearch";
import { Pager } from "./Pager";
import styles from "./InsuredsTab.module.css";

interface EntityRow {
  company: string;
  dot: string;
  state: string;
  phone: string;
  email: string;
  owner: string;
  created: string;
}

const INSUREDS: EntityRow[] = [
  { company: "TTL 7", dot: "1122", state: "Colorado", phone: "(773) 556-6777", email: "torr+t1@gmail.com", owner: "Torr Thunderson", created: "6/05/2026" },
  { company: "TTL 7", dot: "1122", state: "Colorado", phone: "(773) 556-6777", email: "torr+t1@gmail.com", owner: "Torr Thunderson", created: "6/04/2026" },
  { company: "TTL 7", dot: "1122", state: "Colorado", phone: "(773) 556-6777", email: "torr+t1@gmail.com", owner: "Torr Thunderson", created: "6/04/2026" },
  { company: "Vlad test", dot: "1234567890", state: "Arkansas", phone: "(773) 556-6777", email: "dobrinski+t1@gmail.com", owner: "Dobri test", created: "5/28/2026" },
  { company: "Vlad test", dot: "1234567890", state: "Colorado", phone: "(773) 556-6777", email: "dobrinski+t1@gmail.com", owner: "Dobri test", created: "5/28/2026" },
  { company: "Vlad test", dot: "", state: "Alabama", phone: "(773) 556-6777", email: "dobrinski+t1@gmail.com", owner: "Dobri test", created: "5/28/2026" },
  { company: "Vlad test", dot: "1234567890", state: "Colorado", phone: "(773) 556-6777", email: "dobrinski+t1@gmail.com", owner: "Dobri test", created: "5/28/2026" },
  { company: "Company Name", dot: "2020", state: "Oregon", phone: "(999) 999-9999", email: "iliyan.marinov@nowcerts.com", owner: "Iliyan Marinov", created: "5/28/2026" },
  { company: "Company Name", dot: "2020", state: "Oregon", phone: "(999) 999-9999", email: "iliyan.marinov@nowcerts.com", owner: "Iliyan Marinov", created: "5/28/2026" },
  { company: "Company Name", dot: "2020", state: "Oregon", phone: "(999) 999-9999", email: "iliyan.marinov@nowcerts.com", owner: "Iliyan Marinov", created: "5/28/2026" },
];

export function InsuredsTab() {
  return (
    <div>
      <AdvancedSearch>
        <div className={styles.asGrid}>
          <div className={styles.asLine}>
            <span className={styles.fieldLbl}>Insured</span>
            <input className={styles.inp} placeholder="search by names / DBA" />
          </div>
          <div className={styles.asCol}>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Status</span>
              <select className={styles.sel} defaultValue="">
                <option value="">Choose an option…</option>
                <option>Active</option>
              </select>
            </div>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Line of Business</span>
              <select className={styles.sel} defaultValue="">
                <option value="">Choose an option…</option>
                <option>Cargo</option>
              </select>
            </div>
          </div>
        </div>
      </AdvancedSearch>

      <div className={styles.panel}>
        <div className={styles.tblWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>DOT #</th>
                <th>State</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Owner</th>
                <th>Created ↓</th>
              </tr>
            </thead>
            <tbody>
              {INSUREDS.map((row, i) => (
                <tr key={`${row.company}-${i}`}>
                  <td>
                    <span className={styles.cellStrong}>{row.company}</span>
                  </td>
                  <td>{row.dot}</td>
                  <td>{row.state}</td>
                  <td>{row.phone}</td>
                  <td>{row.email}</td>
                  <td>{row.owner}</td>
                  <td>{row.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.panel}>
        <Pager info="Showing: 1 to 10 from 31" current="1" total="from 4" rowsPerPage />
      </div>
    </div>
  );
}
