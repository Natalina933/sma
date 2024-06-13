"use client";
import React, { useState } from 'react'; 
import styles from './FiltersAdherent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const FiltersAdherent = ({ adherents, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ 
    id: '', 
    name: '', 
    surname: '', 
    mail: '', 
    phone: '', 
    address: '', 
    complement: '', 
    CP: '', 
    city: '', 
    status: '' 
  });
  const [notFound, setNotFound] = useState(false);
  const handleFilterChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    onFilter(newFilters);
  };
  const handleReset = () => {
    setSearchTerm('');
    setFilters({ id: '', name: '', surname: '', mail: '', phone: '', address: '', complement: '', CP: '', city: '', status: '' });
    setNotFound(false);
    onFilter({ searchTerm: '', id: '', name: '', surname: '', mail: '', phone: '', address: '', complement: '', CP: '', city: '', status: '' });
    console.log("Filters reset.");
  };

  return (
    <div className={styles.filterContainer}>

      <div className={styles.filterBox}>
        <input
          type="text"
          placeholder="ID"
          name="id"
          value={filters.id}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Nom"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Prénom"
          name="surname"
          value={filters.surname}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Email"
          name="mail"
          value={filters.mail}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Téléphone"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Adresse"
          name="address"
          value={filters.address}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Complément"
          name="complement"
          value={filters.complement}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="CP"
          name="CP"
          value={filters.CP}
          onChange={handleFilterChange}
          className={styles.input}
        />
        <select 
          name="city" 
          value={filters.city} 
          onChange={handleFilterChange}
          className={styles.select}
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
        >
          <option value="">Statut</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>

        <button onClick={handleReset} className={`${styles.button} ${styles.resetButton}`}>
          <FontAwesomeIcon icon={faFilter} />
          Réinitialiser
        </button>
      </div>
      {notFound && <div className={styles.notFoundMessage}>Aucun adhérent trouvé</div>}
    </div>
  );
};

export default FiltersAdherent;