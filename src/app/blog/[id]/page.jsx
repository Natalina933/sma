import Image from "next/legacy/image";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Button from "../../../components/button/Button";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

//devra etre plus modulable

async function getData(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      // Cela déclenchera la limite d'erreur `error.js` la plus proche
      // throw new Error("");
      console.error("Échec de la récupération des données");
      return notFound();
    }
    return res.json();
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }
}
// Dynamic metadata
export async function generateMetadata({ params }) {
  try {
    const post = await getData(params.id);

    return {
      title: post.title,
      description: post.desc,
    };
  } catch (error) {
    console.error("An error occurred while generating metadata:", error);
  }
}
// Composant BlogPost
const BlogPost = async ({ params }) => {
  try {
    const data = await getData(params.id);
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.programme}>{data.programme}</p>
            <div className={styles.author}>
              <Image
                className={styles.avatar}
                width={40}
                height={40}
                src={data.img}
                priority={true}
                alt={data.title}
              />
              <span className={styles.username}>{data.username}</span>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              className={styles.img}
              width={400}
              height={250}
              src={data.img}
              priority={true}
              alt="username"
            />
          </div>
        </div>
        <Button url="#" text="s'inscrire" />
      </div>
    );
  } catch (error) {
    console.error("An error occurred while rendering the component:", error);
    // Vous pouvez choisir de retourner un composant d'erreur personnalisé ici.
    // Par exemple, vous pourriez afficher un message d'erreur spécifique.
    return <div>Une erreur s'est produite : {error.message}</div>;
  }
};

export default BlogPost;
