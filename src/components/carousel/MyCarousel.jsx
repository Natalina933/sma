import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from "@/components/carousel/mycarousel.module.css";
import Image from "next/image";
import useSWR from "swr";
import ActivityCard from "@/components/common/actitityCard/ActivityCard";

const fetcher = url => fetch(url).then(res => res.json());

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

const responsiveConfig = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1400, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

const MyCarousel = () => {
  const { expandedActivity, selectedActivity, isAutoPlay, handleToggleDescription, handleSelectActivity } = useActivityState();
  const { data: activities, error } = useSWR("/api/activities", fetcher);
  const [fetchedActivities, setFetchedActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activities")
      .then(res => res.json())
      .then(data => {
        setFetchedActivities(data);
        setLoading(false);
      });
  }, []);

  if (error) return <div>Erreur de chargement</div>;
  if (loading) return <div>Chargement...</div>;

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
        {fetchedActivities.map((activity) => (
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
