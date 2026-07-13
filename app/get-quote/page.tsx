import Image from "next/image";
import Link from "next/link";
import GetQuoteForm from "@/features/RegisterForm/component/GetQuoteForm";
import styles from "@/features/RegisterForm/component/GetQuotePage.module.css";

/** Public "Get a Quote" page — no registration/login required. */
export default function GetQuotePage() {
  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <Image
          src="/images/vayga-logo.png"
          alt="VAYGA Insurance Partners"
          width={152}
          height={40}
          className={styles.logoImg}
          priority
        />
        <Link href="/login" className={styles.backLink}>
          ← Back to log in
        </Link>
      </div>
      <div className={styles.container}>
        <GetQuoteForm />
      </div>
    </div>
  );
}
