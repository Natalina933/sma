import styles from "./page.module.css";
import Button from "../../components/button/Button";
import Header from "@/components/header/Header";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

// devra etre mis dans components ou utils doit faire appel à un maximum d'import

const About = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.textContainer}>
        <section className={styles.item}>
          <h1 className={styles.title}>Qui sommes-nous?</h1>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            aspernatur corporis debitis, eum eligendi modi perferendis deserunt
            nisi, sequi suscipit nemo ipsum, maxime alias perspiciatis? Libero
            temporibus repellendus animi blanditiis.
          </p>
        </section>
        <section className={styles.item}>
          <h1 className={styles.title}>Ce que nous faisont??</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            aspernatur corporis debitis, eum eligendi modi perferendis deserunt
            nisi, sequi suscipit nemo ipsum, maxime alias perspiciatis? Libero
            temporibus repellendus animi blanditiis.
          </p>
        </section>
      </main>
      <footer className={styles.footer}>
        <Button url="contact" text="Contactez-nous" />
      </footer>
    </div>
  );
};

export default About;
