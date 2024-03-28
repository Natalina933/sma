"use client";
import { useSession } from "next-auth/react"; // Import du hook useSession pour gérer la session utilisateur
import styles from "./page.module.css";
import useSWR from "swr"; //Bibliothèque de React Hooks pour la récupération de données
import { useRouter } from "next/navigation";
import { useState } from "react";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { dataAdherents } from "../datas/adherents/dataAdherents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { VisitorCounter } from "@/components/visitorCounter/VisitorCounter";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

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

  const session = useSession();
  const router = useRouter();
  const initialAdherentsCount = dataAdherents.length;
  const [nombreAdherents, setNombreAdherents] = useState(initialAdherentsCount);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    mail: "",
    phone: "",
    adress: "",
    complement: "",
    cp: "",
    city: "",
  });

  /*data fetching - récupération des données  avec swr*/
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: adherents, mutate } = useSWR(
    session?.data?.user?.name
      ? `/api/adherents?name=${session.data.user.name}`
      : null,
    fetcher
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/adherents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'adhérent.");
      }

      mutate();
      setFormData({
        name: "",
        surname: "",
        mail: "",
        phone: "",
        adress: "",
        complement: "",
        cp: "",
        city: "",
      });
      setNombreAdherents((prevNombreAdherents) => prevNombreAdherents + 1);
    } catch (error) {
      console.error(error);
      alert(error.message || "Une erreur est survenue lors de l'ajout de l'adhérent.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/adherents/${id}`, {
        method: "DELETE",
      });
      mutate();
      setNombreAdherents((prevNombreAdherents) => prevNombreAdherents - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    // Logic for editing
  };

  const renderAdherents = () => {
    return (
      <ul className={styles.adherentsList}>
        {dataAdherents.map((adherent) => (
          <li key={adherent.id} className={styles.adherent}>
            <div className={styles.info}>
              <h2>{adherent.name} {adherent.surname}</h2>
              <p>{adherent.mail}</p>
              <p>{adherent.phone}</p>
              <p>{adherent.adress}</p>
              <p>{adherent.complement}</p>
              <p>{adherent.cp} {adherent.city}</p>
            </div>
            <div className={styles.actions}>
              <div>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className={styles.pencilIcon}
                  onClick={() => handleEdit(adherent.id)}
                />
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faTrash}
                  className={styles.trashIcon}
                  onClick={() => handleDelete(adherent.id)}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (session.status === "loading") {
      return <p>Chargement...</p>;
    }
    if (session.status === "unauthenticated") {
      router.push("/dashboard/login");
      return null;
    }
    if (session.status === "authenticated") {
        return (
          <>
            <SideMenu />
            <div className={styles.dashboardContent}>
              <h2>Nombre d'adhérents : {nombreAdherents}</h2>
              {renderAdherents()}
              <form className={styles.new} onSubmit={handleSubmit}>
                <h1>Ajouter un nouvel adhérent</h1>
                <div className={styles.inputGroup}>
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
                  Ajouter
                </button>
              </form>
            </div>
          </>
        );
      }
    };

    return <div className={styles.container}>{renderContent()}</div>;
  };

  export default Dashboard;
