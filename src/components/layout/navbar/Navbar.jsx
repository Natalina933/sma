"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const timerRef = useRef();

  // Gestion de l'inactivité : active seulement si connecté
  useEffect(() => {
    if (!session) return; // N'active rien si pas connecté

    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowTimeoutModal(true);
      }, 300000); // 5 minutes
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("scroll", resetTimer);
    resetTimer();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [session]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/dashboard/login" });
    handleLinkClick();
  };

  const handleTimeoutLogout = () => {
    setShowTimeoutModal(false);
    handleLogout();
  };

  const handleContinueSession = () => {
    setShowTimeoutModal(false);
    resetTimer();
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.container}>
      {showTimeoutModal && (
        <div className={styles.timeoutModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Session expirée</h3>
            <p>Votre session va expirer pour cause d&apos;inactivité.</p>
            <div className={styles.modalButtons}>
              <button
                className={styles.stayConnected}
                onClick={handleContinueSession}
              >
                Rester connecté
              </button>
              <button
                className={styles.logoutNow}
                onClick={handleTimeoutLogout}
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

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

      <section className={`${styles.links} ${isOpen ? styles.active : ""}`}>
        <DarkModeToggle />

        {/* Liens principaux */}
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

        {/* Connexion (affiché seulement si pas connecté) */}
        {!session && (
          <div className={styles.authButtons}>
            <Link
              href="/dashboardMember/loginMember"
              onClick={handleLinkClick}
              className={styles.loginLink}
            >
              <button className={styles.login}>
                Espace adhérent
              </button>
            </Link>
            <Link
              href="/dashboard/login"
              onClick={handleLinkClick}
              className={styles.loginLink}
            >
              <button className={styles.login}>
                Espace gestionnaire
              </button>
            </Link>
          </div>
        )}

        {/* Déconnexion si connecté */}
        {session && (
          <button className={styles.logout} onClick={handleLogout}>
            Se déconnecter
          </button>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
