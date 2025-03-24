import styles from "./page.module.css";
import Image from "next/legacy/image";
import { dataActivitys } from "@/app/datas/activitys/dataActivitys";
import { notFound } from "next/navigation";
import Button from "@/components/common/button/Button";
import Link from 'next/link';
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
      <Link href="/activity" className={styles.backButton}>
        <button>Retour aux activités</button>
      </Link>
      <h1 className={styles.catTitle}>{params.category}</h1>
      <div className={styles.activityList}>
        {data.map((activity) => (
          <div className={styles.item} key={activity.id}>
            <div className={styles.imgContainer}>
              <Image
                className={styles.img}
                width={400}
                height={300}
                src={activity.img}
                alt={`Image de ${activity.title}`}
                objectFit="cover"
                layout="responsive"
              />
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{activity.title}</h2>
              <p className={styles.desc}>{activity.desc}</p>
              <p className={styles.date}>{activity.date}</p>
              <Button text="S'inscrire" url="#" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
