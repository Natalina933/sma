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
  const [error, setError] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const router = useRouter();

  const createAccount = async (userData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.status === 201) {
        console.log("Utilisateur créé avec succès");
        router.push("/dashboard");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la création du compte :", error);
      setError(true);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const { status } = await signIn("credentials", { email, password });

      if (status === "authenticated") {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, surname, email, password, confirmPassword, civilite } = e.target;

    if (password.value !== confirmPassword.value) {
      setPasswordMismatch(true);
      setError(false);
      return;
    }

    const hashedPassword = await bcrypt.hash(password.value, 10);

    await createAccount({
      civilite: civilite.value,
      name: name.value,
      surname: surname.value,
      email: email.value,
      password: hashedPassword,
    });

    await handleSignIn(email.value, password.value);
  };
  const handleGoogleSignIn = () => {
    signIn("google");
  };
  return (
    <div className={styles.container}>
      <form autoComplete="on" className={styles.form} onSubmit={handleSubmit}>
        <h1>Créez votre compte</h1>
        <Link href="/dashboard/login">Déjà inscrit ? Connectez-vous</Link>

        <div className={styles.radioGroup}>
          <input
            type="radio"
            id="civiliteMme"
            name="civilite"
            value="Mme"
            onChange={(e) => console.log(e.target.value)} />

          <label className={styles.label} htmlFor="civiliteMme">Mme</label>

          <input type="radio" id="civiliteM" name="civilite" value="M." />
          <label className={styles.label} htmlFor="civiliteM">M.</label>

          <input type="radio" id="civiliteMmeEtM" name="civilite" value="Mme et M." />
          <label className={styles.label} htmlFor="civiliteMmeEtM">Mme et M.</label>
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
        <button
          className={styles.button}>S'inscrire</button>
        <span>ou</span>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className={styles.button + " " + styles.google}
        >
          S'inscrire avec votre compte Google
        </button>
      </form>
      {(error || passwordMismatch) && (
        <p>
          {error ? "Une erreur s'est produite lors de la création du compte." : ""}
          {passwordMismatch ? "Les mots de passe ne correspondent pas." : ""}
        </p>
      )}
    </div>
  );
};

export default Register;