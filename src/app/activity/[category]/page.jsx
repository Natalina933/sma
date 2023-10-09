import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import Image from "next/legacy/image";

const Category = ({ params }) => {
  console.log(params);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>
      <div className={styles.item}>
        <div className={styles.content}>
          <h1 className={styles.title}>Test</h1>
          <p className={styles.desc}>description</p>
          <Button text="En savoir plus" url="#" />
        </div>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            width={300}
            height={200}
            src="/contact.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
