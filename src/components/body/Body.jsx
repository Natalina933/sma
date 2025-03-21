import Image from 'next/image';
import styles from './body.module.css';
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-unescaped-entities */
const Body = () => {
    return (
        <main className={styles.main}>
            <div className={styles.imgContainer}>
                <Image
                    src='/hero.jpg'
                    width={300}
                    height={200}
                    className={styles.image}
                    alt="Activités passionnantes"
                />
            </div>
            <div className={styles.content}>
                <h2 className={styles.heading}>Découvrez un monde d'activités passionnantes</h2>
                <h3 className={styles.subheading}>Qui sommes-nous ?</h3>
                <p className={styles.paragraph}>
                    Notre association a été fondée il y a maintenant près de 30 ans par un
                    groupe de Saint-Mandéens avec notamment pour buts :
                </p>
                <ul className={styles.unorderedList}>
                    <li>Accueillir et favoriser l'insertion des nouveaux arrivants dans notre ville,</li>
                    <li>Contribuer à une meilleure qualité de vie de nos concitoyens au moyen de diverses activités sociales, culturelles et sportives.</li>
                </ul>
            </div>
        </main>
    );
};

export default Body;