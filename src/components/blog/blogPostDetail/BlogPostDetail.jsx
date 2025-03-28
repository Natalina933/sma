import Image from 'next/image';
import { useRouter } from 'next/router'; // Import du hook useRouter
import Link from 'next/link'; // Import pour la navigation avec Link
import styles from './blogPostDetail.module.css';
import Button from '@/components/common/button/Button';

const BlogPostDetail = ({ data }) => {
  const router = useRouter(); // Initialisation du hook useRouter

  const handleBack = () => {
    router.back(); // Retour à la page précédente
  };

  return (
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
      <div className={styles.footer}>
        {/* Bouton pour revenir à la page précédente */}
        <button className={styles.backButton} onClick={handleBack}>
          Retour
        </button>

        {/* Bouton pour rediriger explicitement vers la liste des articles */}
        <Link href="/blog">
          <a className={styles.linkButton}>Retour à la liste des articles</a>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostDetail;