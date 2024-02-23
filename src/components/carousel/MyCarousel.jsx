/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "@/components/carousel/mycarousel.module.css";
import Image from "next/legacy/image";
import activityData from "@/app/datas/activitys/activitys.json"
import { responsiveConfig } from "@/components/common/responsiveConfig/responsiveConfig"


const MyCarousel = () => {

  const [expandedActivity, setExpandedActivity] = useState(null);

  const handleToggleDescription = (activityId) => {
    setExpandedActivity(prevExpandedActivity =>
      prevExpandedActivity === activityId ? null : activityId
    );
  };

  return (
    <section className={styles.carouselContainer}>
      <h1 className={styles.carouselTitle}>Découvrez un monde d'activités passionnantes</h1>
      <Carousel responsive={responsiveConfig} className={styles.carousel}>
        {activityData.map(activity => (
          <div
            className={`${styles.card} ${expandedActivity === activity.id ? styles.cardExpanded : ''
              }`}
            key={activity.id}
          >
            <Image src={activity.img} width={300} height={130} alt={activity.title} />
            <div className={styles.cardContent}>
              <h2 className={styles.activityTitle}>{activity.title}</h2>
              <p className={styles.description}>{activity.desc}</p>

              <div className={styles.details}>
                <p className={styles.schedule}>{activity.schedule}</p>
                <p className={styles.place}>{activity.place}</p>
                <p className={styles.price}>
                  {activity.price === "gratuit" ? "Gratuit" : `${activity.price} €`}
                </p>
                <button
                  className={styles.addButton}
                  type="button"
                  onClick={() => handleToggleDescription(activity.id)}
                >
                  {expandedActivity === activity.id ? 'Réduire' : 'En savoir plus'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default MyCarousel;