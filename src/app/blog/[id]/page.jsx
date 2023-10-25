import Image from "next/legacy/image";
import styles from "./page.module.css";
import { notFound } from "next/navigation";

//devra etre mis dans components ou utils doit faire appel à un maximum d'import


async function getData(id) {
  try {

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      // Cela déclenchera la limite d'erreur `error.js` la plus proche
      // throw new Error("");
      console.error("Échec de la récupération des données");
      return notFound();
    }
    return res.json();
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
    throw error;
  }

}



const BlogPost = async ({ params }) => {
  try {


    const data = await getData(params.id);
    return (
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.info}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.desc}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe
              dolores veniam eos expedita laudantium autem quae natus aut.
              Architecto voluptas vitae distinctio eveniet porro vel explicabo
              corrupti! Molestias, aspernatur neque? Dicta temporibus eveniet quo
              magnam aut est quas quod expedita veritatis, facilis iusto
              reprehenderit quisquam quasi amet in, fugit facere illum, aspernatur
              error. Veniam numquam dolore facilis perferendis ducimus. Enim?
              Tempore beatae distinctio quos illum cumque pariatur quia reiciendis
              nam quibusdam, illo asperiores suscipit? Facere alias beatae, nam
              accusamus ad illo obcaecati autem delectus assumenda optio, amet
              corporis id nisi. Eaque, veritatis! Similique quas quam excepturi
              tempora modi voluptatibus molestiae! Expedita, animi quaerat cumque
              sed similique sint ut neque, ducimus labore, illum sapiente possimus
              quidem voluptate unde distinctio odio perspiciatis? Quam inventore
              suscipit reiciendis, atque aliquid voluptates et ratione vitae
              voluptatem, rem quaerat cum reprehenderit maxime! Cupiditate quasi,
              eveniet dolore iste praesentium voluptatem quisquam, alias, dicta
              iusto earum suscipit natus!
            </p>
            <div className={styles.author}>
              <Image
                className={styles.avatar}
                width={40}
                height={40}
                src={data.img}
                alt=""
              />
              <span className={styles.username}>{data.author}</span>
            </div>
          </div>
          <div className={styles.imgContainer}>
            <Image
              className={styles.img}
              width={400}
              height={250}
              src={data.img}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("An error occurred while rendering the component:", error);
    // Vous pouvez choisir de retourner un composant d'erreur personnalisé ici.
    // Par exemple, vous pourriez afficher un message d'erreur spécifique.
    return <div>Une erreur sest produite : {error.message}</div>;

  }
};

export default BlogPost;
