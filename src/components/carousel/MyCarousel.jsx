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

  return { expandedActivity, selectedActivity, isAutoPlay, handleToggleDescription, handleSelectActivity };
};

const ActivityCard = ({
  activity,
  expandedActivity,
  selectedActivity,
  handleToggleDescription,
  handleSelectActivity
}) => {
  const {
    id,
    title,
    description,
    date,
    place,
    price,
    organizer,
    img,
    category,
    rating,
    inscription,
    capacity,
    contact,
    requirements,
    programme
  } = activity;

  // Couleur dynamique badge (vert si inscription, rouge si complet)
  const badgeColor = inscription === "non" ? styles.badgeFull : styles.badgeAvailable;

  return (
    <article
      key={id}
      className={`${styles.card} ${selectedActivity === id ? styles.selected : ''}`}
      tabIndex={0}
      aria-label={`Carte activité ${title}`}
      onClick={() => handleSelectActivity(id)}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSelectActivity(id)}
    >
      <div className={`${styles.placesBadge} ${badgeColor}`}>
        {inscription === "non"
          ? "Complet"
          : capacity
            ? `${capacity} place${parseInt(capacity, 10) > 1 ? "s" : ""} restante${parseInt(capacity, 10) > 1 ? "s" : ""}`
            : "N.C."}
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src={img || '/default.jpg'}
          alt={title}
          layout="fill"
          objectFit="cover"
          className={styles.image}
          priority
        />
      </div>
      {/* Ligne fine colorée sous l'image */}
      <hr className={styles.cardDivider} />
      <div className={styles.cardContent}>
        <div className={styles.headerBlock}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <hr className={styles.titleDividerBlue} />
          <div className={styles.categoryChip}>{category}</div>
        </div>
        <div className={styles.metaInfo}>
          <span className={styles.organizer}><b>👤</b> {organizer}</span>
          <span className={styles.metaItem}><b>📅</b> {date}</span>
          <span className={styles.metaItem}><b>📍</b> {place}</span>
        </div>
        <div className={styles.priceRatingRow}>
          <span className={styles.priceTag}>
            {price && String(price).toLowerCase() === "gratuit" ? "Gratuit" : `${price} €`}
          </span>
          <span className={styles.rating} title="Note">{'⭐'.repeat(Math.round(rating))} <span className={styles.ratingValue}>{rating}/5</span></span>
        </div>
        <button
          className={styles.infoButton}
          aria-expanded={expandedActivity === id}
          onClick={e => { e.stopPropagation(); handleToggleDescription(id); }}
        >
          {expandedActivity === id ? 'Moins d\'infos' : 'Plus d\'infos'}
        </button>

        {expandedActivity === id && (
          <div className={styles.expandedContent}>
            <p className={styles.description}>{description}</p>
            {programme && (
              <>
                <hr className={styles.cardContentDivider} />
                <div className={styles.programme}><b>Programme :</b><br />{programme}</div>
              </>
            )}
            <div className={styles.detailsGrid}>
              <div><b>Capacité :</b> {capacity}</div>
              <div><b>Contact :</b> {contact}</div>
              <div><b>Exigences :</b> {requirements}</div>
            </div>
          </div>
        )}

        <a
          href={inscription === "oui" ? "#" : undefined}
          className={`${styles.registerButton} ${inscription === "non" ? styles.disabled : ''}`}
          aria-disabled={inscription === "non"}
          tabIndex={inscription === "non" ? -1 : 0}
          onClick={e => inscription === "non" && e.preventDefault()}
        >
          {inscription === "oui" ? "S'inscrire" : "Complet"}
        </a>
      </div>
    </article>
  );
};

const MyCarousel = () => {
  const { expandedActivity, selectedActivity, isAutoPlay, handleToggleDescription, handleSelectActivity } = useActivityState();

  return (
    <section id="activities" className={styles.carouselSection} aria-labelledby="carousel-heading">
      <h2 id="carousel-heading" className={styles.sectionTitle}>Nos Activités</h2>
      <hr className={styles.sectionDividerOrange} />
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
            {...{ expandedActivity, selectedActivity, handleToggleDescription, handleSelectActivity }}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default MyCarousel;
