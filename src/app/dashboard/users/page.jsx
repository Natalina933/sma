"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import maskEmail from '@/components/common/maskEmail/MaskEmail'; // fonction utilitaire

const Users = ({ apiUrl }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Indicateur de chargement

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [apiUrl]);

  return (
    <div className={styles.container}>
      <h1>Liste des utilisateurs</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <ul className={styles.userList}>
          {users.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            users.map((user) => (
              <li key={user.id} className={styles.userItem}>
                <div className={styles.userInfo}>
                  <h2>{user.name}</h2>
                  <p>Email : {maskEmail(user.email)}</p>
                  {user.city && <p>Ville : {user.city}</p>}
                  {/* Tu peux ajouter d'autres infos ici */}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Users;
