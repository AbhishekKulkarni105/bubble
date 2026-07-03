import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import styles from "@/components/layout/app-shell.module.css";

/** Authenticated app shell — replaces Bubble `index` page + sidebar/header reusables. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
