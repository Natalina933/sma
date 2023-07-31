import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>
        <h3>Permanences Tous les mardis de 14h30 à 17h</h3>

        <p>
          Nos hôtesses Andrée CORNET et Françoise CHAUBEAU seront heureuses de
          vous accueillir à la salle polyvalente :
        </p>
        <p>
          CENTRE CRESCO - Salle Bruno Cremer, 4 avenue Pasteur à Saint-Mandé.
        </p>
        <small>
          <p>© Copyright 2023 | Saint-Mandé Accueil | All Rights Reserved</p>
        </small>
        <div>
          <Image src="" alt=""/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
