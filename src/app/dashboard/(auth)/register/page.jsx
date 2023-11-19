"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

//importer le button

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
const Register = () => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 201 &&
        router.push("/dashboard/login?success=Votre compte a été créé");
      
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
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
      {error && "Quelque chose s'est mal passe!"}
      <Link href="/dashboard/login">Me connecter avec un compte existant</Link>
    </div>
  );
};

export default Register;
