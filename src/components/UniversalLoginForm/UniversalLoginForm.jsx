"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import styles from "./UniversalLoginForm.module.css";
export default function UniversalLoginForm({ userType }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const [info, setInfo] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const providerId = userType === "admin" ? "admin-credentials" : "member-credentials";
  const destination = userType === "admin" ? "/dashboard" : "/dashboardMember";
  const title = userType === "admin" ? "Espace Gestionnaire" : "Espace Adhérent";
  const registerPath = userType === "admin" ? "/dashboard/register" : "/dashboardMember/registerMember";

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(destination);
    }
  }, [status, router, destination]);

  useEffect(() => {
    const errorParam = params.get("error");
    if (errorParam) {
      setError(
        errorParam === "CredentialsSignin"
          ? "Identifiants invalides. Veuillez vérifier votre email et mot de passe."
          : params.get("message") || "Une erreur est survenue. Veuillez réessayer."
      );
    }
  }, [params]);

  function handleInput(e) {
    setInfo({ ...info, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!info.email || !info.password) {
      setError("Veuillez renseigner votre email et mot de passe.");
      return;
    }

    setPending(true);
    const res = await signIn(providerId, {
      email: info.email,
      password: info.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Identifiants invalides.");
      setPending(false);
      return;
    }

    router.replace(destination);
  }

  if (status === "loading") return <div className={styles.loadingContainer}>Chargement...</div>;
  if (status === "authenticated") return null;

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Accès {title}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <a href={registerPath} className={styles.registerLink}>
          Pas encore inscrit ? <span className={styles.highlightLink}>Créez votre compte</span>
        </a>

        <div className={styles.inputGroup}>
          <input
            type="email"
            name="email"
            placeholder="Votre email"
            className={styles.input}
            autoComplete="email"
            required
            onChange={handleInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mot de passe"
              className={styles.input}
              autoComplete="current-password"
              required
              onChange={handleInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.passwordToggle}
              aria-label={showPassword ? "Masquer" : "Afficher"}
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button className={styles.button} disabled={pending}>
          {pending ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
