"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Activity = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Exemple d'appel API Next.js (à adapter selon ton endpoint)
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Nos Activités</h1>
      <hr className={styles.sectionDividerOrange} />
      <div className={styles.categories}>
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/activity/${cat.slug}`} className={styles.categoryCard}>
            <div className={styles.imageWrapper}>
              <Image
                src={cat.img}
                alt={cat.alt}
                fill
                style={{ objectFit: "cover" }}
                className={styles.image}
                sizes="(max-width: 600px) 100vw, 300px"
              />
            </div>
            <span className={styles.categoryTitle}>{cat.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activity;
