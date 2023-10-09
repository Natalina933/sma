/*user client*/
import styles from "./page.module.css";
import Link from "next/link";

const Activity = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitile}>Nos Activités</h1>
      <div className={styles.items}>
        <Link href="/activity/illustrations" className={styles.item}>
          <span className={styles.title}
          >En plein air </span>
        </Link>
        <Link href="/activity/websites" className={styles.item}>
          <span className={styles.title}
          >Aquatique</span>
        </Link>
        <Link href="/activity/application" className={styles.item}>
          <span className={styles.title}
          >Théâtre</span>
        </Link>
      </div>
    </div>
  );
};

export default Activity;
