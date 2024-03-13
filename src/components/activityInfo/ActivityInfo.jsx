// src\components\activityInfo\ActivityInfo.jsx
import Image from 'next/image';
const ActivityInfo = ({ dataActivitys }) => {
    return (
        <div></div>
        // <div>
        //     <h2>Activity Information</h2>
        //     {dataActivitys.map(category => (
        //         <div key={category}>
        //             <h3>{category}</h3>
        //             <ul>
        //                 {dataActivitys[category].map(activity => (
        //                     <li key={activity.id}>
        //                         <div>
        //                             <Image src={activity.img} alt={activity.title} width={100} height={100} />
        //                         </div>
        //                         <div>
        //                             <h4>{activity.title}</h4>
        //                             <p><strong>Date:</strong> {activity.date}</p>
        //                             <p><strong>Place:</strong> {activity.place}</p>
        //                             <p><strong>Description:</strong> {activity.description}</p>
        //                             <p><strong>Price:</strong> {activity.price}</p>
        //                             <p><strong>Rating:</strong> {activity.rating}</p>
        //                             <p><strong>Programme:</strong> {activity.programme}</p>
        //                             <p><strong>Inscription:</strong> {activity.inscription}</p>
        //                             <p><strong>Keywords:</strong> {activity.keywords}</p>
        //                         </div>
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //     ))}
        // </div>
    );
};

export default ActivityInfo;