import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./AdherentList.module.css"; // Import du fichier CSS module

const AdherentList = ({ adherents, onDelete, onEdit }) => (
  <div className={styles.adherentListContainer}>
    <h3 className={styles.adherentListTitle}>Liste des adhérents</h3>
    <ul className={styles.adherentList}>
      {adherents &&
        adherents.map((adherent) => (
          <li key={adherent.id} className={styles.adherentItem}>
            <div className={styles.adherentInfo}>
              <div className={styles.adherentName}>
                <strong>Nom:</strong> {adherent.name}
              </div>
              <div className={styles.adherentEmail}>
                <strong>Email:</strong> {adherent.email}
              </div>
              <div className={styles.adherentPhone}>
                <strong>Téléphone:</strong> {adherent.phone}
              </div>
              <div className={styles.adherentAddress}>
                <strong>Adresse:</strong> {adherent.address}
              </div>
            </div>
            <div className={styles.adherentActions}>
              <button
                className={styles.deleteButton}
                onClick={() => onDelete(adherent.id)}>
                <FontAwesomeIcon icon={faTrash} /> Supprimer
              </button>
              <button
                className={styles.editButton}
                onClick={() => onEdit(adherent.id)}>
                <FontAwesomeIcon icon={faPencilAlt} /> Modifier
              </button>
            </div>
          </li>
        ))}
    </ul>
  </div>
);

export default AdherentList;
