"user client"
import styles from './page.module.css'
import Button from '@/components/Button/Button'
import Image from 'next/legacy/image'
import Link from 'next/link'

const Blog = () => {
  return (
    <div className={styles.mainContainer}>
      <Link href="/testId" className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            width={400}
            height={250}
            src="/contact.jpg"
            alt=""
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Test</h1>
          <p className={styles.desc}>Desciptions</p>
        </div>
      </Link>
      <Link href="/testId" className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            width={400}
            height={250}
            src="/contact.jpg"
            alt=""
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Test</h1>
          <p className={styles.desc}>Desciptions</p>
        </div>
      </Link>
      <Link href="/blog/testId" className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            className={styles.img}
            width={400}
            height={250}
            src="/contact.jpg"
            alt=""
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>Test</h1>
          <p className={styles.desc}>Desciptions</p>
        </div>
      </Link>
    </div>
  );
}

export default Blog;