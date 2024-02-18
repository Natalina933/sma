import Button from "@/components/common/button/Button";
import styles from "./page.module.css";
import Image from "next/legacy/image";

//devra etre plus modulable
export const metadata = {
  title: "SMA Contact",
  description: "Page de contact de l'Association Saint-Mandé Accueil",
};

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Restons en contact</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image
            src="/contact.jpg"
            width={400}
            height={300}
            alt="photo"
            className={styles.image}
          />
        </div>
        <form className={styles.form}>
          <input type="text" placeholder="name" className={styles.input} />
          <input type="text" placeholder="email" className={styles.input} />
          <textarea
            className={styles.textArea}
            placeholder="message"
            cols="30"
            rows="10"
          ></textarea>
          <Button url="#" text="Send" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
