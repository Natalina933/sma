import styles from "./page.module.css";
import Image from 'next/image';
import HeaderImage from 'public/headerImage.jpg';
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={HeaderImage}
          width={1920}
          height={1080}
          className={styles.image}
          alt="Activités passionnantes"
        />
        <div className={styles.imgText}>
          <h1 className={styles.imgTitle}>
            Bienvenue sur le site de l'association SMA <br /> Saint-Mandé Accueil
          </h1>
          <h2 className={styles.imgDesc}>Découvrez un monde d'activités passionnantes</h2>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1 className={styles.title}>Qui sommes-nous?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aspernatur corporis debitis, eum eligendi modi perferendis deserunt nisi, sequi suscipit nemo ipsum, maxime alias perspiciatis? Libero temporibus repellendus animi blanditiis.
            </p>
        </div>
        <div className={styles.item}>
          <h1 className={styles.title}>Ce que nous faisont??</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aspernatur corporis debitis, eum eligendi modi perferendis deserunt nisi, sequi suscipit nemo ipsum, maxime alias perspiciatis? Libero temporibus repellendus animi blanditiis.</p>
        </div>
      </div>

    </div>
  )
}

export default About