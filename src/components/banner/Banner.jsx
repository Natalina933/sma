import styles from './banner.module.css';
import Image from "next/image";
import Photo1 from 'public/barque-bois-de-vincennes-1.jpg';
import Photo2 from 'public/girafes-zoo-vincennes.jpg';
import Photo3 from 'public/st mandé rue de paris.jpg';

const Banner = () => (
  <section className={styles.banner}>
    <div className={styles.contentContainer}>
      <div className={styles.galleryWall}>
        <div className={`${styles.frameSmall} ${styles.frameTopLeft}`}>
          <Image src={Photo1} alt="Souvenir 1" className={styles.photo} />
        </div>
        <div className={styles.frameLarge}>
          <Image src={Photo2} alt="Souvenir principal" className={styles.photo} />
        </div>
        <div className={`${styles.frameSmall} ${styles.frameBottomRight}`}>
          <Image src={Photo3} alt="Souvenir 2" className={styles.photo} />
        </div>
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>Des moments inoubliables</h2>
        <h1 className={styles.mainTitle}>Vivez l’exception</h1>
        <p className={styles.subtitle}>Découvrez nos activités originales et partagez des expériences uniques avec nous.</p>
        <a href="#activities" className={styles.cta}>Découvrir nos activités</a>
      </div>
    </div>
    <div className={styles.decorationContainer}>
      <div className={styles.hexagon}></div>
      <div className={styles.semiCircle}></div>
      <div className={styles.polygon}></div>
    </div>
  </section>
);

export default Banner;
