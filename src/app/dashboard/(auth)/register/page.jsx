"use client";
import styles from "./page.module.css";
import Link from "next/link";
//importer le button

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
const Register = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} action="">
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          required
        />
      <button className={styles.button}>S'inscrire</button>
      </form>
<Link href="dashboard/login">Me connecter avec un compte existant</Link>     
    </div>
  );
};

export default Register;
