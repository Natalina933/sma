"use client";
import React, { useState } from "react";
import styles from "./FiltersAdherent.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";

const FiltersAdherent = ({ adherents, onFilter }) => {
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    surname: "",
    mail: "",
    phone: "",
    address: "",
    complement: "",
    CP: "",
    city: "",
    status: "",
  });
  const [notFound, setNotFound] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    // Appliquer les filtres
    const filteredAdherents = adherents.filter((adherent) =>
      Object.keys(newFilters).every((key) => {
        if (!newFilters[key]) return true; // Si le filtre est vide, ne pas filtrer
        return adherent[key]?.toString().toLowerCase().includes(newFilters[key].toLowerCase());
      })
    );

    setNotFound(filteredAdherents.length === 0);
    onFilter(filteredAdherents);
  };

  const handleReset = () => {
    const resetFilters = {
      id: "",
      name: "",
      surname: "",
      mail: "",
      phone: "",
      address: "",
      complement: "",
      CP: "",
      city: "",
      status: "",
    };
    setFilters(resetFilters);
    setNotFound(false);
    onFilter(adherents); // Réinitialiser les filtres
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
          { name: "CP", placeholder: "Code Postal" },
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

        <select
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          className={styles.select}
          aria-label="Filtrer par ville"
        >
          <option value="">Ville</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className={styles.select}
          aria-label="Filtrer par statut"
        >
          <option value="">Statut</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>

        <button
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