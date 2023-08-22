import React from 'react';
import styles from './banner.module.css';
import HeroImage from 'public/hero.jpg';
import Image from 'next/image';
import ArrowIcon from'public/assets/leftarrow.svg';
const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay}></div>
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <div className={styles.text}>
            <h2>Des moments inoubliables</h2>
            <p>Explorez nos activités passionnantes et rejoignez-nous.</p>
          </div>
          <div className={styles.chevron}>
            <Image
              src={ArrowIcon}
              width={40}
              height={40}
              alt="triangle"
            />
          </div>
          <div className={styles.img}>
            <Image
              src={HeroImage}
              width={300}
              height={200}
              style={{ borderRadius: '50%' }}
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