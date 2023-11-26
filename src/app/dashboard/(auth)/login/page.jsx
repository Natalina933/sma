"use client";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn("credentials", {
        email,
        password,
      });

      // Redirection uniquement si la connexion est réussie
      if (status === "authenticated") {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
    }
  };

  if (session && status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSignIn}>
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
        className={styles.button + " " + styles.google}
      >
        Connexion avec votre compte Google
      </button>
    </div>
  );
};

export default Login;