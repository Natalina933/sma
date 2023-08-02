// Footer.js
import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerContent}>
        <h3>Permanences Tous les mardis de 14h30 à 17h</h3>
        <p>
          Nos hôtesses Andrée CORNET et Françoise CHAUBEAU seront heureuses de
          vous accueillir à la salle polyvalente :
        </p>
        <p>CENTRE CRESCO - Salle Bruno Cremer, 4 avenue Pasteur à Saint-Mandé.</p>
        <small>© Copyright 2023 | Saint-Mandé Accueil | All Rights Reserved</small>
      </div>
    </div>
  );
};

export default Footer;
