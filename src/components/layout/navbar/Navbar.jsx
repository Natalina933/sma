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
import { FaCogs } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const timerRef = useRef();
  const router = useRouter();

  // Gestion de l'inactivité
  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowTimeoutModal(true);
    }, 300000); // 5 minutes
  };

  useEffect(() => {
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
  }, []);

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

  // Lien vers le tableau de bord : redirige vers login si non connecté
  const renderDashboardLink = () => (
    <Link
      href={session ? "/dashboard" : "/dashboard/login"}
      className={styles.link}
      onClick={handleLinkClick}
    >
      <div className={styles.linkIcon}>
        <FaCogs />
      </div>
      <div className={styles.linkTitle}>Tableau de bord</div>
    </Link>
  );

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

        {/* Lien Tableau de bord (toujours visible, redirige intelligemment) */}
        {renderDashboardLink()}

        {/* Connexion/Inscription gestionnaire */}
        {!session ? (
          <div className={styles.authButtons}>
            <Link
              href="/dashboard/login"
              onClick={handleLinkClick}
              className={styles.loginLink}
            >
              <button className={styles.login}>
                <FontAwesomeIcon icon={faBars} className={styles.loginIcon} />
                Connexion gestionnaire
              </button>
            </Link>
            {/* Connexion/Inscription adhérent */}
            <Link
              href="/dashboard/adherent/login"
              onClick={handleLinkClick}
              className={styles.loginLink}
            >
              <button className={styles.login}>
                <FontAwesomeIcon icon={faBars} className={styles.loginIcon} />
                Connexion adhérent
              </button>
            </Link>
            <Link
              href="/dashboard/adherent/register"
              onClick={handleLinkClick}
              className={styles.signupLink}
            >
              <button className={styles.signup}>
                <FontAwesomeIcon icon={faTimes} className={styles.signupIcon} />
                S&apos;inscrire (adhérent)
              </button>
            </Link>
          </div>
        ) : (
          <button className={styles.logout} onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
