// src/components/dashboardMember/memberSideMenu/MemberSideMenu.jsx
import Link from "next/link";
import styles from "./MemberSideMenu.module.css"; // Créez ce fichier CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserCircle,
    faCalendarAlt,
    faComments,
    faFileAlt,
    faMoneyBillWave,
    faSignOutAlt,
    faHome,
    faBullhorn,
    faCog,
} from "@fortawesome/free-solid-svg-icons";

const MemberSideMenu = ({ setActiveSection, activeSection }) => {
    return (
        <nav className={styles.sideMenu}>
            <h2 className={styles.menuTitle}>Menu Adhérent</h2>
            <ul className={styles.menuList}>
                <li className={`${styles.menuItem} ${activeSection === 'home' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("home")}>
                        <FontAwesomeIcon icon={faHome} className={styles.menuIcon} /> Accueil
                    </a>
                </li>
                <li className={`${styles.menuItem} ${activeSection === 'profile' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("profile")}>
                        <FontAwesomeIcon icon={faUserCircle} className={styles.menuIcon} /> Mon Profil
                    </a>
                </li>
                <li className={`${styles.menuItem} ${activeSection === 'activities' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("activities")}>
                        <FontAwesomeIcon icon={faCalendarAlt} className={styles.menuIcon} /> Activités & Planning
                    </a>
                </li>
                <li className={`${styles.menuItem} ${activeSection === 'discussions' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("discussions")}>
                        <FontAwesomeIcon icon={faComments} className={styles.menuIcon} /> Discussions
                    </a>
                </li>
                <li className={`${styles.menuItem} ${activeSection === 'documents' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("documents")}>
                        <FontAwesomeIcon icon={faFileAlt} className={styles.menuIcon} /> Documents
                    </a>
                </li>
                <li className={`${styles.menuItem} ${activeSection === 'dues' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("dues")}>
                        <FontAwesomeIcon icon={faMoneyBillWave} className={styles.menuIcon} /> Ma Cotisation
                    </a>
                </li>
                <li className={`${styles.menuItem} ${activeSection === 'notifications' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("notifications")}>
                        <FontAwesomeIcon icon={faBullhorn} className={styles.menuIcon} /> Notifications
                    </a>
                </li>
                <li className={`${styles.menuItem} ${activeSection === 'settings' ? styles.active : ''}`}>
                    <a href="#" onClick={() => setActiveSection("settings")}>
                        <FontAwesomeIcon icon={faCog} className={styles.menuIcon} /> Paramètres
                    </a>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/api/auth/signout">
                        <FontAwesomeIcon icon={faSignOutAlt} className={styles.menuIcon} /> Déconnexion
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default MemberSideMenu;