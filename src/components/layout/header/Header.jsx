import styles from './header.module.css';

const navLinks = [
    { label: "Découvrir", href: "#decouvrir" },
    { label: "Sortir", href: "#sortir" },
    { label: "Manger", href: "#manger" },
    { label: "Dormir", href: "#dormir" },
    { label: "Infos pratiques", href: "#infos" },
    { label: "Billetterie", href: "#billetterie" },
    { label: "Contact", href: "#contact" }
];

const Header = () => (
    <header className={styles.header}>
        <nav className={styles.navbar} aria-label="Menu principal">
            <div className={styles.logo}>

            </div>

        </nav>
        <div className={styles.headerImage}>
            <div className={styles.hero}>
                <div className={styles.heroText}>
                    <h1 className={styles.title}>
                        Bienvenue sur le site de l&apos;association SMA <br />
                    </h1>
                    <h2 className={styles.subtitle}>
                        Découvrez un monde d&apos;activités passionnantes pour petits et grands à Saint-Mandé et Vincennes
                    </h2>
                    <a href="#activities" className={styles.heroCta}>Découvrir nos activités</a>

                </div>
            </div>
        </div>
    </header>
);

export default Header;
