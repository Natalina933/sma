import Image from 'next/image';
import styles from './body.module.css';

const Body = () => {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <div className={styles.imgWrapper}>
                        <Image
                            src='/carte-vincennes-st-mandé.jpg'
                            fill
                            style={{ objectFit: 'cover' }}
                            className={styles.image}
                            alt="Activités passionnantes"
                        />
                    </div>
                </div>
                <div className={styles.contentSection}>
                    <h2 className={styles.heading}>Découvrez un monde d&apos;activités passionnantes</h2>
                    <div className={styles.divider}></div>
                    <h3 className={styles.subheading}>Qui sommes-nous ?</h3>
                    <p className={styles.paragraph}>
                        Notre association a été fondée il y a maintenant près de 30 ans par un
                        groupe de Saint-Mandéens avec notamment pour buts :
                    </p>
                    <ul className={styles.unorderedList}>
                        <li className={styles.listItem}>Accueillir et favoriser l&apos;insertion des nouveaux arrivants dans notre ville,</li>
                        <li className={styles.listItem}>Contribuer à une meilleure qualité de vie de nos concitoyens au moyen de diverses activités sociales, culturelles et sportives.</li>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Body;
