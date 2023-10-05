import styles from './header.module.css';
import Image from "next/legacy/image";


/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
const Header = () => {
    return (
        <header className={styles.container}>
            <div className={styles.headerImage}>
                <Image
                    src='/headerImagev1.jpg'
                    height={600}
                    width={1900}
                    className={styles.img}
                    alt="Activités passionnantes"
                />
                <div className={styles.headerText}>
                    <h1 className={styles.title}>
                        Bienvenue sur le site de l'association SMA <br /> Saint-Mandé Accueil
                    </h1>
                    <h2 className={styles.subtitle}>Découvrez un monde d'activités passionnantes</h2>
                </div>
            </div>
            <div className={styles.textContainer}>
            </div>
        </header>
    )

}
export default Header;