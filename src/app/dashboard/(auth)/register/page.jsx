"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */


const Register = () => {
  // State pour gérer les erreurs
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const surname = e.target.surname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const civility = e.target.civility.value;

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          civility,
          name,
          surname,
          email,
          password: hashedPassword,
        }),
      });

      if (res.status === 201) {
        // Rediriger vers le tableau de bord après inscription réussie
        router.push("/dashboard");
      } else {
        setError("Une erreur s'est produite lors de la création du compte.");
      }
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <form autoComplete="on" className={styles.form} onSubmit={handleSubmit}>
        <h1>Créez votre compte</h1>
        <Link href="/dashboard/login">Déjà inscrit ? Connectez-vous</Link>

        <div className={styles.radioGroup}>
          <input
            type="radio"
            id="civilityMme"
            name="civility"
            value="Mme"
            onChange={(e) => console.log(e.target.value)} />

          <label className={styles.label} htmlFor="civilityMme">Mme</label>

          <input type="radio" id="civilityM" name="civility" value="M." />
          <label className={styles.label} htmlFor="civilityM">M.</label>

          <input type="radio" id="civilityMmeEtM" name="civility" value="Mme et M." />
          <label className={styles.label} htmlFor="civilityMmeEtM">Mme et M.</label>
        </div>
        <input
          type="text"
          placeholder="Nom"
          className={styles.input}
          name="name"
          autoComplete="name"
          required
        />
        <input
          type="text"
          placeholder="Prénom"
          className={styles.input}
          name="surname"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          name="email"
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className={styles.input}
          name="password"
          autoComplete="new-password"
          required
        />

        <input
          type="password"
          placeholder="Confirmation du mot de passe"
          className={styles.input}
          name="confirmPassword"
          autoComplete="new-password"
          required
        />
        <button className={styles.button}>S'inscrire</button>
      </form>
      <span>ou</span>
      <button
        type="button"
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        S'inscrire avec votre compte Google
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;