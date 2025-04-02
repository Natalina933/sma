'use client';

import { useState } from "react";
import styles from "./page.module.css";
import { ChevronUp, ChevronDown } from "lucide-react";

const adherents = Array.from({ length: 457 }, (_, i) => ({
  id: i + 1,
  numero: i + 1000,
  nom: `Nom${i + 1}`,
  prenom: `Prénom${i + 1}`,
  codePostal: "75000",
  ville: "Paris",
  statut: i % 2 === 0 ? "Actif" : "Inactif",
}));

export default function ListeAdherents() {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const resultsPerPage = 20;
  const totalPages = Math.ceil(adherents.length / resultsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedAdherents = [...adherents].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const order = sortConfig.direction === "asc" ? 1 : -1;
    return a[sortConfig.key] > b[sortConfig.key] ? order : -order;
  });

  const paginatedAdherents = sortedAdherents.slice(
    (page - 1) * resultsPerPage,
    page * resultsPerPage
  );

  return (
    <div className={styles.listeAdherentsContainer}>
      <div className={styles.listeAdherentsHeader}>
        <h1>Liste des adhérents</h1>
        <button>Ajouter un adhérent</button>
      </div>
      <p>Page {page} sur {totalPages} ({adherents.length} résultat(s))</p>
      <div className={styles.tableContainer}>
        <table className={styles.listeAdherentsTable}>
          <thead>
            <tr>
              {["numero", "nom", "prenom", "codePostal", "ville", "statut"].map((key) => (
                <th key={key} onClick={() => handleSort(key)} className="cursor-pointer">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && (
                    sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedAdherents.map((adherent) => (
              <tr key={adherent.id} className="cursor-pointer hover:bg-gray-100">
                <td>{adherent.numero}</td>
                <td>{adherent.nom}</td>
                <td>{adherent.prenom}</td>
                <td>{adherent.codePostal}</td>
                <td>{adherent.ville}</td>
                <td>{adherent.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Précédent</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Suivant</button>
      </div>
    </div>
  );
}
