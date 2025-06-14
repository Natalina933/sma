import styles from "./CategorySection.module.css";
import Image from "next/image";

const CategorySection = ({ categories, activitiesByCategory }) => {
  if (!categories || !Array.isArray(categories)) {
    return <div>Aucune catégorie à afficher.</div>;
  }

  return (
    <section className={styles.categorySection}>
      <h1 className={styles.mainTitle}>Nos activités cette année</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Catégorie</th>
            <th>Nombre d’activités</th>
            <th>Liste des activités</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>
                <Image
                  src={cat.img || "/images/categories/default.jpg"}
                  alt={cat.title || "Catégorie"}
                  width={80}
                  height={60}
                  className={styles.categoryImage}
                />
              </td>
              <td>{cat.title}</td>
              <td>{activitiesByCategory[cat.id]?.length || 0}</td>
              <td>
                <ul className={styles.activityList}>
                  {(activitiesByCategory[cat.id] || []).map((activity) => (
                    <li key={activity.id}>{activity.title}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CategorySection;