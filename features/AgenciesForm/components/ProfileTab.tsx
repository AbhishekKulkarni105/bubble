import { Pencil } from "lucide-react";
import styles from "./ProfileTab.module.css";
import { tiltHandlers } from "@/features/AgenciesForm/lib/cardTilt";

export function ProfileTab() {
  return (
    <div>
      <div className={styles.twoCol}>
        <div className={`${styles.panel} ${styles.profileCard}`} {...tiltHandlers}>
          <div className={styles.cardHead}>
            <h3>Address</h3>
            <button type="button" className={styles.editPencil} aria-label="Edit address">
              <Pencil />
            </button>
          </div>
        </div>
        <div className={`${styles.panel} ${styles.profileCard}`} {...tiltHandlers}>
          <div className={styles.selectLogoWrap}>
            <button type="button" className={styles.pillBtn}>
              Select logo
            </button>
          </div>
        </div>
      </div>

      <div className={styles.twoCol}>
        <div className={`${styles.panel} ${styles.profileCard}`} {...tiltHandlers}>
          <h3 style={{ marginBottom: 18 }}>Phones</h3>
          <div className={styles.pcRow}>
            <input className={`${styles.inp} ${styles.inpWarn}`} placeholder="(___) ___-____" />
            <select className={`${styles.sel} ${styles.inpDanger}`} defaultValue="">
              <option value="">Phone type</option>
              <option>Mobile</option>
            </select>
            <button type="button" className={styles.addPlus} aria-label="Add phone">
              +
            </button>
          </div>
        </div>
        <div className={`${styles.panel} ${styles.profileCard}`} {...tiltHandlers}>
          <h3 style={{ marginBottom: 18 }}>Emails</h3>
          <div className={styles.pcRow}>
            <input className={styles.inp} placeholder="email" />
            <select className={styles.sel} defaultValue="">
              <option value="">Email type</option>
              <option>Primary</option>
            </select>
            <button type="button" className={styles.addPlus} aria-label="Add email">
              +
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.metaCard}`} {...tiltHandlers}>
        <div className={styles.metaRow}>
          <div className={styles.mk}>MTM ID</div>
          <div className={styles.mv}>239</div>
        </div>
        <div className={styles.metaRow}>
          <div className={styles.mk}>Agent percent</div>
          <div className={styles.mv}>0%</div>
        </div>
        <div className={styles.metaRow}>
          <div className={styles.mk}>Retail percent</div>
          <div className={styles.mv}>0%</div>
        </div>
        <button type="button" className={styles.pillBtn}>
          Edit
        </button>
      </div>
    </div>
  );
}
