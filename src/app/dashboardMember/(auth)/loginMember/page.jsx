"use client";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css"; // Assurez-vous que ce fichier CSS est bien le même ou adapté
import PasswordInput from "@/components/common/passwordInput/PasswordInput";

// Le timeout d'inactivité peut être géré globalement ou au niveau de la session NextAuth.
// Pour cette page de connexion, il n'est pas directement utilisé.
// const INACTIVITY_TIMEOUT = 15 * 60 * 1000;

export default function LoginMemberForm() {
    const session = useSession();
    const router = useRouter();
    const [info, setInfo] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const params = useSearchParams();

    useEffect(() => {
        // Si l'utilisateur est déjà authentifié, le rediriger vers le tableau de bord membre
        if (session.status === "authenticated") {
            router?.push("/dashboardMember"); // Redirection vers l'espace membre
        }
    }, [session.status, router]);

    function handleInput(e) {
        setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!info.email || !info.password) {
            setError("Veuillez saisir votre email et votre mot de passe.");
            return;
        }

        try {
            setPending(true);
            const res = await signIn("credentials", {
                email: info.email,
                password: info.password,
                redirect: false, // Ne pas rediriger automatiquement, on gère la redirection manuellement
            });

            if (res?.error) {
                // next-auth renvoie des erreurs comme 'CredentialsSignin'
                setError("Identifiants incorrects. Veuillez vérifier votre email et mot de passe.");
                setPending(false);
                return;
            }

            // Si la connexion réussit, rediriger vers le tableau de bord membre
            router.replace("/dashboardMember");
        } catch (error) {
            setPending(false);
            setError("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
            console.error("Login error:", error);
        }
    }

    useEffect(() => {
        // Capture les messages d'erreur passés via l'URL (par exemple, si NextAuth échoue)
        const errorParam = params.get("error");
        if (errorParam) {
            // Vous pouvez rendre ce message plus convivial
            if (errorParam === "CredentialsSignin") {
                setError("Identifiants invalides. Veuillez vérifier votre email et mot de passe.");
            } else {
                setError("Une erreur est survenue. Veuillez réessayer.");
            }
        }
    }, [params]);

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Accédez à votre espace adhérent</h2>
                <Link href="/dashboardMember/registerMember" className={styles.registerLink}>
                    Pas encore membre ? Inscrivez-vous !
                </Link>

                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        placeholder="Votre email"
                        className={styles.input}
                        onChange={handleInput}
                        name="email"
                        required
                        autoComplete="email"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <PasswordInput
                        value={info.password}
                        onChange={handleInput}
                        name="password"
                        placeholder="Votre mot de passe"
                        required
                        autoComplete="current-password"
                    />
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