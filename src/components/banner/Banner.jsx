import React from 'react';
import styles from './banner.module.css';
import HeroImage from 'public/hero.jpg';
import Image from 'next/image';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay}></div>
      <div className={styles.arrowsContainer}>
        <div className={`${styles.arrow} ${styles.arrow1}`}></div>
        <div className={`${styles.arrow} ${styles.arrow2}`}></div>
        <div className={`${styles.arrow} ${styles.arrow3}`}></div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>
            <h2>Des moments inoubliables</h2>
            <p>Explorez nos activités passionnantes et rejoignez-nous.</p>
          </div>
          <div className={styles.img}>
            <Image
              src={HeroImage}
              width={300}
              height={200}
              style={{ borderRadius: '10px' }}
              layout="responsive"
              className={styles.image}
              alt="Activités passionnantes"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
