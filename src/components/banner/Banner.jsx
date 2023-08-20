import React from 'react';
import styles from './banner.module.css';
import Hero from 'public/hero.jpg';
import Image from 'next/image';
const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.overlay}></div>
      <div className={styles.textContainer}>
        <div className={styles.text}>
          <h2>Des moments inoubliables</h2>
          <p>Explorez nos activités passionnantes et rejoignez-nous.</p>
        </div>
        <div className={styles.img}>
          <Image
            src={Hero}
            layout="fill" /* Remplit l'espace avec l'image */
            objectFit="cover" /* Ajuste l'image pour couvrir le conteneur */
            style={{ borderRadius: '15px' }} /* Utilisez les doubles accolades pour les styles en ligne */
            alt="Activités passionnantes"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;