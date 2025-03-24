"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

const activities = [
  {
    href: "/activity/EnPleinAir",
    src: "/images/excursion.jpg",
    alt: "En plein air",
    title: "En plein air",
  },
  {
    href: "/activity/Aquatique",
    src: "/images/aquagym.jpg",
    alt: "Aquatique",
    title: "Aquatique",
  },
  {
    href: "/activity/Theatre",
    src: "/images/Matineestheatrales.jpg",
    alt: "Théâtre",
    title: "Théâtre",
  },
];

const Activity = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Nos Activités</h1>
      <div className={styles.items}>
        {activities.map((activity) => (
          <Link key={activity.title} href={activity.href} className={styles.item}>
            <div className={styles.imageWrapper}>
              <Image src={activity.src} alt={activity.alt} layout="fill" objectFit="cover" className={styles.image} />
            </div>
            <span className={styles.title}>{activity.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activity;