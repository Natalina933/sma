"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PasswordInput from "@/components/common/passwordInput/PasswordInput";

const RegisterMember = () => {
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
        e.preventDefault();
        setError("");
        setPending(true);

        if (
            !info.email ||
            !info.password ||
            !info.name ||
            !info.username ||
            !info.confirmPassword
        ) {
            setError("Veuillez remplir tous les champs.");
            setPending(false);
            return;
        }

        if (info.password !== info.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            setPending(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/registerMember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: info.name,
                    username: info.username,
                    email: info.email,
                    password: info.password,
                }),
            });

            if (res.ok) {
                setPending(false);
                e.target.reset();
                router.push("/dashboardMember/loginMember");
            } else {
                const errorData = await res.json();
                setError(errorData.message || "Une erreur est survenue lors de l'inscription.");
                setPending(false);
            }
        } catch (fetchError) {
            setError("Impossible de se connecter au serveur. Veuillez vérifier votre connexion.");
            setPending(false);
        }
    }

    return (
        <div className={styles.container}>
            <form autoComplete="on" className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.formTitle}>Inscription à l’Espace Adhérent</h1>
                <Link href="/dashboardMember/loginMember" className={styles.loginLink}>
                    Déjà inscrit ? <span className={styles.highlightText}>Connectez-vous</span>
                </Link>

                <input
                    type="text"
                    placeholder="Nom"
                    className={styles.input}
                    onChange={handleInput}
                    name="name"
                    autoComplete="family-name"
                    required
                />
                <input
                    type="text"
                    placeholder="Prénom (sera votre nom d'utilisateur)"
                    onChange={handleInput}
                    className={styles.input}
                    name="username"
                    autoComplete="given-name"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={handleInput}
                    className={styles.input}
                    name="email"
                    autoComplete="email"
                    required
                />

                <PasswordInput
                    value={info.password}
                    onChange={handleInput}
                    name="password"
                    placeholder="Mot de passe"
                    required
                    autoComplete="new-password"
                />

                <PasswordInput
                    value={info.confirmPassword}
                    onChange={handleInput}
                    name="confirmPassword"
                    placeholder="Confirmer le mot de passe"
                    required
                    autoComplete="new-password"
                />

                {error && <p className={styles.errorMessage}>{error}</p>}
                <button
                    className={styles.submitButton}
                    disabled={pending}
                >
                    {pending ? "Inscription en cours..." : "S'inscrire"}
                </button>
            </form>

            <span className={styles.separator}>ou</span>

            <button
                type="button"
                onClick={() => signIn("google")}
                className={styles.googleButton}
            >
                S&apos;inscrire avec Google
            </button>
        </div>
    );
};

export default RegisterMember;