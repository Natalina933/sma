import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "@/components/carousel/mycarousel.module.css";
import Image from "next/image";
import activityData from "@/app/datas/activitys/activitys.json";
import { responsiveConfig } from "@/components/common/responsiveConfig/responsiveConfig";

const useActivityState = () => {
  const [expandedActivity, setExpandedActivity] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const handleToggleDescription = (activityId) => {
    setExpandedActivity(prev => (prev === activityId ? null : activityId));
  };

  const handleSelectActivity = (activityId) => {
    setSelectedActivity(prev => (prev === activityId ? null : activityId));
    setIsAutoPlay(prev => !prev);
  };

  return {
    expandedActivity,
    selectedActivity,
    isAutoPlay,
    handleToggleDescription,
    handleSelectActivity,
  };
};

const ActivityCard = ({ activity, expandedActivity, selectedActivity, handleToggleDescription, handleSelectActivity }) => {
  const { id, img, title, category, organizer, date, place, description, price, keywords, rating, inscription, duration, capacity, contact, requirements } = activity;
  console.log(activity.desc)
  return (
    <article
      key={id}
      className={`${styles.card} ${selectedActivity === id ? styles.selected : ''}`}
      onClick={() => handleSelectActivity(id)}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={img || '/default.jpg'} // Utilisez l'image par défaut si img n'est pas disponible
          alt={title}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.category}>{category}</p>
        <p className={styles.organizer}>Organisé par : {organizer}</p>
        <div className={styles.metaInfo}>
          <div className={styles.infoItem}>
            <span role="img" aria-label="Calendrier">📅</span> {date}
          </div>
          <div className={styles.infoItem}>
            <span role="img" aria-label="Lieu">📍</span> {place}
          </div>
        </div>
        {expandedActivity === id && (
          <div className={styles.expandedContent}>
            <p className={styles.description}>Description : {description}</p>
            <p className={styles.priceTag}>
              {typeof price === 'string' && price.toLowerCase() === "gratuit"
                ? "Gratuit"
                : `${price} €`}
            </p>
            <p className={styles.duration}>Durée : {duration}</p>
            <p className={styles.capacity}>Capacité : {capacity}</p>
            <p className={styles.contact}>Contact : {contact}</p>
            <p className={styles.requirements}>Exigences : {requirements}</p>
            <div className={styles.ratingWrapper}>
              <div className={styles.rating}>
                ⭐ {rating} / 5
              </div>
            </div>
          </div>
        )}
        <div className={styles.buttonGroup}>
          <button
            className={styles.infoButton}
            onClick={() => handleToggleDescription(id)}
          >
            {expandedActivity === id ? 'Moins d\'infos' : 'Plus d\'infos'}
          </button>
          <a href={inscription === "oui" ? "#" : null} className={styles.registerButton} target="_blank" rel="noopener noreferrer">
            {inscription === "oui" ? "S'inscrire" : "Pas d'inscription"}
          </a>
        </div>
      </div>
    </article>
  );
};

const MyCarousel = () => {
  const { expandedActivity, selectedActivity, isAutoPlay, handleToggleDescription, handleSelectActivity } = useActivityState();

  return (
    <section className={styles.carouselSection} aria-labelledby="carousel-heading">
      <h2 id="carousel-heading" className={styles.sectionTitle}>Nos Activités</h2>
      <Carousel
        responsive={responsiveConfig}
        className={styles.carousel}
        infinite
        autoPlay={isAutoPlay}
        autoPlaySpeed={5000}
        transitionDuration={500}
        removeArrowOnDeviceType={["mobile"]}
        itemClass={styles.carouselItem}
      >
        {activityData.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            expandedActivity={expandedActivity}
            selectedActivity={selectedActivity}
            handleToggleDescription={handleToggleDescription}
            handleSelectActivity={handleSelectActivity}
          />
        ))}
      </Carousel>
    </section>
  );
};


export default MyCarousel;
