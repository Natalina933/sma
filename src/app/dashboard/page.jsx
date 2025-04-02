"use client";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faPlus, faUser, faMoneyBill, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-modal';
import FiltersAdherent from "@/components/dashboard/filtersAdherent/FiltersAdherent";
import { VisitorCounter } from "@/components/visitorCounter/VisitorCounter";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '1rem',
    padding: '2rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
    border: 'none',
    maxWidth: '600px',
    width: '90%',
    overflow: 'auto',
    maxHeight: '90vh'
  }
};

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const initialAdherents = session?.data?.adherents?.name ? [] : null;
  const { data: adherents, mutate } = useSWR(
    "/api/adherents",
    fetcher,
    { initialData: initialAdherents }
  );
  const [filteredAdherents, setFilteredAdherents] = useState(adherents || []);

  useEffect(() => {
    if (adherents) {
      setFilteredAdherents(adherents);
    }
  }, [adherents]);

  const handleFilter = (filterData) => {
    if (adherents) {
      const filtered = adherents.filter(adherent => {
        return Object.keys(filterData).every(key => {
          if (filterData[key] === '') return true;
          return adherent[key]?.toString().toLowerCase().includes(filterData[key].toLowerCase());
        });
      });
      setFilteredAdherents(filtered);
    }
  };

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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const method = currentId ? 'PUT' : 'POST';
    const url = currentId ? `/api/adherents/${currentId}` : '/api/adherents';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la modification du formulaire: ${response.statusText}`);
      }

      const result = await response.json();
      mutate();
      handleCloseModal();
      alert('Modification réussie !');
    } catch (error) {
      console.error("Erreur lors de la modification du formulaire:", error);
      alert('Erreur lors de la modification du formulaire');
    }
  };

  const handleEdit = (adherent) => {
    setFormData(adherent);
    setCurrentId(adherent._id);
    setModalIsOpen(true);
  };

  const generateNewId = () => {
    if (!adherents || adherents.length === 0) {
      return 1;
    }
    const maxId = Math.max(...adherents.map((adherent) => parseInt(adherent.id, 10) || 0));
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

  const renderAdherents = () => {
    if (!filteredAdherents || filteredAdherents.length === 0) {
      return <p className={styles.emptyMessage}>Aucun adhérent trouvé</p>;
    }

    return (
      <ul className={styles.memberList}>
        {filteredAdherents.map((adherent) => (
          <li key={adherent._id} className={styles.memberCard}>
            <div className={styles.memberInfo}>
              <h2 className={styles.memberName}>
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} /> {adherent.name} {adherent.surname}
              </h2>
              <p className={styles.memberContact}>{adherent.mail}</p>
              <p className={styles.memberContact}>{adherent.phone}</p>
              <p className={styles.memberAddress}>{adherent.address}, {adherent.complement} {adherent.cp} {adherent.city}</p>
            </div>
            <div className={styles.memberActions}>
              <button
                className={styles.actionButton}
                onClick={() => handleReglement(adherent._id)}
                aria-label={`Reglement ${adherent.name} ${adherent.surname}`}
              >
                <FontAwesomeIcon icon={faEuroSign} />
              </button>
              <button
                className={styles.actionButton}
                onClick={() => handleEdit(adherent)}
                aria-label={`Modifier ${adherent.name} ${adherent.surname}`}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
              <button
                className={styles.actionButton}
                onClick={() => handleDelete(adherent._id)}
                aria-label={`Supprimer ${adherent.name} ${adherent.surname}`}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>

            </div>
          </li>
        ))}
      </ul>
    );
  };


  const renderContent = () => {
    if (status === "loading") {
      return <p>Chargement...</p>;
    }
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
      return null;
    }
    if (status === "authenticated") {
      return (
        <main className={styles.dashboardContainer}>
          <SideMenu />
          <div className={styles.dashboardContent}>
            <header className={styles.dashboardHeader}>
              <div className={styles.dashboardActions}>
                <FiltersAdherent adherents={adherents} onFilter={handleFilter} />
                <button className={styles.addButton} onClick={handleAdd}>
                  <FontAwesomeIcon icon={faPlus} /> Ajouter
                </button>
              </div>
            </header>
            <section className={styles.memberSection}>
              <h2 className={styles.sectionSubtitle}>Nombre d&apos;adhérents : {adherents ? adherents.length : 0}</h2>
              {renderAdherents()}
            </section>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
              style={customStyles}
              contentLabel="enregistrer un adhérent"
            >
              <h2 className={styles.modalTitle}>{currentId ? "Modifier" : "Ajouter"} un adhérent</h2>
              <form className={styles.modalForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>Nom:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                  {errors.name && <p className={styles.formError}>{errors.name}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="surname" className={styles.formLabel}>Prénom:</label>
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                  {errors.surname && <p className={styles.formError}>{errors.surname}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="mail" className={styles.formLabel}>Email:</label>
                  <input
                    type="email"
                    id="mail"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                  />
                  {errors.mail && <p className={styles.formError}>{errors.mail}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.formLabel}>Téléphone:</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.formInput}
                    required
                    pattern="[0-9]{10}"
                  />
                  {errors.phone && <p className={styles.formError}>{errors.phone}</p>}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address" className={styles.formLabel}>Adresse:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="complement" className={styles.formLabel}>Complément:</label>
                  <input
                    type="text"
                    id="complement"
                    name="complement"
                    value={formData.complement}
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Ville:</label>
                  <div className={styles.cityGroup}>
                    <input
                      type="text"
                      placeholder="Code Postal"
                      name="cp"
                      value={formData.cp}
                      onChange={handleChange}
                      className={styles.formInput}
                      pattern="[0-9]{5}"
                    />
                    {errors.cp && <p className={styles.formError}>{errors.cp}</p>}
                    <input
                      type="text"
                      placeholder="Ville"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={styles.formInput}
                    />
                  </div>
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.primaryButton}>Enregistrer</button>
                  <button type="button" onClick={handleCloseModal} className={styles.secondaryButton}>Annuler</button>
                </div>
              </form>
            </Modal>
          </div>
        </main>
      );
    }
  };

  return (
    <div className={styles.container}>
      {renderContent()}
    </div>
  );
};

export default Dashboard;