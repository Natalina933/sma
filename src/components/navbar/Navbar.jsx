"use client";

import React from "react";
import Link from "next/link";
import styles from "./navbar.module.css";
import Image from "next/image";
import {
  FaHome,
  FaCogs,
  FaComments,
  FaCalendarWeek,
  FaEnvelopeOpenText,
  FaFeather,
} from "react-icons/fa";

const Navbar = () => {
  const Links = [
    {
      id: 1,
      title: "Home",
      url: "/",
      icon: <FaHome />,
    },
    {
      id: 2,
      title: "Activity",
      url: "/activity",
      icon: <FaCalendarWeek />,
    },
    {
      id: 3,
      title: "Blog",
      url: "/blog",
      icon: <FaComments />,
    },
    {
      id: 4,
      title: "About",
      url: "/about",
      icon: <FaFeather />,
    },
    {
      id: 5,
      title: "Contact",
      url: "/contact",
      icon: <FaEnvelopeOpenText />,
    },
    {
      id: 6,
      title: "Dashboard",
      url: "/dashboard",
      icon: <FaCogs />,
    },
  ];

  return (
    <div className={styles.container}>
      <section className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/logo.svg"
            className={styles.logoImage}
            width={100}
            height={70}
            alt="logo SMA"
          />
          <span className={styles.logoText}>Saint-Mandé Accueil</span>
        </Link>
      </section>
      <section className={styles.links}>
        {Links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            <div className={styles.linkIcon}>{link.icon}</div>
            <div className={styles.linkTitle}>{link.title}</div>
          </Link>
        ))}
        <button
          className={styles.logout}
          onClick={() => {
            console.log("Déconnecté");
          }}>
          Déconnexion
        </button>
      </section>
    </div>
  );
};

export default Navbar;
