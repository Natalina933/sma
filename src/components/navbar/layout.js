import styles from "./navbar.module.css";

const { default: Navbar } = require("./Navbar")

const layout = ({ children }) => {
    return (
        <>
        <Navbar />
        <div className={styles.navbar}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
        
        </>

    )
}