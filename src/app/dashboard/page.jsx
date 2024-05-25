"use client";
import { useSession } from "next-auth/react"; // Import du hook useSession pour gérer la session utilisateur
import styles from "./page.module.css";
import useSWR from "swr"; //Bibliothèque de React Hooks pour la récupération de données
import { useRouter } from "next/navigation";
import { useState } from "react";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal"; // Import de react-modal
import { useRef } from "react";

import { VisitorCounter } from "@/components/visitorCounter/VisitorCounter";
// import Adherent from "@/models/Adherent";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

// Style de la modale
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
  //*ancienne structure
  //   const [err, setErr] = useState([false]);
  //   const [isLoading, setIsLoading] = useState([false]);

  //   useEffect(() => {
  //     const getData = async () => {
  //       setIsLoading(true)
  //       const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //         cache: "no-store",//dynamic data fetching - récupérera les données de manière dynamique, à chaque demande
  //       });
  //       if (!res.ok) {
  //         setErr(true);
  //       }
  //       const data = await res.json()
  //       setData(data)
  //       setIsLoading(false)
  //     };
  //     getData()
  //   }, []);

  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // Session and router
  const { data: session, status } = useSession();
  const router = useRouter();
  // const initialAdherentsCount = dataAdherents.length;
  // const [nombreAdherents, setNombreAdherents] = useState(initialAdherentsCount);
   
  
  // Données du formulaire
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
  // ID de l'adhérent en cours d'édition (facultatif)
  const [currentId, setCurrentId] = useState(null);
  // Déclaration du state et du setter pour la modale
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalRef = useRef(null);
  /*data fetching - récupération des données avec swr*/
  const fetcher = (url) => fetch(url).then((res) => res.json());
  // Utilisez une valeur par défaut si les données de session ne sont pas encore disponibles
  const initialAdherents = session?.data?.adherents?.name ? [] : null;
  const { data: adherents, mutate } = useSWR(
    "/api/adherents", // Récupérez tous les adhérents, quelles que soient les données de session
    fetcher,
    { initialData: initialAdherents } // Fournir un tableau vide initial si aucune donnée pour le moment
  );
  // Gestion des données du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
 // Soumission du formulaire avec méthode basée sur currentId
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = currentId ? "PUT" : "POST";
    const url = currentId ? `/api/adherents?id=${currentId}` : "/api/adherents";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur d'enregistrement...@@ oHHHH!!!");
      }
         // Mettre à jour les données après une création/mise à jour réussie
            mutate();
      // Réinitialiser le formulaire et fermer la modale
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
      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.message || "Une erreur est survenue lors de l'ajout de l'adhérent.");
    }
  };
  // Gestion de la modification pour remplir les données du formulaire et ouvrir la modale
  const handleEdit = (adherent) => {
    setFormData(adherent);
    setCurrentId(adherent._id);
    setModalIsOpen(true);
  };
  // Fonction de suppression avec gestion des erreurs
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/adherents/${id}`, { method: "DELETE" });
      mutate(); // Mettre à jour les données après la suppression
    } catch (error) {
      console.error(error);
    }
  };

  // Affichage de la liste des adhérents avec logique conditionnelle
  const renderAdherents = () => {
    if (!adherents || adherents.length === 0) {
      return <p>Aucun adhérent trouvé.</p>;
    }
  
    return (
      <ul className={styles.adherentsList}>
        {adherents.map((adherent) => (
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
        <>
          <SideMenu />
          <div className={styles.dashboardContent}>
            <h2>Nombre d'adhérents : {adherents ? adherents.length : 0}</h2>
            <button className={styles.addButton} onClick={() => setModalIsOpen(true)}>
              <FontAwesomeIcon icon={faPlus} /> enregistrer
            </button>
            {renderAdherents()}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={customStyles}
              contentLabel="enregistrer un adhérent"
            >
              <h1>Modifier un adhérent</h1>
              <form className={styles.new} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                  <input type="text" placeholder="ID" name="id" value={formData.id} onChange={handleChange} className={styles.input} />
                  <input
                    type="text"
                    placeholder="Nom"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Prénom"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="mail"
                    value={formData.mail}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Adresse"
                    name="adress"
                    value={formData.adress}
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
                    />
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
              <button onClick={() => setModalIsOpen(false)} className={styles.button}>
                Fermer
              </button>
            </Modal>
          </div>
        </>
      );
    }
  };

  return <div className={styles.container}>{renderContent()}</div>;
};

export default Dashboard;