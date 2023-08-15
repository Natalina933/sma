/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "@/components/carousel/mycarousel.module.css";
import Image from 'next/image';
import Hero from 'public/hero.jpg';
import activityData from "@/app/datas/activitys.json"

const MyCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 1024, min: 900 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 900, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const [expandedActivity, setExpandedActivity] = useState(null);

  const handleToggleDescription = (activityId) => {
    if (expandedActivity === activityId) {
      setExpandedActivity(null);
    } else {
      setExpandedActivity(activityId);
    }
  };

  return (
    <section className={styles.carouselContainer}>
      <h1 className={styles.carouselTitle}>Découvrez un monde d'activités passionnantes</h1>
      <Carousel responsive={responsive} className={styles.carousel}>
        {activityData.map(activity => (
          <div className={`${styles.card} ${expandedActivity === activity.id ? styles.cardExpanded : ''}`} key={activity.id}>
            <Image src={activity.image} width={200} height={130} alt={activity.title} />
            <div className={styles.cardContent}>
              <h2 className={styles.activityTitle}>{activity.title}</h2>
              <p className={styles.description}>{activity.description}</p>

              <div className={styles.details}>
                <p className={styles.schedule}>{activity.schedule}</p>
                <p className={styles.place}>{activity.place}</p>
                <p className={styles.price}>{activity.price === "gratuit" ? "Gratuit" : `${activity.price} €`}</p>
                <button className={styles.addButton} type="button" onClick={() => handleToggleDescription(activity.id)}>
                  {expandedActivity === activity.id ? 'Réduire' : 'En savoir plus'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default MyCarousel;