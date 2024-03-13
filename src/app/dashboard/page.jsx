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
import cookie from "cookie";
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

  // Use state with the initial count
  const [nombreAdherents, setNombreAdherents] = useState(initialAdherentsCount);

  /*data fetching - récupération des données  avec swr*/
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: adherents, mutate } = useSWR(
    session?.data?.user?.name
      ? `/api/adherents?name=${session.data.user.name}`
      : null,
    fetcher
  );

  // useEffect(() => {
  //   // Gestion du chargement et des erreurs
  //   if (isLoading) {
  //     console.log("Chargement des données depuis l'API...");
  //   } else if (error) {
  //     console.error("Erreur lors de la récupération des données :", error);
  //   } else {
  //     console.log("Données récupérées :", adherents);
  //   }
  // }, [isLoading, error, adherents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mail, phone, adress } = e.target.elements;

    try {
      await fetch("/api/adherents", {
        method: "POST",
        body: JSON.stringify({
          name,
          mail,
          phone,
          adress,
        }),
        // // Définition des en-têtes pour les cookies
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Set-Cookie': cookie.serialize('your_cookie_name', 'cookie_value', {
        //     sameSite: 'None', // Définir SameSite sur None
        //     secure: true // Définir Secure sur true pour les connexions HTTPS
        //   })
        // }
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
      alert("Une erreur est survenue lors de l'ajout de l'adhérent.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/adherents/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction handleEdit manquante
  const handleEdit = (id) => {
    // Implémentez la logique de modification ici
  };

  if (session.status === "loading") {
    return <p>Chargement...</p>;
  }
  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
    return null;
  }
  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <SideMenu />
        <div className={styles.dashboardContent}>
          <h2>Nombre d'adhérents : {nombreAdherents}</h2>
          <ul className={styles.adherentsList}>
            {dataAdherents.map((adherent) => (
              <li key={adherent._id} className={styles.adherent}>
                <div className={styles.info}>
                  <h2>{adherent.name}</h2>
                  <p>{adherent.mail}</p>
                  <p>{adherent.phone}</p>
                  <p>{adherent.adress}</p>
                </div>
                <div className={styles.actions}>
                  <div>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className={styles.pencilIcon}
                      onClick={() => handleEdit(adherent._id)}
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
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Ajouter un nouvel adhérent</h1>
          <input
            type="text"
            placeholder="Nom"
            name="name"
            id="name"
            autoComplete="name"
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            name="mail"
            id="mail"
            autoComplete="email"
          />
          <input
            type="tel"
            placeholder="Téléphone"
            name="phone"
            id="phone"
            autoComplete="tel"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Adresse"
            name="adress"
            id="adress"
            autoComplete="street-address"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Ajouter</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;