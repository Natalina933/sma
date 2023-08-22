/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
"use client"
import React from "react";
import styles from "./page.module.css";
import Banner from "@/components/banner/Banner";
import MyCarousel from "@/components/carousel/MyCarousel";

export default function Home() {
  return (
    <article className={styles.item}>
      <h1 className={styles.title}>
        Bienvenue sur le site de l'association SMA <br /> Saint-Mandé Accueil
      </h1>
      <Banner />

      <section className={styles.desc}>
        <div className={styles.arrow}>
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
