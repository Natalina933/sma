import styles from "./page.module.css";
import Image from "next/legacy/image";
import Button from "@/components/Button/Button";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const About = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src='/headerImage.jpg'
          height={300}
          width={1000}
          className={styles.image}
          alt="Activités passionnantes"
        />
        <div className={styles.headerText}>
          <h1 className={styles.headerTitle}>
            Bienvenue sur le site de l'association SMA <br /> Saint-Mandé Accueil
          </h1>
          <h2 className={styles.subtitle}>Découvrez un monde d'activités passionnantes</h2>
        </div>
      </header>
      <main className={styles.textContainer}>
        <section className={styles.item}>
          <h1 className={styles.title}>Qui sommes-nous?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aspernatur corporis debitis, eum eligendi modi perferendis deserunt nisi, sequi suscipit nemo ipsum, maxime alias perspiciatis? Libero temporibus repellendus animi blanditiis.
            </p>
        </section>
        <section className={styles.item}>
          <h1 className={styles.title}>Ce que nous faisont??</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis aspernatur corporis debitis, eum eligendi modi perferendis deserunt nisi, sequi suscipit nemo ipsum, maxime alias perspiciatis? Libero temporibus repellendus animi blanditiis.</p>
        </section>
      </main>
      <footer className={styles.footer}>
        <Button url="contact" text="Contactez-nous"/>
      </footer>
    </div>
  )
}

export default About