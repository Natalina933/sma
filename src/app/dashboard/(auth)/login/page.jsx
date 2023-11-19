"use client"
import styles from "./page.module.css";
import { signIn } from 'next-auth/react';
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const Login = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className={styles.input}
          name="username"
          required
        />
        <input
          type="email"
          placeholder="email"
          className={styles.input}
          name="email"

          required
        />
        <input
          type="password"
          placeholder="password"
          className={styles.input}
          name="password"

          required
        />
        <button className={styles.button}>S'inscrire</button>
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={`${styles.button} ${styles.google}`}
      >
        Connection avec Google
      </button>
    </div>
  );
};

export default Login;
