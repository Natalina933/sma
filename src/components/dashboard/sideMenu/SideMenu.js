import Link from "next/link";
import { useState } from "react";
import { FaCog, FaChevronRight } from "react-icons/fa"; // Import des icônes
import styles from "./sideMenu.module.css";
import { SidebarLinks } from "../sidebarLinks/SidebarLinks";

const SideMenu = () => {
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null); // État pour gérer l'ouverture des sous-menus

  const toggleSubMenu = (index) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index); // Si le même sous-menu est cliqué, fermez-le
  };

  return (
    <div className={styles.sideMenu}>
      <ul className={styles.menuList}>
        {/* Affichage des liens de la sidebar */}
        {SidebarLinks.map((link, index) => (
          <li key={link.id} className={link.subLinks ? styles.hasSubmenu : ""}>
            {/* Lien principal */}
            <a
              onClick={() => toggleSubMenu(index)}
              className={`${styles.menuItem} ${
                openSubMenuIndex === index ? styles.active : ""
              }`}>
              <span className={styles.linkIcon}>{link.icon}</span>
              <span>{link.title}</span>
              {link.subLinks && (
                <FaChevronRight
                  className={`${styles.submenuIcon} ${
                    openSubMenuIndex === index ? styles.open : ""
                  }`}
                />
              )}
            </a>

            {/* Sous-menu */}
            {link.subLinks && openSubMenuIndex === index && (
              <ul className={`${styles.subMenu}`}>
                {link.subLinks.map((subLink) => (
                  <li key={subLink.id}>
                    <Link href={subLink.url} className={styles.subMenuItem}>
                      {subLink.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}

        {/* Icône pour les paramètres */}
        <li className={`${styles.settingsLink} ${styles.settings}`}>
          <FaCog />
          <span>Paramètres</span>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
