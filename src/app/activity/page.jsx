"use client";
import styles from "./page.module.css";
import ActivityCard from "@/components/common/actitityCard/ActivityCard";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const Activity = () => {
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Récupère toutes les catégories
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch("/api/categories").then((res) => res.json()),
      fetch("/api/activities").then((res) => res.json()),
    ])
      .then(([categoriesData, activitiesData]) => {
        setCategories(categoriesData);
        setActivities(activitiesData);
      })
      .catch(() => setError("Erreur de chargement des données"))
      .finally(() => setLoading(false));
  }, []);

  // Regroupement optimisé avec useMemo
  const activitiesByCategory = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.name] = activities.filter((a) => a.category === cat.name);
    });
    return map;
  }, [categories, activities]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      {categories.map((cat) => (
        <section key={cat.id} className={styles.categorySection}>
          <h2 className={styles.catTitle}>
            {cat.name}
            <span className={styles.count}>
              &nbsp;({activitiesByCategory[cat.name]?.length || 0} activité
              {activitiesByCategory[cat.name]?.length > 1 ? "s" : ""})
            </span>
          </h2>
          <div className={styles.activityList}>
            {(activitiesByCategory[cat.name] || []).map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                showDetailsButton={true}
                showRegisterButton={true}
              />
            ))}
          </div>
          <Image
            src={cat.img || "/images/categories/default.jpg"} width={200}
            height={200}
            alt={cat.name || "Catégorie"}
            className={styles.categoryImage}
          />
        </section>
      ))}
    </div>
  );
};

export default Activity;
