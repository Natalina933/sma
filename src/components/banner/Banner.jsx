import React from 'react';
import styles from './banner.module.css';
import Hero from 'public/hero.jpg';
import Image from 'next/image';

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay}></div>
      <div className={styles.textContainer}>
        <div className={styles.leftText}>
          <h2>Des moments inoubliables</h2>
          <p>Explorez nos activités passionnantes et rejoignez nous.</p>
        </div>
        <div className={styles.rightText}>
          <div className={styles.img}>
            <Image src={Hero} width={500} height={300} alt="Activités passionnantes" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
