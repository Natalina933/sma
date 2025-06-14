import styles from "./CategorySection.module.css";
import Image from "next/image";

function isPast(dateStr) {
  // Si ta date est au format ISO ou YYYY-MM-DD, ça fonctionne
  const date = new Date(dateStr);
  return date < new Date();
}

const CategorySection = ({ categories, activitiesByCategory }) => {
  if (!categories || !Array.isArray(categories)) {
    return <div>Aucune catégorie à afficher.</div>;
  }

  return (
    <section className={styles.categorySection}>
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
                  {(activitiesByCategory[cat.id] || []).map((activity) => {
                    const placesRestantes = activity.capacity - activity.inscrits;
                    const estTerminee = isPast(activity.date);

                    return (
                      <li key={activity.id}>
                        <strong>{activity.title}</strong>
                        {" — "}
                        {typeof activity.capacity === "number" && typeof activity.inscrits === "number"
                          ? `Reste ${placesRestantes} place${placesRestantes > 1 ? "s" : ""} sur ${activity.capacity}`
                          : "Capacité inconnue"}
                        {" — "}
                        {estTerminee ? (
                          <span className={styles.ended}>Terminée</span>
                        ) : (
                          <span className={styles.upcoming}>À venir</span>
                        )}
                        {/* Bouton S'inscrire */}
                        {!estTerminee && placesRestantes > 0 && (
                          <button
                            className={styles.subscribeBtn}
                            onClick={() => handleInscription(activity.id)}
                          >
                            S&apos;inscrire
                          </button>
                        )}
                      </li>
                    );
                  })}
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