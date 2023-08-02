"use client";

import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";

const Navbar = () => {
const Links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Activity",
    url: "/activity",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          <Image src="/logo.jpg" width={70} height={50} alt="logo SMA" />
          <span className={styles.logoText}>Saint-Mandé Accueil</span>
        </Link>
      </div>
      <div className={styles.links}>
        {Links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.links}>
            {link.title}
          </Link>
        ))}
        <button
          className={styles.logout}
          onClick={() => {
            console.log("Déconecté");
          }}>
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Navbar;
