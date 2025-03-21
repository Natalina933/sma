import styles from './banner.module.css';
import HeroImage from 'public/hero.jpg';
import Image from "next/image";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.contentContainer}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Des moments inoubliables</h2>
          <p className={styles.subtitle}>Explorez nos activités passionnantes et rejoignez-nous.</p>
          <a href="#activities" className={styles.cta}>Découvrir nos activités</a>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={HeroImage}
            fill
            style={{ objectFit: 'cover' }}
            className={styles.image}
            alt="Activités passionnantes"
            priority
          />
        </div>
      </div>
      <div className={styles.decorationContainer}>
        <div className={styles.circle}></div>
        <div className={styles.square}></div>
        <div className={styles.triangle}></div>
      </div>
    </section>
  );
};

export default Banner;
