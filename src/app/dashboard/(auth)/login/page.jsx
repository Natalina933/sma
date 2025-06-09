"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import styles from "./page.module.css";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export default function LoginForm() {
  const session = useSession();
  const router = useRouter();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const params = useSearchParams();

  useEffect(() => {
    if (session.status === "authenticated") {
      router?.push("/dashboard");
    }
  }, [session.status, router]);

  function handleInput(e) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!info.email || !info.password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    try {
      setPending(true);
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Identifiants invalides");
        setPending(false);
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      setPending(false);
      setError("Une erreur est survenue");
    }
  }

  // Exemple d'utilisation de params (pour afficher un message d'erreur dans l'URL)
  useEffect(() => {
    const errorParam = params.get("error");
    if (errorParam) setError(errorParam);
  }, [params]);

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Connectez-vous pour accéder au tableau de bord</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <Link href="/dashboard/register">Pas de compte ? Inscrivez-vous</Link>

        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            onChange={handleInput}
            name="email"
            required
            autoComplete="email"
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className={styles.input}
              onChange={handleInput}
              name="password"
              required
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button
          className={styles.button}
          disabled={pending}
        >
          {pending ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
