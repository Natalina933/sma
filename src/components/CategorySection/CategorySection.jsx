import styles from "./CategorySection.module.css";
import Image from "next/image";

function isPast(dateStr) {
  const date = new Date(dateStr);
  return date < new Date();
}

const CategorySection = ({ categories, activitiesByCategory, user }) => {
  const handleInscription = async (activityId) => {
    const memberId = user.id; // à adapter selon ton contexte
    const res = await fetch("/api/activity-members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activity_id: activityId, member_id: memberId }),
    });
    if (res.ok) {
      alert("Inscription réussie !");
      // Optionnel : rafraîchir la liste des activités/inscrits
    } else {
      alert("Erreur lors de l'inscription");
    }
  };

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
                  {(activitiesByCategory[cat.id] || []).map((activity) => {
                    const placesRestantes = activity.capacity - activity.inscrits;
                    const estTerminee = isPast(activity.date);
                    const complet = placesRestantes <= 0;

                    return (
                      <li key={activity.id} className={styles.activityItem}>
                        <div>
                          <strong>{activity.title}</strong>
                          {" — "}
                          {typeof activity.capacity === "number" && typeof activity.inscrits === "number"
                            ? `Reste ${placesRestantes} place${placesRestantes > 1 ? "s" : ""} sur ${activity.capacity}`
                            : "Capacité inconnue"}
                          {" — "}
                          {estTerminee ? (
                            <span className={styles.ended}>Terminée</span>
                          ) : complet ? (
                            <span className={styles.full}>Complet</span>
                          ) : (
                            <span className={styles.upcoming}>À venir</span>
                          )}
                        </div>
                        <div>
                          {!estTerminee && !complet && (
                            <button
                              className={styles.subscribeBtn}
                              onClick={() => handleInscription(activity.id)}
                            >
                              S&apos;inscrire
                            </button>
                          )}
                        </div>
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