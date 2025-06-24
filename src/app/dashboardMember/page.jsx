"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
    faUserCircle,
    faCalendarAlt,
    faComments,
    faFileAlt,
    faMoneyBillWave,
    faBullhorn,
    faCog,
    faSignOutAlt,
    faCheckCircle,
    faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardMember() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("profile");
    const [activities, setActivities] = useState([]);
    const [inscriptions, setInscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    // Récupère les activités et inscriptions du membre
    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/dashboardMember/loginMember");
        }
        if (status === "authenticated" && session?.user?.id) {
            Promise.all([
                fetch("/api/activities").then((res) => res.json()),
                fetch(`/api/activity-members?member_id=${session.user.id}`).then((res) => res.json()),
            ]).then(([allActivities, inscritList]) => {
                setActivities(allActivities);
                setInscriptions(inscritList);
                setLoading(false);
            });
        }
    }, [status, session, router]);

    if (status === "loading" || loading) {
        return <p className={styles.loading}>Chargement de votre espace membre...</p>;
    }

    // IDs des activités auxquelles l'utilisateur est inscrit
    const inscritIds = inscriptions.map((i) => i.activity_id);
    const mesActivites = activities.filter((a) => inscritIds.includes(a.id));
    const autresActivites = activities.filter((a) => !inscritIds.includes(a.id));

    // Inscription à une activité
    async function handleInscription(activityId) {
        const res = await fetch("/api/activity-members", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ activity_id: activityId, member_id: session.user.id }),
        });
        if (res.ok) {
            alert("Inscription réussie !");
            // Rafraîchir les inscriptions
            const inscritList = await fetch(`/api/activity-members?member_id=${session.user.id}`).then((r) => r.json());
            setInscriptions(inscritList);
        } else {
            alert("Erreur lors de l'inscription.");
        }
    }

    const member = session?.user || {};

    function formatDate(dateStr) {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("fr-FR");
    }

    // Affichage des sections
    const renderContent = () => {
        switch (activeSection) {
            case "profile":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faUserCircle} className={styles.icon} /> Mon Profil
                        </h2>
                        <div className={styles.profileInfo}>
                            <p><strong>Prénom :</strong> {member.surname || "Non défini"}</p>
                            <p><strong>Nom :</strong> {member.name || "Non défini"}</p>
                            <p><strong>Email :</strong> {member.email || member.mail || "Non défini"}</p>
                            <p><strong>Téléphone :</strong> {member.phone || "Non défini"}</p>
                            <p><strong>Adresse :</strong> {member.address || "Non défini"}</p>
                            <p><strong>Date de naissance :</strong> {formatDate(member.date_of_birth) || "Non défini"}</p>
                            <p><strong>Genre :</strong> {member.gender || "Non défini"}</p>
                            <p><strong>Type d’adhésion :</strong> {member.membership_type || "Non défini"}</p>
                            <p><strong>Statut :</strong> {member.status || "Non défini"}</p>
                            <p><strong>Date d’inscription :</strong> {formatDate(member.created_at) || "Non défini"}</p>
                        </div>
                        <button className={styles.editButton} onClick={() => setShowEditModal(true)}>
                            Modifier mon profil
                        </button>

                        {/* Modal d’édition (exemple simple) */}
                        {showEditModal && (
                            <div className={styles.modalOverlay}>
                                <div className={styles.modalContent}>
                                    <h3>Modifier mon profil</h3>
                                    <p>(Formulaire à implémenter ici)</p>
                                    <button className={styles.closeModal} onClick={() => setShowEditModal(false)}>
                                        Fermer
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                );
            case "activities":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} /> Mes Activités
                        </h2>
                        <h3 className={styles.subTitle}>Activités auxquelles je suis inscrit(e)</h3>
                        <ul className={styles.activityList}>
                            {mesActivites.length === 0 && <li>Aucune inscription pour le moment.</li>}
                            {mesActivites.map((a) => (
                                <li key={a.id} className={styles.activityItem}>
                                    <Image
                                        src={a.img || "/images/default.jpg"}
                                        alt={a.title}
                                        className={styles.activityImg}
                                        width={80}
                                        height={80}
                                    />
                                    <div>
                                        <strong>{a.title}</strong>
                                        <div className={styles.activityMeta}>
                                            <span>{a.date}</span> | <span>{a.place}</span>
                                        </div>
                                    </div>
                                    <span className={styles.inscritBadge}>
                                        <FontAwesomeIcon icon={faCheckCircle} /> Inscrit
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <h3 className={styles.subTitle}>Autres activités proposées</h3>
                        <ul className={styles.activityList}>
                            {autresActivites.length === 0 && <li>Toutes les activités sont complètes ou vous êtes déjà inscrit(e).</li>}
                            {autresActivites.map((a) => (
                                <li key={a.id} className={styles.activityItem}>
                                    <Image
                                        src={a.img || "/images/default.jpg"}
                                        alt={a.title}
                                        className={styles.activityImg}
                                        width={80}
                                        height={80}
                                    />
                                    <div>
                                        <strong>{a.title}</strong>
                                        <div className={styles.activityMeta}>
                                            <span>{a.date}</span> | <span>{a.place}</span>
                                        </div>
                                    </div>
                                    <button className={styles.registerButton} onClick={() => handleInscription(a.id)}>
                                        <FontAwesomeIcon icon={faPlusCircle} /> S&apos;inscrire
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                );
            case "documents":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faFileAlt} className={styles.icon} /> Documents Utiles
                        </h2>
                        <ul className={styles.documentList}>
                            <li>
                                <a href="/documents/reglement-interieur.pdf" target="_blank" rel="noopener noreferrer">
                                    Règlement Intérieur (PDF)
                                </a>
                            </li>
                            <li>
                                <a href="/documents/rapport-activites-2024.pdf" target="_blank" rel="noopener noreferrer">
                                    Rapport d&apos;Activités 2024 (PDF)
                                </a>
                            </li>
                        </ul>
                    </section>
                );
            case "dues":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faMoneyBillWave} className={styles.icon} /> Ma Cotisation
                        </h2>
                        <div className={styles.duesStatus}>
                            <p>
                                <strong>Statut actuel :</strong> <span className={styles.statusPaid}>À jour</span> (Valide jusqu&apos;au 31/12/2025)
                            </p>
                            <button className={styles.payButton}>Renouveler ma cotisation</button>
                        </div>
                    </section>
                );
            case "notifications":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faBullhorn} className={styles.icon} /> Mes Notifications
                        </h2>
                        <ul className={styles.notificationList}>
                            <li className={styles.notificationItem}>
                                <span className={styles.notificationDate}>20 Juin 2025</span>: Rappel - Atelier Jardinage ce samedi !
                            </li>
                            <li className={styles.notificationItem}>
                                <span className={styles.notificationDate}>15 Juin 2025</span>: Nouvelle activité ajoutée : Randonnée nature.
                            </li>
                        </ul>
                    </section>
                );
            case "settings":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faCog} className={styles.icon} /> Paramètres
                        </h2>
                        <div className={styles.settingsOption}>
                            <h3>Préférences de notification</h3>
                            <label className={styles.switch}>
                                <input type="checkbox" defaultChecked />
                                <span className={styles.sliderRound}></span>
                            </label>{" "}
                            Recevoir les emails d&apos;activités
                        </div>
                        <div className={styles.settingsOption}>
                            <h3>Changer de mot de passe</h3>
                            {/* TODO: Ajouter un formulaire de changement de mot de passe */}
                        </div>
                    </section>
                );
            default:
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>Bienvenue dans votre Espace Adhérent !</h2>
                        <p className={styles.emptyMessage}>
                            Utilisez le menu à gauche pour naviguer dans les différentes sections.
                        </p>
                    </section>
                );
        }
    };

    return (
        <main className={styles.dashboardContainer}>
            <aside className={styles.sideMenu}>
                <button
                    className={activeSection === "profile" ? styles.activeMenuBtn : styles.menuBtn}
                    onClick={() => setActiveSection("profile")}
                >
                    <FontAwesomeIcon icon={faUserCircle} /> Profil
                </button>
                <button
                    className={activeSection === "activities" ? styles.activeMenuBtn : styles.menuBtn}
                    onClick={() => setActiveSection("activities")}
                >
                    <FontAwesomeIcon icon={faCalendarAlt} /> Activités
                </button>
                <button
                    className={activeSection === "documents" ? styles.activeMenuBtn : styles.menuBtn}
                    onClick={() => setActiveSection("documents")}
                >
                    <FontAwesomeIcon icon={faFileAlt} /> Documents
                </button>
                <button
                    className={activeSection === "dues" ? styles.activeMenuBtn : styles.menuBtn}
                    onClick={() => setActiveSection("dues")}
                >
                    <FontAwesomeIcon icon={faMoneyBillWave} /> Cotisation
                </button>
                <button
                    className={activeSection === "notifications" ? styles.activeMenuBtn : styles.menuBtn}
                    onClick={() => setActiveSection("notifications")}
                >
                    <FontAwesomeIcon icon={faBullhorn} /> Notifications
                </button>
                <button
                    className={activeSection === "settings" ? styles.activeMenuBtn : styles.menuBtn}
                    onClick={() => setActiveSection("settings")}
                >
                    <FontAwesomeIcon icon={faCog} /> Paramètres
                </button>
                <button
                    className={styles.logoutBtn}
                    onClick={() => {
                        // Déconnexion NextAuth
                        import("next-auth/react").then(({ signOut }) => signOut({ callbackUrl: "/" }));
                    }}
                >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
                </button>
            </aside>
            <div className={styles.dashboardContent}>
                <header className={styles.dashboardHeader}>
                    <h1>Espace Adhérent de l&apos;Association</h1>
                </header>
                {renderContent()}
            </div>
        </main>
    );
}