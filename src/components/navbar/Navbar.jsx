"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/legacy/image";
import { Navlinks } from "../navLinks/Navlinks";
import DarkModeToggle from "../darkModeToggle/DarkModeToggle";

const Navbar = () => {
  return (
    <div className={styles.container}>
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
        {Navlinks.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            <div className={styles.linkIcon}>{link.icon}</div>
            <div className={styles.linkTitle}>{link.title}</div>
          </Link>
        ))}
        <button
          className={styles.logout}
          onClick={() => {
            console.log("Déconnecté");
          }}
        >
          Déconnexion
        </button>
      </section>
    </div>
  );
};

export default Navbar;

