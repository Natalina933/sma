"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";// Import du hook useSession pour gérer la session utilisateur
import styles from "./page.module.css";
import useSWR from "swr"; //Bibliothèque de React Hooks pour la récupération de données
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";
import SideMenu from "@/components/dashboard/sideMenu/SideMenu";
import { dataAdherents } from "../datas/adherents/dataAdherents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'



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



  /*data fetching - récupération des données  avec swr*/
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: adherents, mutate } = useSWR(
    `/api/adherents?name=${session?.data?.user?.name}`,
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

  if (session.status === "loading") {
    return <p>Chargement...</p>;
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const mail = e.target.mail.value;
    const phone = e.target.phone.value;
    const adress = e.target.adress.value;

    try {
      await fetch("/api/adherents", {
        method: "POST",
        body: JSON.stringify({
          name,
          mail,
          phone,
          adress,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
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


  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <SideMenu />
        <div>
          <h1>Liste des adhérents</h1>
          <div className={styles.adherentsList}>
            {dataAdherents.map((adherent) => (
              <div key={adherent._id} className={styles.adherent}>
                <div className={styles.info}>
                  <h2>{adherent.name}</h2>
                  <p>{adherent.mail}</p>
                  <p>{adherent.phone}</p>
                  <p>{adherent.adress}</p>
                </div>
                <div className={styles.actions}>
                  {/* Bouton Modifier */}
                  <div>
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      className={styles.pencilIcon}
                      onClick={() => handleEdit(adherent._id)} // Ajoutez la fonction pour gérer la modification
                    />
                  </div>
                  {/* Icône de la poubelle */}
                  <div>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.trashIcon}
                      onClick={() => handleDelete(adherent._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Ajouter un nouvel adhérent</h1>
          <input
            type="text"
            placeholder="Nom"
            id="nomInput"
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            id="emailInput"
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Téléphone"
            id="telephoneInput"
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Adresse"
            id="adresseInput"
            className={styles.input}
          />
          <button className={styles.button}>Ajouter</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;