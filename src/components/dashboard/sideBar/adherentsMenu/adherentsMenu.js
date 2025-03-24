// components/Dashboard/MenuItems/AdherentsMenu.js
import Link from "next/link";
import styles from "../sideMenu/sideMenu.module.css";
import { FaChevronRight } from "react-icons/fa";

const AdherentsMenu = ({ isOpen, onToggle, link }) => {
  return (
    <li className={link.subLinks ? styles.hasSubmenu : ""}>
      <a
        onClick={onToggle}
        className={isOpen ? styles.active : ""}
      >
        <span className={styles.linkIcon}>{link.icon}</span>
        <span>{link.title}</span>
        {link.subLinks && (
          <FaChevronRight className={`${styles.submenuIcon}`} />
        )}
      </a>

      {link.subLinks && isOpen && (
        <ul className={`${styles.subMenu}`}>
          {link.subLinks.map((subLink) => (
            <li key={subLink.id}>
              <Link href={subLink.url}>{subLink.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default AdherentsMenu;
