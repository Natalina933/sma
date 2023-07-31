"use client";

import React from "react";
import Link from "next/link";
import styles from './page.module.css'

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
const Navbar = () => {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Saint-Mandé Accueil
      </Link>
      <div className={styles.links}>
        {Links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.links}>
            {link.title}
          </Link>
        ))}
        <button className={styles.logout}
          onClick={() => {
            console.log("logged out");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
