import Image from "next/image";
import styles from "./page.module.css";
import Hero from "public/hero.jpg";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h3 className={styles.title}>
          Bienvenue sur le site de l&apos;association SMA Saint-Mandé Accueil
        </h3>
        <p className={styles.desc}>
          Découvrez un monde d&apos;activités passionnantes
        </p>
        <div className={styles.listContainer}>
          <ul>
            <li> Une palette d&apos;activités pour tous les goûts</li>
            <p>
              Nous vous offrons plus de 50 activités différentes, chaque jour de
              la semaine. Que vous soyez passionné(e) par le sport, l&apos;art,
              la danse, la musique ou les loisirs créatifs, nous avons ce
              qu&apos;il vous faut.
            </p>
            <li>Des activités adaptées à tous</li>
            <p>
              Quel que soit votre âge ou vos centres d&apos;intérêt, nous avons
              une activité qui correspond à vos attentes. Des cours pour enfants
              aux ateliers pour seniors, nous veillons à ce que personne ne se
              sente exclu.
            </p>
            <li>Des tarifs abordables pour tous</li>
            <p>
              Nous croyons fermement que chacun devrait avoir la possibilité de
              participer à des activités enrichissantes. C&apos;est pourquoi nos
              tarifs sont abordables, afin que le plaisir et
              l&apos;apprentissage ne soient pas réservés uniquement aux
              personnes fortunées.
            </p>
            <li>Venez vivre des moments conviviaux</li>
            <p>
              SMA Saint-Mandé Accueil est plus qu&apos;une simple association,
              c&apos;est un véritable lieu de rencontres et d&apos;échanges. Nos
              espaces conviviaux et chaleureux vous invitent à partager des
              moments agréables avec d&apos;autres passionnés comme vous.
            </p>
          </ul>
          <button>Plus d&apos;information</button>
        </div>
      </div>
      <div className={styles.img}>
        <Image
          src={Hero}
          width={500}
          height={300}
          alt=""
          className={styles.img}
        />
      </div>
    </div>
  );
}
