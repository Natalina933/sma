"use client";
import styles from "./page.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const Activity = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activities, setActivities] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  // Quand une catégorie est sélectionnée, charge ses activités
  useEffect(() => {
    if (selectedCategory) {
      fetch(`/api/activities?category_id=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setActivities(data.activities || data); // adapte selon ta réponse API
          // Récupère le nom de la catégorie sélectionnée
          const cat = categories.find((c) => c.id === selectedCategory);
          setCategoryName(cat ? cat.title : "");
        });
    }
  }, [selectedCategory, categories]);

  // Affichage de la liste des activités d'une catégorie
  if (selectedCategory) {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => setSelectedCategory(null)}>
          Retour aux catégories
        </button>
        <h1 className={styles.catTitle}>
          {categoryName}
          <span className={styles.count}>
            &nbsp;({activities.length} activité{activities.length > 1 ? "s" : ""} proposée{activities.length > 1 ? "s" : ""})
          </span>
        </h1>
        <div className={styles.activityList}>
          {activities.map((activity) => (
            <div className={styles.item} key={activity.id}>
              <div className={styles.imgContainer}>
                <Image
                  className={styles.img}
                  width={400}
                  height={300}
                  src={activity.img || "/images/categories/default.jpg"}
                  alt={activity.alt || `Image de ${activity.title}`}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>{activity.title}</h2>
                <p className={styles.desc}>{activity.description}</p>
                <p className={styles.date}>{activity.date}</p>
                {/* Ajoute ici un bouton d'inscription si besoin */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Affichage de la liste des catégories
  return (
    <div className={styles.container}>
      <h1 className={styles.selectTitle}>Nos Activités</h1>
      <hr className={styles.sectionDividerOrange} />
      <div className={styles.categories}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={styles.categoryCard}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={cat.img ? cat.img : `/images/categories/default.jpg`}
                alt={cat.alt || `Image de la catégorie ${cat.title}`}
                width={300}
                height={200}
              />
            </div>
            <h3>{cat.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
