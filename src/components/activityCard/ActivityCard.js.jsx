// import Image from 'next/image';
// import Link from 'next/link';
// import styles from './ActivityCard.module.css';

// const ActivityCard = ({ activity }) => (
//   <Link href={`/blog/${activity._id}`} key={activity._id} className={styles.container}>
//     <div className={styles.imgContainer}>
//       <Image
//         src={activity.img}
//         className={styles.img}
//         width={600}
//         height={550}
//         priority={true}
//         alt={activity.title}
//       />
//     </div>
//     <div className={styles.content}>
//       <h1 className={styles.title}>{activity.title}</h1>
//       <p className={styles.desc}>{activity.desc}</p>
//     </div>
//     <div>
//       <div>
//         <div className={styles.price}> {activity.price}</div>
//       </div>
//       <div>{activity.rating}</div>
//     </div>
//   </Link>
// );

// export default ActivityCard;