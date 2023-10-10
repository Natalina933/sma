import styles from "./DarckModeToggle.module.css";

const DarkModeToggle = () => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>🌙</div>
            <div className={styles.icon}>🔆</div>
            <div
                className={styles.ball}
                style={mode === "light" ? { left: "2px" } : { right: "2px" }}
            />

        </div>
    )
};

export default DarkModeToggle;
