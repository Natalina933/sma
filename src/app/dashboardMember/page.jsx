"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import MemberSideMenu from "@/components/dashboardMember/memberSideMenu/MemberSideMenu";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faCalendarAlt,
    faComments,
    faFileAlt,
    faMoneyBillWave,
    faBullhorn,
    faCog,
} from "@fortawesome/free-solid-svg-icons";

const DashboardMember = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("profile");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Chargement de votre espace membre...</p>;
    }

    // Fonction pour afficher le contenu de la section active
    const renderContent = () => {
        switch (activeSection) {
            case "profile":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faUserCircle} className={styles.icon} /> Mon Profil
                        </h2>
                        <p className={styles.emptyMessage}>
                            Ici, vous pourrez consulter et mettre à jour vos informations personnelles.
                        </p>
                        <div className={styles.profileInfo}>
                            <p>
                                <strong>Nom:</strong> {session?.user?.name || "Non défini"}
                            </p>
                            <p>
                                <strong>Email:</strong> {session?.user?.email || "Non défini"}
                            </p>
                        </div>
                        <button className={styles.editButton}>Modifier mon profil</button>
                    </section>
                );
            case "activities":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faCalendarAlt} className={styles.icon} /> Mes Activités &amp; Planning
                        </h2>
                        <p className={styles.emptyMessage}>
                            Retrouvez ici le calendrier des activités de l&apos;association et vos inscriptions.
                        </p>
                        <div className={styles.planningContainer}>
                            <h3>Prochaines activités:</h3>
                            <ul className={styles.activityList}>
                                <li>
                                    <strong>Atelier Peinture</strong> - Samedi 22 Juin 2025 - 10h00 - Salle Communale
                                    <button className={styles.registerButton}>S&apos;inscrire</button>
                                </li>
                                <li>
                                    <strong>Réunion Mensuelle</strong> - Mercredi 26 Juin 2025 - 19h00 - En ligne
                                    <button className={styles.detailsButton}>Détails</button>
                                </li>
                            </ul>
                        </div>
                    </section>
                );
            case "discussions":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faComments} className={styles.icon} /> Discussions entre Adhérents
                        </h2>
                        <p className={styles.emptyMessage}>
                            Échangez avec les autres membres et partagez vos idées ici.
                        </p>
                        {/* TODO: Implémenter un système de forum simple ou un mur de posts, en utilisant MongoDB ou MySQL2. */}
                        <div className={styles.discussionFeed}>
                            {/* Exemple de post */}
                            <div className={styles.discussionPost}>
                                <p className={styles.postAuthor}>Jean Dupont - 18 Juin 2025</p>
                                <p className={styles.postContent}>
                                    &quot;Bonjour à tous, je suis nouveau membre et je suis ravi de rejoindre l&apos;association !&quot;
                                </p>
                                <button className={styles.replyButton}>Répondre</button>
                            </div>
                            <div className={styles.discussionPost}>
                                <p className={styles.postAuthor}>Marie Curie - 19 Juin 2025</p>
                                <p className={styles.postContent}>
                                    &quot;N&apos;oubliez pas l&apos;atelier peinture de samedi ! Il reste quelques places.&quot;
                                </p>
                                <button className={styles.replyButton}>Répondre</button>
                            </div>
                        </div>
                        <textarea
                            className={styles.newPostTextarea}
                            placeholder="Écrivez votre message..."
                            defaultValue=""
                        />
                        <button className={styles.postButton}>Publier</button>
                    </section>
                );
            case "documents":
                return (
                    <section className={styles.sectionCard}>
                        <h2 className={styles.sectionTitle}>
                            <FontAwesomeIcon icon={faFileAlt} className={styles.icon} /> Documents Utiles
                        </h2>
                        <p className={styles.emptyMessage}>
                            Accédez aux documents importants de l&apos;association.
                        </p>
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
                        <p className={styles.emptyMessage}>
                            Consultez l&apos;état de votre cotisation et les options de renouvellement.
                        </p>
                        <div className={styles.duesStatus}>
                            <p>
                                <strong>Statut actuel:</strong> <span className={styles.statusPaid}>À jour</span> (Valide jusqu&apos;au 31/12/2025)
                            </p>
                            {/* Ou: <span className={styles.statusOverdue}>Non à jour</span> */}
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
                        <p className={styles.emptyMessage}>
                            Recevez les dernières nouvelles et annonces importantes de l&apos;association.
                        </p>
                        <ul className={styles.notificationList}>
                            <li className={styles.notificationItem}>
                                <span className={styles.notificationDate}>20 Juin 2025</span>: Rappel - Atelier Jardinage ce samedi !
                            </li>
                            <li className={styles.notificationItem}>
                                <span className={styles.notificationDate}>15 Juin 2025</span>: Nouvelle activité ajoutée : Randonnée nature.
                            </li>
                            <li className={styles.notificationItem}>
                                <span className={styles.notificationDate}>10 Juin 2025</span>: Mise à jour du règlement intérieur disponible dans la section Documents.
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
                        <p className={styles.emptyMessage}>
                            Gérez vos préférences de compte.
                        </p>
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
            <MemberSideMenu setActiveSection={setActiveSection} activeSection={activeSection} />
            <div className={styles.dashboardContent}>
                <header className={styles.dashboardHeader}>
                    <h1>Espace Adhérent de l&apos;Association</h1>
                </header>
                {renderContent()}
            </div>
        </main>
    );
};

export default DashboardMember;