/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client"
import styles from "./page.module.css";
import Banner from "@/components/banner/Banner";
import MyCarousel from "@/components/carousel/MyCarousel";
import Header from "@/components/header/Header";
import Image from "next/legacy/image";

// devra etre mis dans components ou utils doit faire appel à un maximum d'import

export default function Home() {
  return (
    <div className={styles.item}>
      <Header />
      <Banner />
      <main className={`${styles.desc} ${styles.arrow} ${styles.backgroundArrow}`}>
        <div className={styles.img}>
          <Image
            src='/hero.jpg'
            width={300}
            height={200}
            className={styles.image}
            alt="Activités passionnantes"
          />
        </div>
        <div className={styles.arrowContainer}>
          <h2>Découvrez un monde d'activités passionnantes</h2>
          <h3>Qui sommes-nous ?</h3>
          <p>
            Notre association a été fondée il y a maintenant près de 30 ans par un
            groupe de Saint-Mandéens avec notamment pour buts :
          </p>
          <ul>
            <li>Accueillir et favoriser l’insertion des nouveaux arrivants dans notre ville,</li>
            <li>Contribuer à une meilleure qualité de vie de nos concitoyens au moyen de diverses activités sociales, culturelles et sportives.</li>
          </ul>
        </div>
      </main>
      <MyCarousel />
    </div>
  );
}