"use client";
import styles from "./page.module.css";
import CategorySection from "@/components/CategorySection/CategorySection";
import { useEffect, useState, useMemo } from "react";

const Activity = () => {
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const activitiesByCategory = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.id] = activities.filter((a) => a.category_id === cat.id);
    });
    return map;
  }, [categories, activities]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <CategorySection
        categories={categories}
        activitiesByCategory={activitiesByCategory}
      />
    </div>
  );
};

export default Activity;
