"user client";
import styles from "./page.module.css";
// import Button from "@/components/Button/Button";
import Image from "next/legacy/image";
import Link from "next/link";

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: "no-store",
  });


  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Échec de la récupération des données");
  }
  return res.json();
}

const Blog = async () => {
  try {
    const data = await getData();
    return (
      <div className={styles.mainContainer}>
        {data.map((item) => (
          <Link href={`/blog/${item.id}`} className={styles.container} key={item.id}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img}
                width={300}
                height={150}
                src="/contact.jpg"
                alt=""
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.body}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    // Vous pouvez choisir de retourner un composant d'erreur personnalisé ici.
    // Par exemple, vous pourriez afficher un message d'erreur spécifique.
    return <div>Une erreur sest produite : {error.message}</div>;
  }
};

export default Blog;
