"use client"
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/legacy/image";
import Link from "next/link";

// Composant réutilisable pour afficher une carte d'activité
const ActivityCard = ({ activity }) => {
  return (
    <Link href={`/blog/${activity._id}`} key={activity._id} className={styles.card}>
      <div className={styles.imgContainer}>
        <Image
          src={activity.img}
          className={styles.img}
          width={400}
          height={250}
          priority={true}
          alt={activity.title}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{activity.title}</h2>
        <p className={styles.date}>{new Date(activity.date).toLocaleDateString()}</p>
      </div>
      <div className={styles.additionalInfo}>
        <span className={styles.price}>{activity.price ? `${activity.price} €` : "Gratuit"}</span>
        <span className={styles.rating}>⭐ {activity.rating || "N/A"}</span>
      </div>
    </Link>
  );
};

// Composant principal Blog
const Blog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/posts", { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Échec du chargement (${res.status})`);
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className={styles.loading}>Chargement en cours...</p>;
  if (error) return <p className={styles.error}>Erreur : {error}</p>;

  return (
    <div className={styles.mainContainer}>
      {data.length > 0 ? (
        data.map((activity) => <ActivityCard key={activity._id} activity={activity} />)
      ) : (
        <p className={styles.noData}>Aucune activité disponible pour l&apos;instant.</p>
      )}
    </div>
  );
};

export default Blog;
