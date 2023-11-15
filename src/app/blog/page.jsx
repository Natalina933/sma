
import styles from "./page.module.css";
import Image from "next/legacy/image";
import Link from "next/link";

//devra etre plus modulable

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
        {data.map((activity) => (
          <Link href={`/blog/${activity._id}`} key={activity._id} className={styles.container} >
            <div className={styles.imgContainer}>
              <Image
                src={activity.img}
                className={styles.img}
                width={600}
                height={550}
                priority={true}
                alt={activity.title}
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{activity.title}</h1>
              <p className={styles.date}>{activity.date}</p>
            </div>
            <div>
              <div>
                <div className={styles.price}> {activity.price}</div>
              </div>
              <div>{activity.rating}</div>
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
