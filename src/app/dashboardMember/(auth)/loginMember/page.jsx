"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import styles from "./page.module.css";

export default function LoginMemberForm() {
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();
    const [info, setInfo] = useState({ mail: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const params = useSearchParams();

    // Redirection après authentification
    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router?.push("/dashboardMember");
        }
    }, [sessionStatus, router]);

    // Gestion des inputs
    function handleInput(e) {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    // Soumission du formulaire
    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!info.mail || !info.password) {
            setError("Veuillez saisir votre email et votre mot de passe.");
            return;
        }

        try {
            setPending(true);
            const res = await signIn("member-credentials", {
                mail: info.mail,
                password: info.password,
                redirect: false,
            });

            if (res?.error) {
                setError("Identifiants invalides. Veuillez vérifier votre email et mot de passe.");
                setPending(false);
                return;
            }

            router.replace("/dashboardMember");
        } catch (apiError) {
            setPending(false);
            setError("Une erreur inattendue est survenue. Veuillez réessayer.");
        }
    }

    // Gestion des erreurs dans l'URL
    useEffect(() => {
        const errorParam = params.get("error");
        if (errorParam) {
            switch (errorParam) {
                case "CredentialsSignin":
                    setError("Identifiants invalides. Veuillez vérifier votre email et mot de passe.");
                    break;
                case "Callback":
                    setError(params.get("message") || "Une erreur d'authentification est survenue. Veuillez réessayer.");
                    break;
                default:
                    setError("Une erreur de connexion est survenue. " + (errorParam ? `Détails: ${errorParam}` : ""));
                    break;
            }
        }
    }, [params]);

    if (sessionStatus === "loading") {
        return <div className={styles.loadingContainer}>Chargement...</div>;
    }

    if (sessionStatus === "authenticated") {
        return null;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Accès Espace Adhérent</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                <Link href="/dashboardMember/registerMember" className={styles.registerLink}>
                    Pas encore membre ? <span className={styles.highlightLink}>Inscrivez-vous ici</span>
                </Link>

                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Votre email"
                        className={styles.input}
                        onChange={handleInput}
                        name="mail"
                        required
                        autoComplete="email"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.passwordContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Votre mot de passe"
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
                    {pending ? "Connexion en cours..." : "Me connecter"}
                </button>
            </form>
        </div>
    );
}