"user client";
import styles from "./page.module.css";
// import Button from "@/components/Button/Button";
import Image from "next/legacy/image";
import Link from "next/link";
// devra etre mis dans components ou utils doit faire appel à un maximum d'import

async function getData() {
  const res = await fetch('http://localhost:3000/api/posts', {
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
          <Link href={`/blog/${item._id}`} className={styles.container} key={item.id}>
            <div className={styles.imgContainer}>
              <Image
                src={item.img}
                className={styles.img}
                width={300}
                height={150}
                alt=""
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{item.title}</h1>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("An error occurred while fetching data:", error);

    return <div>Une erreur sest produite : {error.message}</div>;
  }
};

export default Blog;
