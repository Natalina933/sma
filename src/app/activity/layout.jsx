import styles from "./page.module.css"
const Layout = ({children}) => {
    return (
        <div>
            <h1 className={styles.mainTitle}>Nos Activités cette année</h1>
            {children}
        </div>
    )
}

export default Layout