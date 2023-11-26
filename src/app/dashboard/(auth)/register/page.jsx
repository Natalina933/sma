"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
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
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    // Hachage du mot de passe avant de l'envoyer au serveur
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: hashedPassword, // Utilisation du mot de passe haché
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
      <form autoComplete="on" className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          name="email"
          autoComplete="email"
          required
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          placeholder="Mot de passe"
          className={styles.input}
          name="password"
          autoComplete="new-password"
          required
        />

        <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
        <input
          type="confirmPassword"
          placeholder="Confirmation du mot de passe"
          className={styles.input}
          name="confirmPassword"
          autoComplete="new-password"
          required
        />

        <button className={styles.button}>S'inscrire</button>
      </form>
      {error && <p>Une erreur s'est produite lors de la création du compte.</p>}
      <Link href="/dashboard/login">Je suis déjà inscrit</Link>
    </div>
  );
};

export default Register;