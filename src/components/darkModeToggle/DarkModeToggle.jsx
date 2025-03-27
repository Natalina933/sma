import React, { useContext } from "react";
import styles from "./darkModeToggle.module.css";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggle = () => {
    const { toggle, mode } = useContext(ThemeContext);

    if (!toggle || !mode) {
        return null; // Return null if context values are not available
    }

    return (
        <div className={`${styles.container} ${mode === "dark" ? styles.active : ""}`} onClick={toggle}>
            <div className={styles.icon}>🌙</div>
            <div className={styles.icon}>🔆</div>
            <div className={styles.ball} style={mode === "light" ? { left: "2px" } : { right: "2px" }} />
        </div>
    );
};

export default DarkModeToggle;
