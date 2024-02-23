import Link from 'next/link';
import styles from './SideMenu.module.css';
import { SidebarLinks } from '@/components/dashboard/sidebarLinks/SidebarLinks';
import { FaCog } from 'react-icons/fa'; // Import de l'icône des paramètres

const SideMenu = () => {
    
    return (
        <div className={styles.sideMenu}>
            <ul className={styles.menuList}>
                {/* Affichage des liens de la sidebar */}
                {SidebarLinks.map((link) => (
                    <li key={link.id}>
                        {/* Si le lien a une liste d'éléments, affichez-le avec des sous-liens */}
                        {link.subLinks ? (
                            <>
                                <span className={styles.linkIcon}>{link.icon}</span>
                                <span>{link.title}</span>
                                <ul className={styles.subMenu}>
                                    {link.subLinks.map((subLink) => (
                                        <li key={subLink.id}>
                                            <Link href={subLink.url}>{subLink.title}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            // Sinon, affichez simplement le lien
                            <Link href={link.url}>{link.title}</Link>
                        )}
                    </li>
                ))}
                {/* Icône pour les paramètres */}
                <li className={`${styles.settingsLink} ${styles.settings}`}>
                    <FaCog /> {/* Icône des paramètres */}
                    <span>Paramètres</span>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;

