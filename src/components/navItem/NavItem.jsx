// import React from 'react';

// import { useRouter } from 'next/router';
// import Link from 'next/link';

// const NavItem = ({ href, title, icon }) => {
//   const router = useRouter();

//   // Vérifiez si la route actuelle correspond à la route du lien
//   const isActive = router.pathname === href;

//   return (
//     <Link href={href} passHref>
//       <a className={`${styles.link} ${isActive ? styles.active : ''}`}>
//         <div className={styles.linkIcon}>{icon}</div>
//         <div className={styles.linkTitle}>{title}</div>
//       </a>
//     </Link>
//   );
// };