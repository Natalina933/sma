"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const Login = ({ }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");// État local pour gérer les erreurs
  const [success, setSuccess] = useState("");// État local pour gérer les succès
 //UseEffect pour mettre à jour les erreurs et les succès en fonction des paramètres de l'URL
  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);
// Vérification de l'état de la session pour gérer les différentes conditions
  if (session?.status === "loading") {
    return <p>Loading...</p>;// Affichage pendant le chargement de la session
  }

  if (session?.status === "authenticated") {
    router?.push("/dashboard");// Redirection vers le dashboard si l'utilisateur est authentifié
  }
// Fonction de soumission du formulaire de connexion
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <div className={styles.container}>
      {/* Formulaire de connexion */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Connectez-vous</h1>
        {/* Affichage des messages d'erreur ou de succès, si nécessaire */}
        {session?.error && <p>{notRegisteredMessage}</p>}
        {/* Lien pour rediriger vers la page d'inscription */}
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
      </form>
      <span>ou</span>

      <button
        onClick={() => {
          signIn("google");
        }}
        className={`${styles.button} ${styles.google}`}
      >
        Connectez-vous avec votre compte Google
      </button>

      {/* <Link href="/dashboard/newmail">Mot de passe oublié ?</Link> */}
    </div>
  );
};

export default Login;
