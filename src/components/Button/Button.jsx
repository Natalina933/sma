import Link from 'next/link';
import styles from './button.module.css';
// devra etre plus modulable


const Button = ({ text, url }) => {
    return (
        <div className={styles.buttonContainer}>
            <Link href={url} passHref>

                <button className={styles.container}>{text}</button>

            </Link>
        </div>
    );
};


export default Button;