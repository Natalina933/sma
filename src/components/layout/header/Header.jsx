import styles from './header.module.css';


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
                    <a href="activity" className={styles.heroCta}>Découvrir nos activités</a>

                </div>
            </div>
        </div>
    </header>
);

export default Header;
