"use client";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faPlus, faUser, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import FiltersAdherent from "@/components/dashboard/filtersAdherent/FiltersAdherent";
import Link from "next/link";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: adherents, error, mutate } = useSWR("/api/adherents", fetcher);

  // Toujours travailler avec un tableau, quelle que soit la structure retournée par l’API
  const adherentsList = Array.isArray(adherents)
    ? adherents
    : adherents && Array.isArray(adherents.adherents)
      ? adherents.adherents
      : [];

  // Gestion du filtrage
  const [filteredAdherents, setFilteredAdherents] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleFilter = (filtered) => {
    setFilteredAdherents(filtered);
    setIsFiltered(true);
  };

  const resetFilters = () => {
    setIsFiltered(false);
    setFilteredAdherents([]);
  };

  const handleReglement = (id) => {
    console.log("Reglement demandé pour l’adhérent :", id);
    // TODO: ajouter la logique plus tard
  };

  const handleDelete = async (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet adhérent ?")) {
      try {
        await fetch(`/api/adherents/${id}`, { method: "DELETE" });
        mutate();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'adhérent :", error);
      }
    }
  };

  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  function sortAdherents(list) {
    if (!Array.isArray(list)) return [];
    if (!sortConfig.key) return list;
    const sorted = [...list].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Pour le tri par nom, insensible à la casse
      if (sortConfig.key === "name") {
        aValue = (aValue || "").toLowerCase();
        bValue = (bValue || "").toLowerCase();
      }
      // Pour le tri par date, convertir en date
      if (sortConfig.key === "created_at" || sortConfig.key === "membership_start") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  const renderAdherents = () => {
    const list = isFiltered ? filteredAdherents : adherentsList;
    const sortedList = sortAdherents(list || []);
    if (error) return <p className={styles.emptyMessage}>Erreur de chargement</p>;
    if (!Array.isArray(list) || list.length === 0)
      return <p className={styles.emptyMessage}>Aucun adhérent trouvé</p>;

    return (
      <ul className={styles.memberList}>
        {sortedList.map((adherent, index) => (
          <li key={adherent.id || `adherent-${index}`} className={styles.memberCard}>
            <div className={styles.memberInfo}>
              <h2 className={styles.memberName}>
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                {adherent.name} {adherent.surname}
              </h2>
              <p className={styles.memberContact}>{adherent.mail}</p>
              <p className={styles.memberContact}>{adherent.phone}</p>
              <p className={styles.memberAddress}>
                {adherent.address}
                {adherent.complement && `, ${adherent.complement}`} {adherent.cp} {adherent.city}
              </p>
            </div>
            <div className={styles.memberActions}>
              <button className={styles.actionButton} onClick={() => handleReglement(adherent.id)}>
                <FontAwesomeIcon icon={faEuroSign} />
              </button>
              <Link
                href={`/dashboard/adherents/edit/${adherent.id}`}
                className={styles.actionButton}
                title="Modifier"
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </Link>
              <button className={styles.actionButton} onClick={() => handleDelete(adherent.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  if (status === "loading") return <p>Chargement...</p>;
  if (status === "unauthenticated") return null;

  return (
    <main className={styles.dashboardContainer}>
      <SideMenu />
      <div className={styles.dashboardContent}>
        <header className={styles.dashboardHeader}>
          <div className={styles.dashboardActions}>
            <FiltersAdherent
              adherents={adherentsList}
              onFilter={handleFilter}
              onReset={resetFilters}
            />
            <Link href="/dashboard/adherents/add" className={styles.addButton}>
              <FontAwesomeIcon icon={faPlus} /> Ajouter
            </Link>
          </div>
        </header>
        <section className={styles.memberSection}>
          <h2 className={styles.sectionSubtitle}>
            Nombre d&apos;adhérents : {isFiltered
              ? filteredAdherents.length
              : adherentsList.length}
          </h2>
          <div className={styles.sortBar}>
            <span className={styles.sortLabel}>Trier par&nbsp;:</span>
            <span className={styles.sortControls}>
              <button
                className={styles.sortButton}
                onClick={() =>
                  setSortConfig({
                    key: "id",
                    direction:
                      sortConfig.key === "id" && sortConfig.direction === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
                title="Trier par ID"
              >
                ID {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </button>
              <button
                className={styles.sortButton}
                onClick={() =>
                  setSortConfig({
                    key: "name",
                    direction:
                      sortConfig.key === "name" && sortConfig.direction === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
                title="Trier par nom"
              >
                Nom {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </button>
              <button
                className={styles.sortButton}
                onClick={() =>
                  setSortConfig({
                    key: "created_at",
                    direction:
                      sortConfig.key === "created_at" && sortConfig.direction === "asc"
                        ? "desc"
                        : "asc",
                  })
                }
                title="Trier par date d'inscription"
              >
                Date {sortConfig.key === "created_at" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </button>
            </span>
          </div>
          {renderAdherents()}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
