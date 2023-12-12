"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const Login = () => {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");// État local pour gérer les erreurs
  const [success, setSuccess] = useState("");// État local pour gérer les succès
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleResetPassword = () => {
    setShowResetPassword(true);
  };
  //UseEffect pour mettre à jour les erreurs et les succès en fonction des paramètres de l'URL
  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);
  // Vérification de l'état de la session pour gérer les différentes conditions
  if (session.status === "loading") {
    return <p>Loading...</p>;// Affichage pendant le chargement de la session
  }

  if (session.status === "authenticated") {
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
    // Validation des champs
  // if (!email.includes("@")) {
  //   setError("L'adresse e-mail doit contenir un symbole @.");
  //   return;
  // }

  // if (password.length < 8) {
  //   setError("Le mot de passe doit contenir au moins 8 caractères.");
  //   return;
  // }

  // try {
  //   // Check if the user exists
  //   const user = await getUserByEmail(email);
  //   if (!user) {
  //     throw new Error("L'utilisateur n'existe pas.");
  //   }
  //   // Compare entered password with stored hashed password
  //   const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // if (isPasswordCorrect) {
      // Generate a JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//       // Store the token in the session
//       const session = {
//         user: {
//           id: user._id,
//           email: user.email,
//         },
//         token,
//       };

//       // Sign in the user
//       signIn("credentials", session);

//       // Redirect to the dashboard
//       router?.push("/dashboard");
//     } else {
//       throw new Error("Invalid credentials!");
//     }
//   } catch (error) {
//     setError(error.message);
//   }
// };

// const notRegisteredMessage = "Vous n'avez pas de compte. Veuillez vous inscrire pour accéder.";

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
