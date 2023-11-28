"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
const Register = () => {
  const [error, setError] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (res.status === 201) {
        router.push("/dashboard/login?success=Votre compte a été créé");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

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
        <input
          type="password"
          placeholder="confirm password"
          className={styles.input}
          name="confirmPassword"
          required
        />
        <button className={styles.button}>S'inscrire</button>
        {error && <p>Une erreur s'est produite lors de la création du compte.</p>}
        {passwordMismatch && <p>Les mots de passe ne correspondent pas.</p>}
      </form>
      <Link href="/dashboard/login">Me connecter avec un compte existant</Link>
    </div>
  );
};

export default Register;
