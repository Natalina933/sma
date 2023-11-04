import Button from "@/components/Button/button";
import styles from "./page.module.css";
import Image from "next/legacy/image";
import { items } from "../../datas/activitys/data";
import { notFound } from "next/navigation";

const getData = (cat) => {
  const data = items[cat];
  if (data) {
    return data;
  }
  return notFound();
};

const Category = ({ params }) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>{params.category}</h1>
      {data.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.description}</p>
            <Button text="En savoir plus" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              width={300}
              height={200}
              src={item.img}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
