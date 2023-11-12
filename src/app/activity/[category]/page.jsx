import styles from "./page.module.css";
import Image from "next/legacy/image";
import { dataActivitys } from "../../datas/activitys/dataActivitys";
import { notFound } from "next/navigation";
import Button from "../../../components/Button/button";


//devra être plus modulable

const getData = (cat) => {
  const data = dataActivitys[cat];
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
      {data.map((activity) => (
        <div className={styles.item} key={activity.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{activity.title}</h1>
            <h2 className={styles.desc}>{activity.desc}</h2>
            <p className={styles.date}>{activity.date}</p>
            <Button text="S'inscrire" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              width={300}
              height={200}
              src={activity.img}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
