
import Image from 'next/image';
import Link from 'next/link';
import styles from './blogPostDetail.module.css';
import Button from '../Button/Button';
const BlogPostDetail = ({ data }) => (
  <div className={styles.container}>
    <div className={styles.top}>
      <div className={styles.info}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.desc}>{data.programme}</p>
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
        <Button text="S'inscrire" url="#" />
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
  </div>
);

export default BlogPostDetail;