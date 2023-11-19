"use client";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const Login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
 signIn("credentials", { email, password });
      };
    return (
    <div className={styles.container}>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          name="email"
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          name="password"
          required
          autoComplete="current-password"
        />
        <button className={styles.button}>Connexion</button>

      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
