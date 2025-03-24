import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "@/components/carousel/mycarousel.module.css";
import Image from "next/image";
import activityData from "@/app/datas/activitys/activitys.json";
import { responsiveConfig } from "@/components/common/responsiveConfig/responsiveConfig";

const MyCarousel = () => {
  const [expandedActivity, setExpandedActivity] = useState(null);

  const handleToggleDescription = (activityId) => {
    setExpandedActivity(prev => (prev === activityId ? null : activityId));
  };

  return (
    <section className={styles.carouselSection} aria-labelledby="carousel-heading">
      <h2 id="carousel-heading" className={styles.sectionTitle}>Nos Activités</h2>
      <Carousel
        responsive={responsiveConfig}
        className={styles.carousel}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        transitionDuration={500}
        removeArrowOnDeviceType={["mobile"]}
        itemClass={styles.carouselItem}
      >
        {activityData.map((activity) => (
          <article className={styles.card} key={activity.id}>
            <div className={styles.imageWrapper}>
              <Image
                src={activity.img}
                alt={activity.title}
                layout="fill"
                objectFit="cover"
                className={styles.image}
              />
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{activity.title}</h3>

              <div className={styles.metaInfo}>
                <div className={styles.infoItem}>
                  <svg className={styles.infoIcon} viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                  <span>{activity.schedule}</span>
                </div>
                <div className={styles.infoItem}>
                  <svg className={styles.infoIcon} viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>{activity.place}</span>
                </div>
              </div>

              {expandedActivity === activity.id && (
                <div className={styles.expandedContent}>
                  <p className={styles.description}>{activity.desc}</p>
                  <p className={styles.priceTag}>
                    {typeof activity.price === 'string' && activity.price.toLowerCase() === "gratuit"
                      ? "Gratuit"
                      : `${activity.price} €`}
                  </p>
                </div>
              )}

              <div className={styles.buttonGroup}>
                <button
                  className={styles.infoButton}
                  onClick={() => handleToggleDescription(activity.id)}
                >
                  {expandedActivity === activity.id ? 'Moins d\'infos' : 'Plus d\'infos'}
                </button>
                <a href="#inscription" className={styles.registerButton}>S&apos;inscrire</a>
              </div>
            </div>
          </article>
        ))}
      </Carousel>
    </section>
  );
};

export default MyCarousel;
