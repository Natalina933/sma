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
  <Link key={cat.id} href={`/activity/${cat.id}`} className={styles.categoryCard}>
    <div className={styles.imageWrapper}>
      <Image
        src={cat.img ? cat.img : `/images/categories/default.jpg`}
        alt={cat.alt || `Image de la catégorie ${cat.title}`}
        width={300}
        height={200}
      />
    </div>
    <h3>{cat.title}</h3>
  </Link>
))}
      </div>
    </div>
  );
};

export default Activity;
