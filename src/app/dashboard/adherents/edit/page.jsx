'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./page.module.css"; // adapte ce chemin à ton projet

export default function EditAdherentPage() {
    const router = useRouter();
    const { id } = useParams();

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
    const [loading, setLoading] = useState(true);

    // Charger les données de l'adhérent à éditer
    useEffect(() => {
        if (!id) return;
        const fetchAdherent = async () => {
            try {
                const res = await fetch(`/api/adherents/${id}`);
                console.log("Fetch status:", res.status);
                if (!res.ok) {
                    alert("Adhérent non trouvé");
                    router.push("/dashboard");
                    return;
                }
                const data = await res.json();
                setFormData({
                    name: data.name || "",
                    surname: data.surname || "",
                    mail: data.mail || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    complement: data.complement || "",
                    cp: data.cp || "",
                    city: data.city || "",
                    membership_start: data.membership_start
                        ? data.membership_start.slice(0, 10)
                        : "",
                });
                setLoading(false);
            } catch (err) {
                alert("Erreur lors du chargement");
                router.push("/dashboard");
            }
        };
        fetchAdherent();
    }, [id, router]);

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
            const res = await fetch(`/api/adherents/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!res.ok) {
                const errorData = await res.json();
                alert(errorData.message || "Erreur lors de la modification.");
                setIsSubmitting(false);
                return;
            }
            router.push("/dashboard");
        } catch (err) {
            alert("Erreur lors de l'envoi du formulaire.");
            setIsSubmitting(false);
        }
    };

    if (loading) return <div>Chargement...</div>;

    return (
        <div className={styles.formPageContainer}>
            <h1>Modifier un adhérent</h1>
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
                        {isSubmitting ? "Envoi..." : "Enregistrer"}
                    </button>
                    <button type="button" onClick={() => router.back()}>
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}
