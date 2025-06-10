import styles from "./page.module.css";
import Image from "next/legacy/image";
import Button from "@/components/common/button/Button";
import Link from "next/link";
import { headers } from "next/headers";

async function getActivities(category) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/activities/${category}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

async function getCategoryName(categoryId) {
  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/categories/${categoryId}`, { cache: "no-store" });
  if (!res.ok) return categoryId;
  const data = await res.json();
  return data.title || categoryId;
}

const Category = async ({ params }) => {
  const categoryId = params.category;
  const data = await getActivities(categoryId);
  const categoryName = await getCategoryName(categoryId);

  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <Link href="/activity" className={styles.backButton}>
          <button>Retour aux activités</button>
        </Link>
        <h2>Aucune activité trouvée pour la catégorie &quot;{categoryName}&quot;</h2>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/activity" className={styles.backButton}>
        <button>Retour aux activités</button>
      </Link>
      <h1 className={styles.catTitle}>
        {categoryName}
        <span className={styles.count}>
          &nbsp;({data.length} activité{data.length > 1 ? "s" : ""} proposée{data.length > 1 ? "s" : ""})
        </span>
      </h1>
      <div className={styles.activityList}>
        {data.map((activity) => (
          <div className={styles.item} key={activity.id}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img}
                width={400}
                height={300}
                src={activity.img || "/images/categories/default.jpg"}
                alt={activity.alt || `Image de ${activity.title}`}
                objectFit="cover"
                layout="responsive"
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
};

export default Category;
