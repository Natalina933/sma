import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import styles from "./AdherentList.module.css";

const AdherentList = ({ onDelete, onEdit, onReglement }) => {
  const [adherents, setAdherents] = useState([]);

  useEffect(() => {
    fetch("/api/adherents")
      .then((res) => res.json())
      .then((data) => setAdherents(data))
      .catch((err) => console.error("Erreur de chargement :", err));
  }, []);

  if (!adherents.length) {
    return <p className={styles.noAdherents}>Aucun adhérent trouvé.</p>;
  }

  return (
    <div className={styles.adherentListContainer}>
      <h3 className={styles.adherentListTitle}>Liste des adhérents</h3>
      <ul className={styles.adherentList}>
        {adherents.map((adherent) => (
          <li key={adherent.id} className={styles.adherentItem}>
            <div className={styles.adherentInfo}>
              <div className={styles.adherentName}>
                <strong>Nom:</strong> {adherent.name}
              </div>
              <div className={styles.adherentEmail}>
                <strong>Email:</strong> {adherent.mail}
              </div>
              <div className={styles.adherentPhone}>
                <strong>Téléphone:</strong> {adherent.phone}
              </div>
              <div className={styles.adherentAddress}>
                <strong>Adresse:</strong> {adherent.address}
              </div>
            </div>
            <div className={styles.adherentActions}>
              <button className={styles.deleteButton} onClick={() => onDelete(adherent.id)}>
                <FontAwesomeIcon icon={faTrash} /> Supprimer
              </button>
              <button className={styles.editButton} onClick={() => onEdit(adherent.id)}>
                <FontAwesomeIcon icon={faPencilAlt} /> Modifier
              </button>
              <button className={styles.reglementButton} onClick={() => onReglement(adherent.id)}>
                <FontAwesomeIcon icon={faMoneyBillWave} /> Règlement
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdherentList;
