"use client";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
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
  },
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
      return <p>Aucun adhérent trouvé</p>;
    }

    return (
      <ul className={styles.adherentsList}>
        {filteredAdherents.map((adherent) => (
          <li key={adherent._id} className={styles.adherent}>
            <div className={styles.info}>
              <h1>{adherent.id}</h1>
              <h2>{adherent.name} {adherent.surname}</h2>
              <p>{adherent.mail}</p>
              <p>{adherent.phone}</p>
              <p>{adherent.address}</p>
              <p>{adherent.complement}</p>
              <p>{adherent.cp} {adherent.city}</p>
            </div>
            <div className={styles.actions}>
              <div>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className={styles.pencilIcon}
                  onClick={() => handleEdit(adherent)}
                />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.trashIcon}
                  onClick={() => handleDelete(adherent._id)}
                />
              </div>
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
        <main className={styles.container}>
          <div className={styles.sideMenu}>
            <SideMenu />
          </div>
          <div className={styles.mainContent}>
            <h1>Tableau de bord</h1>
            <div className={styles.header}>
              <FiltersAdherent adherents={adherents} onFilter={handleFilter} />
              <button className={styles.addButton} onClick={handleAdd}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter
              </button>
            </div>
            <section className="listSection">
              <h2>Nombre d&apos;adhérents : {adherents ? adherents.length : 0}</h2>
              {renderAdherents()}
            </section>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
              style={customStyles}
              contentLabel="enregistrer un adhérent"
            >
              <h1>{currentId ? "Modifier" : "Ajouter"} un adhérent</h1>
              <form className={styles.new} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="ID"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className={styles.input}
                    readOnly
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                  {errors.name && <p className={styles.error}>{errors.name}</p>}
                  <input
                    type="text"
                    placeholder="Prénom"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                  {errors.surname && <p className={styles.error}>{errors.surname}</p>}
                  <input
                    type="email"
                    placeholder="Email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                  {errors.mail && <p className={styles.error}>{errors.mail}</p>}
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                    required
                    pattern="\d{10}"
                  />
                  {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                  <input
                    type="text"
                    placeholder="Adresse"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Complément"
                    name="complement"
                    value={formData.complement}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <div className={styles.cityGroup}>
                    <input
                      type="text"
                      placeholder="Code Postal"
                      name="cp"
                      value={formData.cp}
                      onChange={handleChange}
                      className={styles.input}
                      pattern="\d{5}"
                    />
                    {errors.cp && <p className={styles.error}>{errors.cp}</p>}
                    <input
                      type="text"
                      placeholder="Ville"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <button type="submit" className={styles.button}>
                  Enregistrer
                </button>
              </form>
              <button onClick={handleCloseModal} className={styles.button}>
                Fermer
              </button>
            </Modal>
          </div>
        </main>
      );
    }
  };

  return <div className={styles.container}>{renderContent()}</div>;
};

export default Dashboard;