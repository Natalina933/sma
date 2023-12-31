"use client";
// import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import useSWR from "swr"; //Bibliothèque de React Hooks pour la récupération de données
import { useRouter } from "next/navigation";
import Image from "next/legacy/image";

//devra etre plus modulable



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
  const session = useSession();
  const router = useRouter();

  // Gestion des erreurs
  // const [erreurs, setErreurs] = useState([]);

  // const handleError = (erreur) => {
  //   setErreurs([erreur]);
  // };
  /*data fetching - récupération des données  avec swr*/
  const fetcher = (url) => fetch(url).then((res) => res.json());
  // Gestion des formulaires
  const { data, mutate, error, isLoading } = useSWR(
    "/api/posts?username=${session?.data?.user?.name}",
    fetcher
  );

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const desc = e.target.desc.value;
    const img = e.target.img.value;
    const content = e.target.content.value;
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset()
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch("/api/posts/${id}", {
        method: "DELETE",
      });
      mutate()
    } catch (error) {
      console.log(error);
    }
  };
  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post) => (
              <div className={styles.post} key={post._id}>
                <div className={styles.imgContainer}>
                  <Image src={post.img} alt="" width={200} height={100} />
                </div>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <span
                  className={styles.delete}
                  onClick={() => handleDelete(post._id)}
                >
                  X
                </span>
              </div>
            ))}
        </div>
        <form className={styles.new} onSubmit={handleSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" id="postTitleInput" className={styles.input} />
          <input type="text" placeholder="Desc" id="postDescInput" className={styles.input} />
          <input type="text" placeholder="Image" id="postImgInput" className={styles.input} />
          <textarea
            placeholder="Content"
            id="postContentInput"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }
};

export default Dashboard;