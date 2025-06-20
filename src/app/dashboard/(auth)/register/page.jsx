"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const Register = () => {
  const router = useRouter();
  const [info, setInfo] = useState({
    name: "", // Correspond à la colonne 'name' dans `usr_users`
    username: "", // Correspond à la colonne 'username' dans `usr_users`
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Réinitialise les messages d'erreur à chaque soumission
    setPending(true); // Active l'état d'attente pour le bouton

    // --- Validation côté client ---
    // 1. Vérifie si tous les champs requis sont remplis, y compris confirmPassword
    if (
      !info.email ||
      !info.password ||
      !info.name ||
      !info.username ||
      !info.confirmPassword
    ) {
      setError("Veuillez remplir tous les champs requis.");
      setPending(false); // Désactive l'état d'attente
      return; // Arrête l'exécution de la fonction
    }

    // 2. Vérifie si les mots de passe correspondent (CORRECTION CRUCIALE ICI)
    if (info.password !== info.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setPending(false); // Désactive l'état d'attente
      return; // Arrête l'exécution de la fonction
    }
    // --- Fin de la validation côté client ---

    // IMPORTANT : Le hachage du mot de passe doit être effectué sur le serveur
    // dans votre API '/api/auth/register'.
    // Supprimez ou commentez la ligne suivante :
    // const hashedPassword = await bcrypt.hash(info.password, 10);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Envoie les données brutes (mot de passe en clair via HTTPS)
        // L'API sera chargée de hacher le mot de passe avant de l'insérer en base
        body: JSON.stringify({
          name: info.name,
          username: info.username,
          email: info.email,
          password: info.password,
        }),
      });

      if (res.ok) {
        // Inscription réussie
        const data = await res.json();
        console.log("Utilisateur enregistré avec succès:", data.message);
        setPending(false); // Désactive l'état d'attente
        e.target.reset(); // Réinitialise le formulaire
        router.push("/dashboard/login"); // Redirige vers la page de connexion des gestionnaires

      } else {
        // Gère les erreurs renvoyées par l'API (ex: email/username déjà pris)
        const errorData = await res.json();
        setError(errorData.message || "Une erreur est survenue lors de l'inscription.");
        setPending(false); // Désactive l'état d'attente
      }

    } catch (fetchError) {
      // Gère les erreurs réseau ou les problèmes de connexion à l'API
      console.error("Erreur réseau ou d'API lors de l'inscription:", fetchError);
      setError("Impossible de se connecter au serveur. Veuillez réessayer.");
      setPending(false); // Désactive l'état d'attente
    }
  }

  return (
    <div className={styles.container}>
      <form autoComplete="on" className={styles.form} onSubmit={handleSubmit}>
        <h1>Créez votre compte gestionnaire</h1> {/* Titre spécifique au rôle */}
        <Link href="/dashboard/login">Déjà inscrit ? Connectez-vous</Link> {/* Lien vers la page de connexion des gestionnaires */}

        
        <input
          type="text"
          placeholder="Nom"
          className={styles.input}
          onChange={handleInput} // Utilisation directe de handleInput
          name="name"
          autoComplete="family-name" // Autocomplétion appropriée
          required
        />
        <input
          type="text"
          placeholder="Prénom (sera votre nom d'utilisateur)" // Précision sur l'usage du champ
          onChange={handleInput} // Utilisation directe de handleInput
          className={styles.input}
          name="username"
          autoComplete="given-name" // Autocomplétion appropriée
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleInput} // Utilisation directe de handleInput
          className={styles.input}
          name="email"
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handleInput} // Utilisation directe de handleInput
          className={styles.input}
          name="password"
          autoComplete="new-password"
          required
        />

        <input
          type="password"
          placeholder="Confirmation du mot de passe"
          className={styles.input}
          onChange={handleInput} // Utilisation directe de handleInput
          name="confirmPassword"
          autoComplete="new-password"
          required
        />
        {/* Affiche les messages d'erreur ici, avec une classe CSS pour le style */}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button
          className={styles.button}
          disabled={pending} // Le bouton est désactivé si pending est vrai
        >
          {pending ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
      <span>ou</span>
      <button
        type="button"
        onClick={() => signIn("google")} // Appel simplifié de signIn
        className={styles.button + " " + styles.google}
      >
        S'inscrire avec Google
      </button>
      {/* Le message d'erreur est déjà affiché dans le formulaire, pas besoin de le répéter ici */}
    </div>
  );
};

export default Register;