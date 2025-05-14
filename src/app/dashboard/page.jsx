"use client";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faPlus, faUser, faEuroSign, faFilter } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import FiltersAdherent from "@/components/dashboard/filtersAdherent/FiltersAdherent";
import { VisitorCounter } from "@/components/visitorCounter/VisitorCounter";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1rem",
    padding: "2rem",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
    border: "none",
    maxWidth: "600px",
    width: "90%",
    overflow: "auto",
    maxHeight: "90vh",
  },
};

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: adherents, error, mutate } = useSWR("/api/adherents", fetcher);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    surname: "",
    mail: "",
    phone: "",
    address: "",
    complement: "",
    cp: "",
    city: "",
  });

  // Redirection sécurisée en cas de non-authentification
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [status, router]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Le nom est requis";
    if (!formData.surname) newErrors.surname = "Le prénom est requis";
    if (!formData.mail) {
      newErrors.mail = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.mail)) {
      newErrors.mail = "L'email est invalide";
    }
    if (!formData.phone) {
      newErrors.phone = "Le téléphone est requis";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Le téléphone est invalide";
    }
    if (formData.cp && !/^\d{5}$/.test(formData.cp)) {
      newErrors.cp = "Le code postal est invalide";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = () => setModalIsOpen(true);
  const handleCloseModal = () => {
    setModalIsOpen(false);
    setFormData({
      id: "",
      name: "",
      surname: "",
      mail: "",
      phone: "",
      address: "",
      complement: "",
      cp: "",
      city: "",
    });
    setCurrentId(null);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const method = currentId ? "PUT" : "POST";
    const url = currentId ? `/api/adherents/${currentId}` : "/api/adherents";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Tente de récupérer le message d'erreur détaillé de l'API
        let errorMsg = `Erreur lors de la ${method === "POST" ? "création" : "modification"} : ${response.statusText}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.message) {
            errorMsg = errorData.message;
          }
        } catch {
          // Ignore si la réponse n'est pas JSON
        }
        throw new Error(errorMsg);
      }

      await response.json();
      mutate();
      handleCloseModal();

      // Message adapté selon l'action
      if (method === "POST") {
        alert("Ajout réussi !");
      } else {
        alert("Modification réussie !");
      }
    } catch (error) {
      // Affiche le message précis si disponible, sinon un message générique
      console.error("Erreur lors de la soumission du formulaire :", error);
      alert(error.message || "Une erreur est survenue lors de l'envoi du formulaire.");
    }
  };

  const handleEdit = (adherent) => {
    setFormData({
      id: adherent.id || "",
      name: adherent.name || "",
      surname: adherent.surname || "",
      mail: adherent.mail || "",
      phone: adherent.phone || "",
      address: adherent.address || "",
      complement: adherent.complement || "",
      cp: adherent.cp || "",
      city: adherent.city || "",
    });
    setCurrentId(adherent.id);
    handleOpenModal();
  };

  const generateNewId = () => {
    if (!adherents || adherents.length === 0) return 1;
    const maxId = Math.max(
      ...adherents.map((adherent) => parseInt(adherent.id, 10) || 0)
    );
    return maxId + 1;
  };

  const handleAdd = () => {
    const newId = generateNewId();
    setFormData({
      id: newId.toString(),
      name: "",
      surname: "",
      mail: "",
      phone: "",
      address: "",
      complement: "",
      cp: "",
      city: "",
    });
    setCurrentId(null);
    handleOpenModal();
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
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  function sortAdherents(list) {
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
    const list = isFiltered ? filteredAdherents : adherents;
    const sortedList = sortAdherents(list || []); if (error) return <p className={styles.emptyMessage}>Erreur de chargement</p>;
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
              <button className={styles.actionButton} onClick={() => handleEdit(adherent)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button className={styles.actionButton} onClick={() => handleDelete(adherent.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // Affichage conditionnel basé sur le status de la session
  if (status === "loading") return <p>Chargement...</p>;
  if (status === "unauthenticated") return null;

  return (
    <main className={styles.dashboardContainer}>
      <SideMenu />
      <div className={styles.dashboardContent}>
        <header className={styles.dashboardHeader}>
          <div className={styles.dashboardActions}>
            <FiltersAdherent
              adherents={adherents || []}
              onFilter={handleFilter}
              onReset={resetFilters}
            />
            <button className={styles.addButton} onClick={handleAdd}>
              <FontAwesomeIcon icon={faPlus} /> Ajouter
            </button>
          </div>
        </header>
        <section className={styles.memberSection}>
          <h2 className={styles.sectionSubtitle}>
            Nombre d&apos;adhérents : {isFiltered ? filteredAdherents.length : adherents ? adherents.length : 0}
            <span className={styles.sortControls}>
              <button
                className={styles.sortButton}
                onClick={() => setSortConfig({ key: "id", direction: sortConfig.key === "id" && sortConfig.direction === "asc" ? "desc" : "asc" })}
                title="Trier par ID"
              >
                ID {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </button>
              <button
                className={styles.sortButton}
                onClick={() => setSortConfig({ key: "name", direction: sortConfig.key === "name" && sortConfig.direction === "asc" ? "desc" : "asc" })}
                title="Trier par nom"
              >
                Nom {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </button>
              <button
                className={styles.sortButton}
                onClick={() => setSortConfig({ key: "created_at", direction: sortConfig.key === "created_at" && sortConfig.direction === "asc" ? "desc" : "asc" })}
                title="Trier par date d'inscription"
              >
                Date {sortConfig.key === "created_at" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </button>
            </span>
          </h2>

          {renderAdherents()}
        </section>
      </div>
      {/* Modal d'ajout/édition */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Formulaire Adhérent"
        ariaHideApp={false}
      >
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
          <input
            type="text"
            name="surname"
            placeholder="Prénom"
            value={formData.surname}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.surname && <span className={styles.error}>{errors.surname}</span>}
          <input
            type="email"
            name="mail"
            placeholder="Email"
            value={formData.mail}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.mail && <span className={styles.error}>{errors.mail}</span>}
          <input
            type="text"
            name="phone"
            placeholder="Téléphone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="complement"
            placeholder="Complément"
            value={formData.complement}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            type="text"
            name="cp"
            placeholder="Code postal"
            value={formData.cp}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.cp && <span className={styles.error}>{errors.cp}</span>}
          <input
            type="text"
            name="city"
            placeholder="Ville"
            value={formData.city}
            onChange={handleChange}
            className={styles.input}
          />
          <div className={styles.modalActions}>
            <button type="submit" className={styles.saveButton}>
              {currentId ? "Modifier" : "Ajouter"}
            </button>
            <button type="button" className={styles.cancelButton} onClick={handleCloseModal}>
              Annuler
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default Dashboard;
