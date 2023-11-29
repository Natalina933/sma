import Navbar from "./Navbar";
import styles from "./navbar.module.css";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className={styles.navbar}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </>
    );
};

export default Layout;