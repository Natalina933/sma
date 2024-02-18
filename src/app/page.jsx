"use client"
import Body from "@/components/body/Body";
import styles from "./page.module.css";
import Banner from "@/components/banner/Banner";
import MyCarousel from "@/components/carousel/MyCarousel";
import Header from "@/components/layout/header/Header";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
/**
 * Composant principal de la page d'accueil.
 * Ce composant affiche la bannière, une image d'introduction, des informations sur l'association,
 * et un carrousel d'activités.
 */
const Home = () => (
  <div className={styles.item}>
    <Header />
    <Banner />
    <Body />
    <MyCarousel />
  </div>
);

export default Home;