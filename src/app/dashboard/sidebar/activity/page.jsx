import pool from "@/utils/db";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/button/Button";

export default async function Category({ params }) {
  const category = params.category;

  // Récupère toutes les activités de la catégorie depuis MySQL
  const [rows] = await pool.execute(
    "SELECT * FROM act_activities WHERE category = ?",
    [category]
  );

  if (!rows || rows.length === 0) {
    return <div className={styles.notFound}>Aucune activité trouvée pour cette catégorie.</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/activity" className={styles.backButton}>
        <button>Retour aux activités</button>
      </Link>
      <h1 className={styles.catTitle}>{category}</h1>
      <div className={styles.activityList}>
        {rows.map((activity) => (
          <div className={styles.item} key={activity.id}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img}
                width={400}
                height={300}
                src={activity.img.startsWith("/") ? activity.img : "/" + activity.img}
                alt={`Image de ${activity.title}`}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{activity.title}</h2>
              <p className={styles.desc}>{activity.description}</p>
              <p className={styles.date}>{activity.date}</p>
              <Button text="S'inscrire" url="#" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
