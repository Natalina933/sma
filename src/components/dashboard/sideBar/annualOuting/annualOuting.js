import React, { useState } from 'react';
import styles from './AnnualOuting.module.css';

const AnnualOuting = () => {
  const [outings, setOutings] = useState([
    { id: 1, title: "Randonnée en montagne", date: "2025-07-15", location: "Alpes" },
    { id: 2, title: "Visite culturelle", date: "2025-09-20", location: "Paris" },
  ]);

  return (
    <div className={styles.annualOutingContainer}>
      <h1 className={styles.title}>Sorties Annuelles</h1>
      <ul className={styles.outingList}>
        {outings.map(outing => (
          <li key={outing.id} className={styles.outingItem}>
            <h2>{outing.title}</h2>
            <p>Date : {outing.date}</p>
            <p>Lieu : {outing.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnnualOuting;
