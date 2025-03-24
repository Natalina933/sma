import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ActivitiesMenu.module.css';

const ActivitiesMenu = ({ isOpen, onToggle, link }) => {
  return (
    <li className={`${styles.menuItem} ${isOpen ? styles.open : ''}`}>
      <button onClick={onToggle} className={styles.menuButton}>
        <span className={styles.icon}>{link.icon}</span>
        <span>{link.title}</span>
      </button>
      {isOpen && (
        <ul className={styles.subMenu}>
          {link.subLinks.map(subLink => (
            <li key={subLink.id} className={styles.subMenuItem}>
              <Link to={subLink.url} className={styles.subMenuLink}>
                {subLink.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default ActivitiesMenu;
