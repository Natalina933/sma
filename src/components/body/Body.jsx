import Image from 'next/image';
import styles from './body.module.css';
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
const Body = () => {
    return (
        <main className={`${styles.desc} ${styles.arrow} ${styles.backgroundArrow}`}>
            <div className={styles.img}>
                <Image
                    src='/hero.jpg'
                    width={300}
                    height={200}
                    className={styles.image}
                    alt="Activités passionnantes"
                />
            </div>
            <div className={styles.arrowContainer}>
                <h2>Découvrez un monde d'activités passionnantes</h2>
                <h3>Qui sommes-nous ?</h3>
                <p>
                    Notre association a été fondée il y a maintenant près de 30 ans par un
                    groupe de Saint-Mandéens avec notamment pour buts :
                </p>
                <ul>
                    <li>Accueillir et favoriser l’insertion des nouveaux arrivants dans notre ville,</li>
                    <li>Contribuer à une meilleure qualité de vie de nos concitoyens au moyen de diverses activités sociales, culturelles et sportives.</li>
                </ul>
            </div>
        </main>
    );
};

export default Body;