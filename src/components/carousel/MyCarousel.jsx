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
    <section className={styles.carouselSection}>
      <h2 className={styles.sectionTitle}>Nos Activités</h2>
      <Carousel
        responsive={responsiveConfig}
        className={styles.carousel}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        transitionDuration={500}
        removeArrowOnDeviceType={["mobile"]}
      >
        {activityData.map((activity) => (
          <article 
            className={styles.card}
            key={activity.id}
          >
            <div className={styles.imageContainer}>
              <Image
                src={activity.img}
                alt={activity.title}
                width={400}
                height={250}
                layout="responsive"
                className={styles.image}
              />
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{activity.title}</h3>
              
              <div className={styles.cardBody}>
                <p className={styles.description}>
                  {expandedActivity === activity.id 
                    ? activity.desc 
                    : `${activity.desc.substring(0, 100)}...`}
                </p>

                <div className={styles.metaInfo}>
                  <p className={styles.infoItem}>{activity.schedule}</p>
                  <p className={styles.infoItem}>{activity.place}</p>
                  <p className={styles.priceTag}>
                    {typeof activity.price === 'string' && activity.price.toLowerCase() === "gratuit" 
                      ? "Gratuit" 
                      : `${activity.price} €`}
                  </p>
                </div>
              </div>

              <button
                className={styles.toggleButton}
                onClick={() => handleToggleDescription(activity.id)}
              >
                {expandedActivity === activity.id ? 'Moins de détails' : 'Plus de détails'}
              </button>
            </div>
          </article>
        ))}
      </Carousel>
    </section>
  );
};

export default MyCarousel;
