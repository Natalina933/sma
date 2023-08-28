
import React from "react";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons'
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footerContent}>
        <div className={styles.iconContainer}>
        <FontAwesomeIcon  width={25} height={25} icon={faLocationDot} className={styles.locationIcon} />
          <h3>Permanences Tous les mardis de 14h30 à 17h</h3>
        </div>
        <p>
          Nos hôtesses Andrée CORNET et Françoise CHAUBEAU seront heureuses de
          vous accueillir à la salle polyvalente :
        </p>
        <div className={styles.iconContainer}>
         <FontAwesomeIcon width={25} height={25} icon={faEnvelope} className={styles.envelopeIcon} /> 
         <p>
          CENTRE CRESCO - Salle Bruno Cremer, 4 avenue Pasteur à Saint-Mandé.
        </p>   
        </div>
       
      
        <small>
          © Copyright 2023 | Saint-Mandé Accueil | All Rights Reserved
        </small>
      </div>
    </div>
  );
};

export default Footer;
