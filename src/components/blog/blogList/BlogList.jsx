import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogList.module.css';

import ActivityCard from '../../activityInfo/ActivityInfo.jsx';

const BlogList = ({ data }) => (
  <div className={styles.mainContainer}>
    {data.map((activity) => (
      <ActivityCard key={activity._id} activity={activity} />
    ))}
  </div>
);

export default BlogList;