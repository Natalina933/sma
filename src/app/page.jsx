/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client"
import styles from "./page.module.css";
import Banner from "@/components/banner/Banner";
import MyCarousel from "@/components/carousel/MyCarousel";
import Image from 'next/image';
import HeroImage from 'public/hero.jpg';
import HeaderImage from 'public/headerImage.jpg';

export default function Home() {
  return (
    <article className={styles.item}>
      {/* <div className={styles.img}>
        <Image
          src={HeaderImage}
          width={1920}
          height={1080}
          layout="responsive"
          className={styles.image}
          alt="Activités passionnantes"
        />
        <h1 className={styles.title}>
          Bienvenue sur le site de l'association SMA <br /> Saint-Mandé Accueil
        </h1>
      </div> */}
      <div className={styles.container}>
        <div className={styles.imgContainer}>
        <Image
          src={HeaderImage}
          width={1920}
          height={1080}
          layout="responsive"
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

        </div>

      </div>
      <Banner />

      <section className={`${styles.desc} ${styles.arrow} ${styles.backgroundArrow}`}>
        <div className={styles.img}>
          <Image
            src={HeroImage}
            width={300}
            height={200}
            layout="responsive"
            className={styles.image}
            alt="Activités passionnantes"
          />
        </div>
        <div className={styles.arrowContainer}>
          <h2>Découvrez un monde d'activités passionnantes</h2>
        </div>

        <h3>Qui sommes-nous ?</h3>
        <p>
          Notre association a été fondée il y a maintenant près de 30 ans par un
          groupe de Saint-Mandéens avec notamment pour buts :
        </p>

        <ul>
          <li>
            Accueillir et favoriser l’insertion des nouveaux arrivants dans
            notre ville,
          </li>
          <li>
            Contribuer à une meilleure qualité de vie de nos concitoyens au
            moyen de diverses activités sociales, culturelles et sportives.
          </li>
        </ul>
      </section>
      <MyCarousel />
    </article>
  );
}