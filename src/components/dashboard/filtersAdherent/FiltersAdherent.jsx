"use client";
import React, { useState } from "react";
import styles from "./FiltersAdherent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

/**
 * FiltersAdherent
 * @param {Array} adherents - liste complète des adhérents
 * @param {Function} onFilter - callback pour transmettre la liste filtrée
 * @param {Function} onReset - callback pour indiquer au parent que le filtre est réinitialisé (optionnel)
 */
const FiltersAdherent = ({ adherents, onFilter, onReset }) => {
  // ⚠️ Les noms de champs doivent correspondre à ceux de la base ET du formulaire
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    surname: "",
    mail: "",
    phone: "",
    address: "",
    complement: "",
    cp: "",
    city: "",
    status: "",
  });
  const [notFound, setNotFound] = useState(false);

  // Filtrage dynamique
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Appliquer les filtres
    const filteredAdherents = adherents.filter((adherent) =>
      Object.keys(newFilters).every((key) => {
        if (!newFilters[key]) return true;
        // Filtrage insensible à la casse
        return adherent[key]?.toString().toLowerCase().includes(newFilters[key].toLowerCase());
      })
    );

    setNotFound(filteredAdherents.length === 0);
    onFilter(filteredAdherents);
  };

  // Réinitialisation des filtres
  const handleReset = () => {
    const resetFilters = {
      id: "",
      name: "",
      surname: "",
      mail: "",
      phone: "",
      address: "",
      complement: "",
      cp: "",
      city: "",
      status: "",
    };
    setFilters(resetFilters);
    setNotFound(false);
    onFilter(adherents); // Affiche toute la liste
    if (onReset) onReset(); // Désactive le flag de filtre côté parent (si fourni)
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterBox}>
        {[
          { name: "id", placeholder: "ID" },
          { name: "name", placeholder: "Nom" },
          { name: "surname", placeholder: "Prénom" },
          { name: "mail", placeholder: "Email" },
          { name: "phone", placeholder: "Téléphone" },
          { name: "address", placeholder: "Adresse" },
          { name: "complement", placeholder: "Complément" },
          { name: "cp", placeholder: "Code Postal" }, // ⚠️ "cp" en minuscule
        ].map((field) => (
          <input
            key={field.name}
            type="text"
            placeholder={field.placeholder}
            name={field.name}
            value={filters[field.name]}
            onChange={handleFilterChange}
            className={styles.input}
            aria-label={`Filtrer par ${field.placeholder}`}
          />
        ))}

        <input
          type="text"
          name="city"
          placeholder="Ville"
          value={filters.city}
          onChange={handleFilterChange}
          className={styles.input}
          aria-label="Filtrer par ville"
        />

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className={styles.select}
          aria-label="Filtrer par statut"
        >
          <option value="">Statut</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
        </select>

        <button
          type="button"
          onClick={handleReset}
          className={`${styles.button} ${styles.resetButton}`}
          aria-label="Réinitialiser les filtres"
        >
          <FontAwesomeIcon icon={faFilter} />
          Réinitialiser
        </button>
      </div>

      {notFound && (
        <div className={styles.notFoundMessage} aria-live="polite">
          Aucun adhérent trouvé
        </div>
      )}
    </div>
  );
};

export default FiltersAdherent;
