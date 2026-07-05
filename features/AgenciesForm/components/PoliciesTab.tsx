import Link from "next/link";
import { AdvancedSearch } from "./AdvancedSearch";
import { Pager } from "./Pager";
import styles from "./PoliciesTab.module.css";

interface PolicyRow {
  policyNo: string;
  eff: string;
  expire: string;
  lob: string;
  premium: string;
  insured: string;
  created: string;
}

const POLICIES: PolicyRow[] = [
  { policyNo: "41792150009", eff: "5/26/2026", expire: "5/26/2027", lob: "Comm Auto*", premium: "$22,004.05", insured: "Vlad test", created: "5/28/2026" },
  { policyNo: "41786210002", eff: "8/15/2025", expire: "8/15/2026", lob: "Comm Auto*", premium: "$18,109.60", insured: "Vlad test", created: "5/28/2026" },
  { policyNo: "41783660264", eff: "5/24/2026", expire: "5/24/2027", lob: "Comm Auto*", premium: "$48,739.12", insured: "Vlad test", created: "5/28/2026" },
  { policyNo: "41670410166", eff: "8/15/2024", expire: "8/15/2025", lob: "Comm Auto*", premium: "$17,031.20", insured: "Company Name", created: "5/28/2026" },
  { policyNo: "41670420063", eff: "8/15/2024", expire: "8/15/2025", lob: "Comm Auto*", premium: "$17,031.20", insured: "Company Name", created: "5/28/2026" },
  { policyNo: "9667001276", eff: "8/15/2024", expire: "8/15/2025", lob: "Comm Auto*", premium: "$16,308.95", insured: "Company Name", created: "5/28/2026" },
  { policyNo: "11193407206", eff: "9/10/2025", expire: "9/10/2026", lob: "Comm Auto*", premium: "$51,742.46", insured: "Not Logged", created: "5/28/2026" },
  { policyNo: "11211908662", eff: "12/01/2025", expire: "12/01/2026", lob: "Comm Auto*", premium: "$36,485.00", insured: "Del3", created: "5/28/2026" },
  { policyNo: "11195077356", eff: "9/12/2025", expire: "9/12/2026", lob: "Comm Auto*", premium: "$18,675.44", insured: "Vlad test", created: "5/28/2026" },
  { policyNo: "11196550427", eff: "9/16/2025", expire: "9/16/2026", lob: "Comm Auto*", premium: "$21,369.70", insured: "Test2287255", created: "5/28/2026" },
];

export function PoliciesTab() {
  return (
    <div>
      <AdvancedSearch>
        <div className={styles.asGrid}>
          <div className={styles.asCol}>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Policy #</span>
              <input className={styles.inp} placeholder="policy number" />
            </div>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Insured</span>
              <input className={styles.inp} placeholder="search by names" />
            </div>
          </div>
          <div className={styles.dateCol}>
            {(["Eff. Date", "Expire Date", "Bind Date"] as const).map((label) => (
              <div key={label} className={styles.dateField}>
                <span className={styles.fieldLbl}>{label}</span>
                <div className={styles.dateRange}>
                  <label className={styles.dateSub}>
                    <span>From</span>
                    <input className={styles.dateInp} type="date" aria-label={`${label} from`} />
                  </label>
                  <label className={styles.dateSub}>
                    <span>To</span>
                    <input className={styles.dateInp} type="date" aria-label={`${label} to`} />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.asCol}>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Status</span>
              <select className={styles.sel} defaultValue="">
                <option value="">Choose an option…</option>
                <option>Active</option>
                <option>Renew</option>
                <option>Expire</option>
                <option>Canceled</option>
              </select>
            </div>
            <div className={styles.asLine}>
              <span className={styles.fieldLbl}>Line of Business</span>
              <select className={styles.sel} defaultValue="">
                <option value="">Choose an option…</option>
                <option>Comm Auto</option>
                <option>Personal Auto</option>
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
                <th>Policy #</th>
                <th>Eff. Date</th>
                <th>Expire Date</th>
                <th>LoB</th>
                <th>Total Premium</th>
                <th>Insured Names</th>
                <th>Created ↓</th>
              </tr>
            </thead>
            <tbody>
              {POLICIES.map((row, i) => (
                <tr key={`${row.policyNo}-${i}`}>
                  <td>
                    <Link href={`/policies/${row.policyNo}`} className={styles.cellLink}>
                      {row.policyNo}
                    </Link>
                  </td>
                  <td>{row.eff}</td>
                  <td>{row.expire}</td>
                  <td>{row.lob}</td>
                  <td>{row.premium}</td>
                  <td>{row.insured}</td>
                  <td>{row.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager info="Showing: 1 to 10 from 30" current="1" total="from 3" rowsPerPage />
      </div>
    </div>
  );
}
