"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/legacy/image";
import { Navlinks } from "@/components/navLinks/Navlinks";
import DarkModeToggle from "@/components/darkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */

const Navbar = () => {
  // Utilise useSession pour obtenir les informations sur la session de l'utilisateur
  const { data: session } = useSession();
  return (
    <div className={styles.container}>

      {/* Section du logo */}
      <section className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
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
      <section className={styles.links}>

        <DarkModeToggle />

        {/* Section link */}
        {Navlinks.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            <div className={styles.linkIcon}>{link.icon}</div>
            <div className={styles.linkTitle}>{link.title}</div>
          </Link>
        ))}
        {/* Si l'utilisateur n'est pas connecté, affichez les boutons de connexion et d'inscription */}
        {/* Affichage conditionnel des boutons de connexion/inscription/déconnexion */}
        {session ? (
          <button className={styles.logout} onClick={() => signOut()}>
            Déconnexion
          </button>
        ) : (
          <>
            <Link href="/dashboard/login">
              <button className={styles.login}>Connexion</button>
            </Link>
            <Link href="/dashboard/register">
              <button className={styles.signup}>S'inscrire</button>
            </Link>
          </>
        )}
      </section>
    </div>
  );
};

export default Navbar;
