"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/legacy/image";
import { Navlinks } from "@/components/navLinks/Navlinks";
import DarkModeToggle from "@/components/darkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Fermer le menu quand on clique sur un lien
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.container}>
      <section className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink} onClick={handleLinkClick}>
          <Image
            src="/logo.svg"
            className={styles.logoImage}
            width={70}
            height={50}
            priority={true}
            alt="logo SMA"
          />
          <span className={styles.logoText}>Saint-Mandé Accueil</span>
        </Link>
      </section>

      {/* Bouton hamburger visible uniquement sur mobile */}
      <button
        className={styles.hamburger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className={styles.hamburgerIcon}
        />
      </button>

      {/* Menu de navigation */}
      <section className={`${styles.links} ${isOpen ? styles.active : ""}`}>
        <DarkModeToggle />

        {Navlinks.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className={styles.link}
            onClick={handleLinkClick}
          >
            <div className={styles.linkIcon}>{link.icon}</div>
            <div className={styles.linkTitle}>{link.title}</div>
          </Link>
        ))}

        {session ? (
          <button
            className={styles.logout}
            onClick={() => {
              signOut();
              handleLinkClick();
            }}
          >
            Déconnexion
          </button>
        ) : (
          <div className={styles.authButtons}>
            <Link href="/dashboard/login" onClick={handleLinkClick} className={styles.loginLink}>
              <button className={styles.login}>
                <FontAwesomeIcon icon={faBars} className={styles.loginIcon} />
                Connexion
              </button>
            </Link>
            <Link href="/dashboard/register" onClick={handleLinkClick} className={styles.signupLink}>
              <button className={styles.signup}>
                <FontAwesomeIcon icon={faTimes} className={styles.signupIcon} />
                S&apos;inscrire
              </button>
            </Link>
          </div>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
