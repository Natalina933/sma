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
  const router = useRouter();
  const [info, setInfo] = useState({
    name: "",
    username: "",
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
    // console.log("inside handleSubmit");
    e.preventDefault();
    // si tous les champs ne sont pas rempli
    if (
      !info.email ||
      !info.password ||
      !info.name ||
      !info.username
    ) {
      setError("Veuillez remplir tous les champs");
    }
// si les mots de passe ne correspondent pas
if (info.password !== info.password) {
  setError("Les mots de passe ne correspondent pas");
  return;
}

    try {
      setPending(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setPending(false);
        const form = e.target;
        form.reset();
        router.push("/login")
        console.log("user registered");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      setError("quelque chose ne fonctionne pas");
    }
  }
  // console.log({info});
  return (
    <div className={styles.container}>
      <form autoComplete="on" className={styles.form} onSubmit={handleSubmit}>
        <h1>Créez votre compte</h1>
        <Link href="/dashboard/login">Déjà inscrit ? Connectez-vous</Link>

        {/* <div className={styles.radioGroup}>
          <input
            type="radio"
            id="civilityMme"
            name="civility"
            value="Mme"
            onChange={handleCivilityChange}
          />
          <label className={styles.label} htmlFor="civilityMme">
            Mme
          </label>

          <input type="radio" id="civilityM" name="civility" value="M." />
          <label className={styles.label} htmlFor="civilityM">
            M.
          </label>

          <input
            type="radio"
            id="civilityMmeEtM"
            name="civility"
            value="Mme et M."
          />
          <label className={styles.label} htmlFor="civilityMmeEtM">
            Mme et M.
          </label>
        </div> */}

        <input
          type="text"
          placeholder="Nom"
          className={styles.input}
          onChange={(e) => handleInput(e)}
          name="name"
          autoComplete="name"
          required
        />
        <input
          type="text"
          placeholder="Prénom"
          onChange={(e) => handleInput(e)}
          className={styles.input}
          name="username"
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => handleInput(e)}
          className={styles.input}
          name="email"
          autoComplete="email"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => handleInput(e)}
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
        {error && <p className="message">{error}</p>}
        <button className={styles.button}
        disabled={pending?true:false}
        >   
          {pending?"Registering":"S'inscrire"}</button>
      </form>
      <span>ou</span>
      <button
        type="button"
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Sinscrire avec votre compte Google
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
