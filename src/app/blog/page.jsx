"user client";
import styles from "./page.module.css";
import Button from "@/components/Button/Button";
import Image from "next/legacy/image";
import Link from "next/link";

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts',{
cache:"no-store",
});


  if (!res.ok) {
     // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const Blog = async() => {
  const data = await getData()
  return (
    <div className={styles.mainContainer}>
      {data.map(item=>(
      <Link href="/blog/testId" className={styles.container} key={item.id}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            width={400}
            height={250}
            src="/contact.jpg"
            alt=""
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{item.titre}</h1>
          <p className={styles.desc}>{item.titre}</p>
        </div>
      </Link>
      ))}
    </div>
  );
};

export default Blog;
