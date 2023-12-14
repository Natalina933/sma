"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
  // Récupération de la session en cours
  const session = useSession();
   // Récupération du routeur et des paramètres de recherche
  const router = useRouter();
  const params = useSearchParams();
  // États pour gérer les messages d'erreur et de succès
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Mettre à jour les états des erreurs et des succès à partir des paramètres de recherche
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);
// Si la session est en cours de chargement, afficher "Chargement..."
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }
// Si l'utilisateur est authentifié, rediriger vers "/dashboard"
  if (session.status === "authenticated") {
    console.log("Redirection vers le tableau de bord...")
    router?.push("/dashboard");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    // Affichage des informations saisies dans le formulaire
    console.log("Email soumis :", email);
    console.log("Mot de passe soumis :", password);

    // Connexion avec les informations saisies
    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      {/* Formulaire de connexion */}
      <h1 className={styles.title}>{success ? success : "Welcome Back"}</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Connectez-vous</h2>
        <Link href="/dashboard/register">Pas de compte ? Inscrivez-vous</Link>
        <input
          type="email"
          placeholder="Email"
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
        {/* Affichage du message si l'utilisateur n'est pas enregistré */}
        {error && error}
      </form>
      <span>ou</span>

      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Connectez-vous avec votre compte Google
      </button>

      {/* {showResetPassword && (
  <div>
    <h2>Mot de passe oublié</h2>
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Réinitialiser votre mot de passe</h2>
      <input
        type="email"
        placeholder="Adresse email"
        className={styles.input}
        name="email"
        required
        autoComplete="email"
      />
      <button type="submit" className={styles.button}>
        Réinitialiser le mot de passe
      </button>
    </form> */}
    </div>
  )
};
export default Login;
