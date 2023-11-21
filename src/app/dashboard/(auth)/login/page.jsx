"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const Login = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn("credentials", { 
      email, 
      password });
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
        <button type="submit" className={styles.button}>
          Connexion
        </button>
      </form>
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
