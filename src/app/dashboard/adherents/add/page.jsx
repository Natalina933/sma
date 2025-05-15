'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function AddAdherentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        mail: "",
        phone: "",
        address: "",
        complement: "",
        cp: "",
        city: "",
        membership_start: "",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Le nom est requis";
        if (!formData.surname) newErrors.surname = "Le prénom est requis";
        if (!formData.mail) newErrors.mail = "L'email est requis";
        if (!formData.phone) newErrors.phone = "Le téléphone est requis";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/adherents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Erreur lors de l'ajout.");
                setIsSubmitting(false);
                return;
            }
            router.push("/dashboard"); // ou la page de liste des adhérents
        } catch (error) {
            alert("Erreur lors de l'envoi du formulaire.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.formPageContainer}>
            <h1>Ajouter un adhérent</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span className={styles.error}>{errors.name}</span>}

                <input
                    type="text"
                    name="surname"
                    placeholder="Prénom"
                    value={formData.surname}
                    onChange={handleChange}
                />
                {errors.surname && <span className={styles.error}>{errors.surname}</span>}

                <input
                    type="email"
                    name="mail"
                    placeholder="Email"
                    value={formData.mail}
                    onChange={handleChange}
                />
                {errors.mail && <span className={styles.error}>{errors.mail}</span>}

                <input
                    type="text"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone && <span className={styles.error}>{errors.phone}</span>}

                <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="complement"
                    placeholder="Complément"
                    value={formData.complement}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="cp"
                    placeholder="Code postal"
                    value={formData.cp}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="Ville"
                    value={formData.city}
                    onChange={handleChange}
                />

                <label>Date de début d&apos;adhésion</label>
                <input
                    type="date"
                    name="membership_start"
                    value={formData.membership_start}
                    onChange={handleChange}
                />

                <div className={styles.formActions}>
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Envoi..." : "Ajouter"}
                    </button>
                    <button type="button" onClick={() => router.back()}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}
