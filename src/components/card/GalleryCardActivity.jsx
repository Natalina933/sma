// /* use client */
// import React, { useState } from 'react';
// import Image from 'next/image';
// import styles from './galleryCardActivity.module.css';

// const GalleryCardActivity = ({ activityData }) => {
//   const [expandedActivity, setExpandedActivity] = useState(null);

//   const handleToggleDescription = (activityId) => {
//     setExpandedActivity(prevExpandedActivity =>
//       prevExpandedActivity === activityId ? null : activityId
//     );
//   };

//   return (
//     <div className={styles.gallery}>
//       {activityData.map(activity => (
//         <div
//           className={`${styles.card} ${expandedActivity === activity.id ? styles.cardExpanded : ''}`}
//           key={activity.id}
//         >
//           <Image src={activity.image} width={300} height={130} alt={activity.title} />
//           <div className={styles.cardContent}>
//             <h2 className={styles.activityTitle}>{activity.title}</h2>
//             <p className={styles.description}>{activity.description}</p>

//             <div className={styles.details}>
//               <p className={styles.schedule}>{activity.schedule}</p>
//               <p className={styles.place}>{activity.place}</p>
//               <p className={styles.price}>
//                 {activity.price === "gratuit" ? "Gratuit" : `${activity.price} €`}
//               </p>
//               <button
//                 className={styles.addButton}
//                 type="button"
//                 onClick={() => handleToggleDescription(activity.id)}
//               >
//                 {expandedActivity === activity.id ? 'Réduire' : 'En savoir plus'}
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GalleryCardActivity;
