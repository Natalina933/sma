"use client";
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import maskEmail from '@/components/common/maskEmail/MaskEmail'

const Users = ({ apiUrl }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // État pour gérer les erreurs

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message); // Met à jour l'état avec le message d'erreur
      }
    };

    fetchUsers();
  }, [apiUrl]);

<maskEmail/>

  return (
    <div className={styles.container}>
      <h1>Liste des utilisateurs</h1>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user.id} className={styles.userItem}>
            <div className={styles.userInfo}>
              <h2>{user.name}</h2>
              <p>Email: {maskEmail(user.email)}</p> {/* Masquer l'email */}
              <p>Ville: {user.city}</p> {/* Afficher des informations non sensibles */}
              {/* Ajoutez d'autres informations sur l'utilisateur si nécessaire */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;