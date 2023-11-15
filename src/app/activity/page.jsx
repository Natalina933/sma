"use client"
import styles from "./page.module.css";
import Link from "next/link";


//devra etre plus modulable

const Activity = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitile}>Nos Activités</h1>
      <div className={styles.items}>
        <Link href="/activity/EnPleinAir" className={styles.item}>
          <span className={styles.title}
          >En plein air </span>
        </Link>
        <Link href="/activity/Aquatique" className={styles.item}>
          <span className={styles.title}
          >Aquatique</span>
        </Link>
        <Link href="/activity/Theatre" className={styles.item}>
          <span className={styles.title}
          >Théâtre</span>
        </Link>
      </div>
    </div>
  );
};

export default Activity;
