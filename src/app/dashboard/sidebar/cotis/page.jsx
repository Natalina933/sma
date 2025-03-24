"use client";
import React, { useState } from 'react';
import styles from './Page.module.css';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
// import CotisationCard from '@/components/CotisationCard/CotisationCard';

const CotisationsPage = () => {
    const [activeTab, setActiveTab] = useState('payees');
    const [searchTerm, setSearchTerm] = useState('');
    const [newCotisation, setNewCotisation] = useState({});

    // Données simulées
    const [cotisationsPayees] = useState([
        { id: 1, membre: 'Jean Dupont', montant: 50, date: '2024-01-15' },
        { id: 2, membre: 'Marie Martin', montant: 75, date: '2024-02-01' },
    ]);

    const [cotisationsNonPayees] = useState([
        { id: 3, membre: 'Pierre Leroy', montant: 30, date: '2024-03-01' },
        { id: 4, membre: 'Sophie Bernard', montant: 45, date: '2024-04-01' },
    ]);

    const filteredCotisations = (type) => {
        const data = type === 'payees' ? cotisationsPayees : cotisationsNonPayees;
        return data.filter(cot =>
            cot.membre.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleAddCotisation = () => {
        // Gestion de l'ajout (à implémenter)
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Suivi des cotisations</h1>
                <div className={styles.actions}>
                    <button
                        onClick={() => setActiveTab('ajouter')}
                        className={styles.primaryButton}
                    >
                        <FaPlus /> Ajouter
                    </button>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    onClick={() => setActiveTab('payees')}
                    className={`${styles.tab} ${activeTab === 'payees' ? styles.active : ''}`}
                >
                    Payées
                </button>
                <button
                    onClick={() => setActiveTab('nonpayees')}
                    className={`${styles.tab} ${activeTab === 'nonpayees' ? styles.active : ''}`}
                >
                    Non payées
                </button>
                <button
                    onClick={() => setActiveTab('ajouter')}
                    className={`${styles.tab} ${activeTab === 'ajouter' ? styles.active : ''}`}
                    style={{ display: 'none' }}
                >
                    Ajouter
                </button>
            </div>

            <div className={styles.content}>
                {activeTab === 'ajouter' ? (
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label>Membre</label>
                            <input
                                type="text"
                                placeholder="Nom du membre"
                                onChange={(e) => setNewCotisation({ ...newCotisation, membre: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Montant</label>
                            <input
                                type="number"
                                placeholder="Montant en €"
                                onChange={(e) => setNewCotisation({ ...newCotisation, montant: e.target.value })}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Date</label>
                            <input
                                type="date"
                                onChange={(e) => setNewCotisation({ ...newCotisation, date: e.target.value })}
                            />
                        </div>
                        <button type="submit" className={styles.primaryButton}>
                            Valider
                        </button>
                    </form>
                ) : (
                    <div className={styles.searchBar}>
                        <FaSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Rechercher un membre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                )}

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Membre</th>
                                <th>Montant</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCotisations(activeTab).map(cot => (
                                <tr key={cot.id}>
                                    <td>{cot.membre}</td>
                                    <td>{cot.montant} €</td>
                                    <td>{cot.date}</td>
                                    <td>
                                        <button className={styles.editButton}>
                                            <FaEdit /> Modifier
                                        </button>
                                        <button className={styles.deleteButton}>
                                            <FaTrash /> Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CotisationsPage;
