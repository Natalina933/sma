"use client"
// import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr"; //Bibliothèque de React Hooks pour la récupération de données

//devra etre plus modulable


/*data fetching - récupération des données*/

const Dashboard = () => {
  //   const [data, setData] = useState([]);
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
  const session = useSession()
  console.log(session);

  //client-side data fetching avec swr
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, err, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );
 
  return <div className={styles.container}>Dashboard</div>;
};

export default Dashboard;
