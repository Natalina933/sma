'use client';

import { useState } from "react";
import styles from "./page.module.css";
import { ChevronUp, ChevronDown } from "lucide-react";
import useSWR from "swr";

// Utilisation d'une API dynamique (pagination/tri côté serveur recommandé pour de gros volumes)
const fetcher = (url) => fetch(url).then(res => res.json());

export default function ListeAdherents() {
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const resultsPerPage = 20;

  // Appel de l'API avec pagination et tri
  const { data, error } = useSWR(
    `/api/adherents?page=${page}&limit=${resultsPerPage}&sort=${sortConfig.key}&direction=${sortConfig.direction}`,
    fetcher
  );

  if (error) return <p>Erreur de chargement</p>;
  if (!data) return <p>Chargement...</p>;

  const adherents = data.adherents || [];
  const total = data.total || 0;
  const totalPages = Math.ceil(total / resultsPerPage);

  // Colonnes à afficher (adaptées à ta base)
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nom" },
    { key: "surname", label: "Prénom" },
    { key: "mail", label: "Email" },
    { key: "phone", label: "Téléphone" },
    { key: "city", label: "Ville" },
    { key: "cp", label: "CP" },
    { key: "membership_type", label: "Type" },
    { key: "membership_start", label: "Début adhésion" },
    { key: "membership_end", label: "Fin adhésion" },
    { key: "payment_status", label: "Paiement" },
    { key: "status", label: "Statut" },
  ];

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setPage(1); // On revient à la première page si on change le tri
  };

  return (
    <div className={styles.listeAdherentsContainer}>
      <div className={styles.listeAdherentsHeader}>
        <h1>Liste des adhérents</h1>
        <button>Ajouter un adhérent</button>
      </div>
      <p>Page {page} sur {totalPages} ({total} résultat{total > 1 ? "s" : ""})</p>
      <div className={styles.tableContainer}>
        <table className={styles.listeAdherentsTable}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={styles.sortableHeader}
                  style={{ cursor: "pointer" }}
                >
                  {col.label}
                  {sortConfig.key === col.key && (
                    sortConfig.direction === "asc" ? <ChevronUp /> : <ChevronDown />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {adherents.map((a) => (
              <tr key={a.id}>
                {columns.map((col) => (
                  <td key={col.key}>{a[col.key] ?? ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={styles.paginationButton}
        >
          Précédent
        </button>
        <span>Page {page} sur {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className={styles.paginationButton}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
